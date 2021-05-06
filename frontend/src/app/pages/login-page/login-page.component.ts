import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchService, FetchStatus } from '../../services/fetch.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [FetchService],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  loginFetchWrapper = this.fetchService.createWrapper();
  isLoading$ = this.loginFetchWrapper.isInStatus(FetchStatus.IN_PROGRESS);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly fetchService: FetchService,
    private readonly restApiService: RestApiService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  login(): void {
    console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }
    this.loginFetchWrapper.fetch(this.restApiService.login(this.form.value))
      .subscribe();
  }
}
