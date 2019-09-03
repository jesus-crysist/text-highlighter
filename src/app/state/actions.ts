export enum ActionTypes {
  ColorAddValues = '[Color] Add values',
  ColorPicked = '[Color] Picked',
  HighlightAddValues = '[Highlight] Add values',
  HighlightAdd = '[Highlight] Add',
  HighlightRemove = '[Highlight] Remove'
}

/**
 * Action to be dispatched.
 */
export class Action {

  constructor(
    public type: ActionTypes,
    public payload: any
  ) {}
}
