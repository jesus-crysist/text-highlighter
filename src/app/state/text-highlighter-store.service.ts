import { Injectable } from '@angular/core';
import { Action, ActionTypes } from 'src/app/state/actions';
import { RxjsStore } from 'src/app/state/rxjs-store';
import { HighlighterState, HighlightModel, INITIAL_STATE } from 'src/app/state/state';

/**
 * Implementation of the RxjsStore for TextHighlighter application.
 */
@Injectable()
export class TextHighlighterStore extends RxjsStore<HighlighterState> {

  constructor() {
    super(INITIAL_STATE);
  }

  /**
   * Based on combination of NgRx's *dispatch()* and *reduce()* methods.
   */
  dispatch(action: Action): void {

    const currentState = this.state;
    let newState: HighlighterState;

    switch (action.type) {

      case ActionTypes.ColorAddValues:
        newState = {
          ...currentState,
          colors: action.payload
        };
        break;

      case ActionTypes.ColorPicked:
        newState = {
          ...currentState,
          pickedColor: action.payload
        };
        break;

      case ActionTypes.HighlightAddValues:
        newState = {
          ...currentState,
          highlights: action.payload
        };
        break;

      case ActionTypes.HighlightAdd:
        newState = {
          ...currentState,
          highlights: [...currentState.highlights, action.payload as HighlightModel]
        };
        break;

      case ActionTypes.HighlightRemove:
        newState = {
          ...currentState,
          highlights: currentState.highlights.filter(h => h.color !== action.payload.color || h.text !== action.payload.text)
        };
        break;

      default:
        newState = {...currentState};
    }

    this.setState(newState);
  }
}
