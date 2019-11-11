import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services';
import {DashboardService} from './dashboard.service';
import {IOffer} from '../models';
import {MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
              private dashboardService: DashboardService,
              private snackBar: MatSnackBar) {

    this.acceptedCurrencies = ['USD', 'AUD', 'INR', 'PKR'];

    this.columnsToDisplay = [
      'maker',
      'taker',
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
    this.dashboardService.getOffers().pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(
      offers => {
        this.offers = offers;
        const myOffers = this.myOffers(offers)
        this.dataSource = new MatTableDataSource<IOffer>(myOffers);
        this.dataSource.sort = this.sort;
      },
      error => {
        this.errorMessage = error;
        this.snackBar.open(error, 'Dismiss', {duration: 6000});
      }
    );
  }

  myOffers(offers: IOffer[]): IOffer[] {
    return offers.filter((offer: IOffer) =>
      offer.maker.username === this.username ||
      (offer.taker != undefined && offer.taker.username === this.username));
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
