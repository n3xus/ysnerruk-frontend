import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {TradeService} from './trade.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trade-create',
  templateUrl: './trade-create.component.html',
  styleUrls: ['./trade-create.component.scss']
})
export class TradeCreateComponent implements OnInit {
  createOfferForm: FormGroup;
  acceptedCurrencies: string[];
  isLoading: boolean;

  constructor(
      private router: Router,
      private tradeService: TradeService,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
    ) {
    this.acceptedCurrencies = ['USD', 'AUD', 'INR', 'PKR'];

    this.createOfferForm = this.formBuilder.group({
      offerCurrency: ['USD', Validators.required],
      receiveCurrency: ['AUD', Validators.required],
    });
  }

  ngOnInit() {
    this.createOfferForm = this.formBuilder.group({
      description: ['', Validators.required],
      offerAmount: ['', Validators.required],
      offerCurrency: ['AUD', Validators.required],
      receiveAmount: ['', Validators.required],
      receiveCurrency: ['USD', Validators.required]
    });
  }

  get form() {
    return this.createOfferForm.controls;
  }

  createOffer() {

    this.isLoading = true;

    this.tradeService.createOffer(
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

      console.log(err);
      const errorMsg = err.error.message;
      this.snackBar.open(errorMsg, 'Dismiss', {duration: 6000});
    });
  }
}
