import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss'],
})
export class InputWrapperComponent implements OnInit {
  @Input() control!: AbstractControl | null;

  constructor() { }

  ngOnInit(): void {
  }

}
