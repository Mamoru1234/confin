import { Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../../services/fetch.service';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from '../../../services/rest-api.service';
import { ExpenseResponse, TagResponse } from '../../../services/rest-api.dto';
import { DateTime } from 'luxon';

export interface Totals {
  totalSum: number;
  byTags: Record<number, number>;
}

@Component({
  selector: 'app-show-expenses-page',
  templateUrl: './show-expenses-page.component.html',
  styleUrls: ['./show-expenses-page.component.scss'],
  providers: [FetchService],
})
export class ShowExpensesPageComponent implements OnInit {
  fetchTagsWrapper = this.fetchService.createWrapper();
  fetchExpensesWrapper = this.fetchService.createWrapper();
  deleteExpenseWrapper = this.fetchService.createWrapper();
  NO_TAGS = -1;

  expenses$ = new BehaviorSubject<ExpenseResponse[]>([]);
  selectedTags$ = new BehaviorSubject<number[]>([]);
  filteredExpenses$ = combineLatest([this.expenses$, this.selectedTags$])
    .pipe(map(([expenses, selectedTags]): ExpenseResponse[] => {
      if (selectedTags.length === 0) {
        return expenses;
      }
      return expenses.filter((it) => selectedTags.some((selectedTag) => it.tags.includes(selectedTag)));
    }));
  tags$ = new BehaviorSubject<Record<number, TagResponse>>({});
  totals$ = new BehaviorSubject<Totals | null>(null);
  objectKeys = Object.keys;

  loading$ = combineLatest([
    this.fetchExpensesWrapper.isInStatuses(FetchStatus.IN_PROGRESS),
    this.fetchTagsWrapper.isInStatuses(FetchStatus.IN_PROGRESS),
  ])
    .pipe(map((values) => values.some((it) => it)));
  error$ = merge(this.fetchExpensesWrapper.error$, this.fetchTagsWrapper.error$, this.deleteExpenseWrapper.error$);

  searchForm!: FormGroup;

  constructor(
    private readonly fetchService: FetchService,
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      minDate: [DateTime.now().startOf('month').toSQLDate()],
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
      search.minTimestamp = DateTime.fromSQL(formValue.minDate).toMillis();
    }
    if (formValue.maxDate) {
      search.maxTimestamp = DateTime.fromSQL(formValue.maxDate).toMillis();
    }
    this.fetchExpensesWrapper.fetch(this.restApiService.listExpenses(search))
      .pipe(tap((expenses) => {
        const totals: Totals = {
          totalSum: 0,
          byTags: {},
        };
        const getByTag = (tagId: number) => {
          return totals.byTags[tagId] || 0;
        };
        expenses.forEach((it) => {
          totals.totalSum += it.amount;
          if (!it.tags || it.tags.length === 0) {
            totals.byTags[this.NO_TAGS] = getByTag(this.NO_TAGS) + it.amount;
          }
          it.tags.forEach((tagId) => {
            totals.byTags[tagId] = getByTag(tagId) + it.amount;
          });
        });
        this.totals$.next(totals);
        this.expenses$.next(expenses);
      }))
      .subscribe();

    this.fetchTagsWrapper.fetch(this.restApiService.getAllTags())
      .pipe(tap((tags) => {
        const result: Record<number, TagResponse> = {};
        tags.forEach((it) => {
          result[it.id] = it;
        });
        this.tags$.next(result);
      }))
      .subscribe();
  }

  getTagValue(tagId: string | number): string {
    const tags = this.tags$.value;
    if (!tags) {
      return '';
    }
    if (+tagId === this.NO_TAGS) {
      return 'No tags';
    }
    if (!tags[+tagId]) {
      return '';
    }
    return tags[+tagId].value;
  }

  getTotal(tagId: string): number {
    // tslint:disable-next-line:no-non-null-assertion
    return this.totals$.value?.byTags[tagId as any]!;
  }

  handleTrashClick(expenseId: number): void {
    const shouldDelete = confirm('Точно хочеш видалити цю витрату?');
    if (shouldDelete) {
      this.deleteExpenseWrapper.fetch(this.restApiService.deleteExpense(expenseId))
        .subscribe(() => this.search());
    }
  }

  toggleTag(tagId: number) {
    const selectedTags = this.selectedTags$.value;
    if (selectedTags.includes(tagId)) {
      this.selectedTags$.next(selectedTags.filter((it) => it !== tagId));
    } else {
      this.selectedTags$.next(selectedTags.concat([tagId]));
    }
  }

  isActiveTag(tagId: number) {
    return this.selectedTags$.value.includes(tagId);
  }
}
