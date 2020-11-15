import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const FadeInFWD = trigger('fadeInFWD', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-30px)' }),
    animate('.8s cubic-bezier(0.390, 0.575, 0.565, 1.000)', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  // transition(':leave', [
  //   animate('400ms', style({ opacity: 0, transform: 'translateY(10px)' })),
  // ])
]);
