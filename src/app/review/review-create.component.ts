import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ReviewService} from './review.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements OnInit {
  id: number;
  createReviewForm: FormGroup;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  get form() {
    return this.createReviewForm.controls;
  }
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.createReviewForm = this.formBuilder.group({
      description: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  createReview() {
    this.isLoading = true;

    this.reviewService.createReview(
      this.id,
      this.form.description.value,
      this.form.rating.value,
    ).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/review', this.id]);
    }, err => {
      this.isLoading = false;

      console.log(err);
      const errorMsg = err.error.message;
      this.snackBar.open(errorMsg, 'Dismiss', {duration: 6000});
    });
  }
}
