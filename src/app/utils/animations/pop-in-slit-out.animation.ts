import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const PopInSlitOut = trigger('popInSlitOut', [
  transition(':enter', [
    style({opacity: 0, transform: 'scale(0)'}),
    animate('400ms cubic-bezier(0.250, 0.460, 0.450, 0.940)', style({ opacity: '1', transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('1200ms ease-in-out', keyframes([
      style({ opacity: 1, transform: 'translateZ(0) rotateX(0)', offset: 0 }),
      style({ opacity: .6, transform: 'translateZ(-160px) rotateX(87deg)', offset: 0.2 }),
      style({ opacity: .4, transform: 'translateZ(-460px) rotateX(87deg)', offset: 0.4 }),
      style({ opacity: 0, transform: 'translateZ(-800px) rotateX(90deg)', offset: 0.6 }),
      style({ opacity: 0, width: '1px', margin: 0, padding: 0, offset: 1 }),
    ]))
  ])
]);
