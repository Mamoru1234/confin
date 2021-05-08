import { Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/rest-api.service';

const SCALE = 10 ** 2;

@Component({
  selector: 'app-add-expenses-page',
  templateUrl: './add-expenses-page.component.html',
  styleUrls: ['./add-expenses-page.component.scss'],
  providers: [FetchService],
})
export class AddExpensesPageComponent implements OnInit {
  addExpenseWrapper = this.fetchService.createWrapper();
  form!: FormGroup;
  FetchStatus = FetchStatus;
  constructor(
    private readonly fetchService: FetchService,
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: [null, [Validators.required]],
      time: [null],
      date: [null, [Validators.required]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.addExpenseWrapper.fetch(this.restApiService.addExpense({
      description: this.form.value.description,
      amount: this.formatSum(),
      currency: 'UAH',
      timestamp: this.formatTimestamp(),
    })).subscribe();
  }

  formatTimestamp(): number {
    const formValue = this.form.value;
    const [year, month, day] = formValue.date.split('-').map((it: string) => +it);
    if (!formValue.time) {
      return new Date(year, month, day).getTime();
    }
    const [hour, minute] = formValue.time.split(':').map((it: string) => +it);
    console.log(formValue.time);
    return new Date(year, month, day, hour, minute).getTime();
  }

  formatSum(): number {
    const { amount } = this.form.value;
    return parseFloat(amount.toFixed(2)) * SCALE;
  }
}
