import { Component, OnInit } from '@angular/core';
import { FetchService, FetchStatus } from '../../services/fetch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../../services/rest-api.service';
import { BehaviorSubject, merge } from 'rxjs';
import { TagResponse } from '../../services/rest-api.dto';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss'],
  providers: [ FetchService ],
})
export class TagsPageComponent implements OnInit {
  newTagForm!: FormGroup;
  fetchTagsWrapper = this.fetchService.createWrapper();
  tags$ = new BehaviorSubject<TagResponse[]>([]);
  addTagWrapper = this.fetchService.createWrapper();
  loading$ = this.fetchTagsWrapper.isInStatuses(FetchStatus.IN_PROGRESS, FetchStatus.INIT);
  error$ = merge(this.fetchTagsWrapper.error$, this.addTagWrapper.error$);
  FetchStatus = FetchStatus;

  constructor(
    private readonly fetchService: FetchService,
    private readonly formBuilder: FormBuilder,
    private readonly restApiService: RestApiService,
  ) { }

  ngOnInit(): void {
    this.newTagForm = this.formBuilder.group({
      value: [null, [Validators.required]],
    });
    this.loadData();
  }

  loadData(): void {
    this.fetchTagsWrapper.fetch(this.restApiService.getAllTags())
      .pipe(
        tap((tags) => this.tags$.next(tags)),
      )
      .subscribe();
  }

  createTag(): void {
    if (this.newTagForm.invalid) {
      return;
    }
    this.addTagWrapper.fetch(this.restApiService.createTag(this.newTagForm.value))
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe();
  }
}
