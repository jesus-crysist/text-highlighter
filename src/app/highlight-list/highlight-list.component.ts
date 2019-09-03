import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action, ActionTypes } from 'src/app/state/actions';
import { HighlightModel } from 'src/app/state/state';
import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';

/**
 * Feature component for listing user's highlights and filtering them by selected color.
 */
@Component({
  selector: 'app-highlight-list',
  templateUrl: './highlight-list.component.html',
  styleUrls: ['./highlight-list.component.css']
})
export class HighlightListComponent {

  private highlights$: Observable<Array<HighlightModel>>;
  private selectedColor$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  colors$: Observable<Array<string>>;
  filteredHighlights$: Observable<Array<HighlightModel>>;

  constructor(private store: TextHighlighterStore) {
    this.highlights$ = this.store.getValueState('highlights');
    this.colors$ = this.store.getValueState('colors');

    // combining values from all highlights and selected color to get filtered colors whenever any of the value is changed
    this.filteredHighlights$ = combineLatest([this.highlights$, this.selectedColor$])
      .pipe(
        map(([allHighlights, selectedColor]) => allHighlights.filter(h => h.color === selectedColor || !selectedColor))
    );
  }

  /**
   * Setting next selected color.
   */
  filterByColor(color?: string): void {
    this.selectedColor$.next(color);
  }

  /**
   * Dispatching action for highlight to be removed.
   */
  removeHighlight(highlight: HighlightModel): void {
    this.store.dispatch(new Action(ActionTypes.HighlightRemove, highlight));
  }

}
