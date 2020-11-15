import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-btn-clear',
  templateUrl: './form-btn-clear.component.html',
  styleUrls: ['./form-btn-clear.component.scss']
})
export class FormBtnClearComponent implements OnInit {

  @Input('control') control: AbstractControl;

  constructor() { }

  ngOnInit(): void {
  }
}
