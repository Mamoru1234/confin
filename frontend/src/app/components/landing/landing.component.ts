import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private readonly restApiService: RestApiService,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.restApiService.logout().then(() => {
      document.location.reload();
    });
  }
}
