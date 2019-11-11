import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services';
import {TradeService} from './trade.service';
import {IOffer} from '../models';
import {MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  dataSource: MatTableDataSource<IOffer>;
  offers: IOffer[];
  errorMessage: string;
  filterForm: FormGroup;
  acceptedCurrencies: string[];
  columnsToDisplay: string[];
  isLoading: boolean;
  username: string;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private tradeService: TradeService,
              private snackBar: MatSnackBar) {

    this.acceptedCurrencies = ['USD', 'AUD', 'INR', 'PKR'];

    this.columnsToDisplay = [
      'maker',
      'description',
      'offerAmount',
      'receiveAmount',
      'exchangeRate',
      'actions'
    ];

    this.filterForm = this.formBuilder.group({
      offerCurrency: ['All', Validators.required],
      receiveCurrency: ['All', Validators.required],
    });
  }

  ngOnInit() {
    this.username = this.authService.getCurrentUser();

    this.isLoading = true;
    this.tradeService.getOffers().pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(
      offers => {
        this.offers = offers.filter(o => !o.taker);
        this.dataSource = new MatTableDataSource<IOffer>(this.offers);
        this.dataSource.sort = this.sort;
      },
      error => {
        this.errorMessage = error;
        this.snackBar.open(error, 'Dismiss', {duration: 6000});
      }
    );
  }

  filter() {
    this.isLoading = true;

    const offerCurrency = this.filterForm.value.offerCurrency;
    const receiveCurrency = this.filterForm.value.receiveCurrency;

    const filteredOffers = this.offers.filter((offer: IOffer) =>
      (offer.offerCurrency === offerCurrency || offerCurrency === 'All') &&
      (offer.receiveCurrency === receiveCurrency || receiveCurrency === 'All'));

    this.dataSource = new MatTableDataSource<IOffer>(filteredOffers);
    this.dataSource.sort = this.sort;

    this.isLoading = false;
  }

  swapCurrency() {
    const oldOffer = this.filterForm.value.offerCurrency;
    const oldReceive = this.filterForm.value.receiveCurrency;

    this.filterForm.get('offerCurrency').setValue(oldReceive);
    this.filterForm.get('receiveCurrency').setValue(oldOffer);
  }
}
