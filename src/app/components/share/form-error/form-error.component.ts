import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

  @Input('control') control: AbstractControl;
  @Input('patternErr') patternErr: string;
  @Input('customErr') customErr: { type: string, errMessage: string };

  constructor() { }

  ngOnInit(): void {
  }
}
