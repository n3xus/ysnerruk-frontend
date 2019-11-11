import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IReview} from '../models';
import {ReviewService} from './review.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';
import {AuthService} from '../services';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  reviews: IReview[];
  errorMessage: any;
  showReview = true;

  private isLoading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private reviewService: ReviewService,
              private snackBar: MatSnackBar,
              private authService: AuthService) {
  }

  ngOnInit() {
    const offerId = +this.route.snapshot.paramMap.get('id');

    this.getReviews(offerId);
  }

  getReviews(offerId: number) {
    this.isLoading = true;

    this.reviewService.getReviews(offerId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        data => {
          this.reviews = data;
          console.log(data);
          let review: IReview;
          let userHasReviewed = false;
          for (review of this.reviews) {
            if (review.reviewBy.username === this.authService.getCurrentUser()) {
              userHasReviewed = true;
            }
          }
          if (!userHasReviewed) {
            this.router.navigate(['/review/create/', offerId])
          }
        },
        error => {
          this.snackBar.open(error.error.message, 'Dismiss', {duration: 6000});
        });
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }
}
