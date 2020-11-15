import { animate, state, style, transition, trigger } from '@angular/animations';

export const ExpandCollapse = trigger('expandCollapse', [
  transition(
    ':enter',
    [
      style({ height: 0, opacity: 0, overflow: 'hidden' }),
      animate('300ms ease-out',
        style({ height: '*', opacity: 1, overflow: 'hidden' }))
    ]
  ),
  transition(
    ':leave',
    [
      style({ height: '*', opacity: 1, overflow: 'hidden' }),
      animate('300ms ease-in',
        style({ height: 0, opacity: 0, overflow: 'hidden' }))
    ]
  )
]);

export const ExpandCollapseWithState = trigger('expandCollapseWithState', [
  state('collapsed', style({height: '0px', minHeight: '0'})),
  state('expanded', style({height: '*'})),
  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);
