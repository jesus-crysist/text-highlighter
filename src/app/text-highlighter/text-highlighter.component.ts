import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, ActionTypes } from 'src/app/state/actions';
import { HighlightModel } from 'src/app/state/state';
import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';

/**
 * Feature component showing text-area for entering text and highlighting parts of it
 * and color picker on the side to select color for text highlighting.
 */
@Component({
  selector: 'app-text-highlighter',
  templateUrl: './text-highlighter.component.html',
  styleUrls: ['./text-highlighter.component.css']
})
export class TextHighlighterComponent {

  colors$: Observable<Array<string>>;
  highlighterColor$: Observable<string>;
  highlights$: Observable<Array<HighlightModel>>;

  constructor(private store: TextHighlighterStore) {
    this.colors$ = this.store.getValueState('colors');
    this.highlighterColor$ = this.store.getValueState('pickedColor');
    this.highlights$ = this.store.getValueState('highlights');
  }

  /**
   * Dispatch action for picking highlighter color.
   */
  pickColor(color: string): void {
    this.store.dispatch(new Action(ActionTypes.ColorPicked, color));
  }

  /**
   * Dispatching action to add new highlight into the list.
   * Taking *picked* color form the state.
   * @param text  Text that is highlighted.
   */
  addHighlightedText(text: string): void {
    this.store.dispatch(new Action(ActionTypes.HighlightAdd, new HighlightModel(text, this.store.state.pickedColor)));
  }
}
