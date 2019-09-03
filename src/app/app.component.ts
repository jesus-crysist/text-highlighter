import { Component } from '@angular/core';
import { Action, ActionTypes } from 'src/app/state/actions';
import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';

/**
 * Initial App component displays top menu and holds *<router-outlet>* for feature components.
 * Also, as a part of initialization, list of colors is loaded into the store.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Text Highlighter App';

  constructor(private store: TextHighlighterStore) {
    this.store.dispatch(new Action(ActionTypes.ColorAddValues, ['red', 'yellow', 'green']));
  }
}
