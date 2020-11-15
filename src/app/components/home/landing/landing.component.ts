import { Component, OnInit } from '@angular/core';

import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FadeInFWD } from '../../../utils/animations/fade-in-fwd.animation';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [FadeInFWD]
})
export class LandingComponent implements OnInit {

  readonly faQuoteLeft = faQuoteLeft;
  readonly faQuoteRight = faQuoteRight;

  constructor() { }

  ngOnInit(): void {
  }

}
