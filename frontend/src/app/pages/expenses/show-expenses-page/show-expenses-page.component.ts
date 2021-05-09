import { Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { BehaviorSubject, combineLatest, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDateTime } from '../../../utils/date-time.utils';
import { RestApiService } from '../../../services/rest-api.service';
import { ExpenseResponse, TagResponse } from '../../../services/rest-api.dto';

@Component({
  selector: 'app-show-expenses-page',
  templateUrl: './show-expenses-page.component.html',
  styleUrls: ['./show-expenses-page.component.scss'],
  providers: [FetchService],
})
export class ShowExpensesPageComponent implements OnInit {
  fetchTagsWrapper = this.fetchService.createWrapper();
  fetchExpensesWrapper = this.fetchService.createWrapper();

  expenses$ = new BehaviorSubject<ExpenseResponse[]>([]);
  tags$ = new BehaviorSubject<TagResponse[]>([]);

  loading$ = combineLatest([
    this.fetchExpensesWrapper.isInStatuses(FetchStatus.IN_PROGRESS),
    this.fetchTagsWrapper.isInStatuses(FetchStatus.IN_PROGRESS),
  ])
    .pipe(map((values) => values.some((it) => it)));
  error$ = merge(this.fetchExpensesWrapper.error$, this.fetchTagsWrapper.error$);

  searchForm!: FormGroup;

  constructor(
    private readonly fetchService: FetchService,
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      minDate: [null],
      maxDate: [null],
    });
  }

  search(): void {
    if (this.searchForm.invalid) {
      return;
    }
    const search: any = {};
    const formValue = this.searchForm.value;
    if (formValue.minDate) {
      search.minTimestamp = formatDateTime(formValue.minDate).getTime();
    }
    if (formValue.maxDate) {
      search.maxTimestamp = formatDateTime(formValue.maxDate).getTime();
    }
    this.fetchExpensesWrapper.fetch(this.restApiService.listExpenses(search))
      .pipe(tap((expenses) => this.expenses$.next(expenses)))
      .subscribe();

    this.fetchExpensesWrapper.fetch(this.restApiService.getAllTags())
      .pipe(tap((tags) => this.tags$.next(tags)))
      .subscribe();
  }
}
