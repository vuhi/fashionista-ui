import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  readonly faAngleDoubleLeft = faAngleDoubleLeft;

  status: string;
  title: string;
  message: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  get dataFromRoute(): any { return this.activatedRoute.snapshot.data; }
  get dataFromParams(): any { return this.activatedRoute.snapshot.queryParams; }

  ngOnInit(): void {
    this.status = this.dataFromParams.status || this.dataFromRoute.status;
    this.title = this.dataFromParams.title || this.dataFromRoute.title;
    this.message = this.dataFromParams.message || this.dataFromRoute.message;
  }

}
