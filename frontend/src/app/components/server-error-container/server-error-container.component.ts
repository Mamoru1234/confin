import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-container',
  templateUrl: './server-error-container.component.html',
  styleUrls: ['./server-error-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerErrorContainerComponent implements OnInit {
  @Input()
  error: any;

  constructor() { }

  ngOnInit(): void {
  }
}
