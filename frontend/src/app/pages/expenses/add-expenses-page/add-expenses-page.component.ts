import { Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/rest-api.service';
import { BehaviorSubject, merge } from 'rxjs';
import { TagResponse } from '../../../services/rest-api.dto';
import { tap } from 'rxjs/operators';
import { formatDateTime } from '../../../utils/date-time.utils';

const SCALE = 10 ** 2;

@Component({
  selector: 'app-add-expenses-page',
  templateUrl: './add-expenses-page.component.html',
  styleUrls: ['./add-expenses-page.component.scss'],
  providers: [FetchService],
})
export class AddExpensesPageComponent implements OnInit {
  addExpenseWrapper = this.fetchService.createWrapper();
  fetchTagsWrapper = this.fetchService.createWrapper();
  loading$ = this.fetchTagsWrapper.isInStatuses(FetchStatus.IN_PROGRESS, FetchStatus.INIT);
  error$ = merge(this.fetchTagsWrapper.error$, this.addExpenseWrapper.error$);
  form!: FormGroup;
  tags$ = new BehaviorSubject<TagResponse[]>([]);
  selectedTags$ = new BehaviorSubject<number[]>([]);
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
    this.loadData();
  }

  loadData(): void {
    this.fetchTagsWrapper
      .fetch(this.restApiService.getAllTags())
      .pipe(tap((tags) => this.tags$.next(tags)))
      .subscribe()
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.addExpenseWrapper.fetch(this.restApiService.addExpense({
      description: this.form.value.description,
      amount: this.formatSum(),
      currency: 'UAH',
      timestamp: formatDateTime(this.form.value.date, this.form.value.time).getTime(),
      tags: this.selectedTags$.value,
    })).subscribe();
  }

  formatSum(): number {
    const { amount } = this.form.value;
    return parseFloat(amount.toFixed(2)) * SCALE;
  }

  toggle(id: number): void {
    const selectedTags = this.selectedTags$.value;
    if (selectedTags.includes(id)) {
      this.selectedTags$.next(selectedTags.filter((it) => it !== id));
    } else {
      this.selectedTags$.next(selectedTags.concat([id]));
    }
  }
}
