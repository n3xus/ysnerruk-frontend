import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IOffer} from '../models';
import {TradeService} from './trade.service';
import {MatSnackBar} from '@angular/material';
import {log} from "util";
import {finalize} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-trade-edit',
  templateUrl: './trade-edit.component.html',
  styleUrls: ['./trade-edit.component.scss']
})
export class TradeEditComponent implements OnInit {
  editOfferForm: FormGroup;
  acceptedCurrencies: string[];
  offer: IOffer;
  errorMessage: any;
  private isLoading: boolean;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private tradeService: TradeService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.acceptedCurrencies = ['USD', 'AUD', 'INR', 'PKR'];
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;

    // Make a request to retrieve the offer from the backend
    this.tradeService.getOffer(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        data => {
          this.offer = data;
          console.log(data);
          // Create the form with validators and retrieved offer.
          this.editOfferForm = this.formBuilder.group({
            description: [this.offer.description, Validators.required],
            offerAmount: [this.offer.offerAmount, Validators.required],
            offerCurrency: [this.offer.offerCurrency, Validators.required],
            receiveAmount: [this.offer.receiveAmount, Validators.required],
            receiveCurrency: [this.offer.receiveCurrency, Validators.required]
          });
        },
        error => {
          this.errorMessage = error as any;
        },
      );
  }

  get form() {
    return this.editOfferForm.controls;
  }

  editDeleteButton(buttonType): void {
    if(buttonType==="edit") {
      this.editOffer()
    }
    if(buttonType==="delete") {
      this.deleteOffer()
    }
  }

  editOffer() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;

    this.tradeService.editOffer(
      id,
      this.form.description.value,
      this.form.offerAmount.value,
      this.form.offerCurrency.value,
      this.form.receiveAmount.value,
      this.form.receiveCurrency.value,
    ).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/trade']);
    }, err => {
      this.isLoading = false;

      const error = JSON.parse(err.error);
      const errorMsg = error.message;
      this.snackBar.open(errorMsg, 'Dismiss', {duration: 6000});
    });
  }

  deleteOffer() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;

    this.tradeService.deleteOffer(
      id,
    ).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/trade']);
    }, err => {
      this.isLoading = false;

      const error = JSON.parse(err.error);
      const errorMsg = error.message;
      this.snackBar.open(errorMsg, 'Dismiss', {duration: 6000});
    });
  }
}
