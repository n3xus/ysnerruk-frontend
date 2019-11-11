import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IOffer} from '../models';
import {TradeService} from './trade.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';
import {AuthService} from '../services';

@Component({
  selector: 'app-trade-detail',
  templateUrl: './trade-detail.component.html',
  styleUrls: ['./trade-detail.component.scss']
})
export class TradeDetailComponent implements OnInit {

  offer: IOffer;
  errorMessage: any;
  showAccept = true;

  private isLoading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tradeService: TradeService,
              private snackBar: MatSnackBar,
              private authService: AuthService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getOffer(id);
  }

  getOffer(id: number) {
    this.isLoading = true;

    this.tradeService.getOffer(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        data => {
          this.offer = data;
          console.log(data);

          if (this.offer.maker.username === this.authService.getCurrentUser()) {
            this.showAccept = false;
          }
        },
        error => {
          this.errorMessage = error as any;
          this.snackBar.open(error, 'Dismiss', {duration: 6000});
        });
  }

  onBack(): void {
    this.router.navigate(['/trade']);
  }

  accept() {
    this.isLoading = true;

    this.tradeService.acceptOffer(this.offer.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/messaging'])
        },
        error => {
          this.errorMessage = error as any;
          this.snackBar.open(error, 'Dismiss', {duration: 6000});
        });
  }
}
