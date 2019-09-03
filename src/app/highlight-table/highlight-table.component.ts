import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HighlightModel } from 'src/app/state/state';

/**
 * View component displaying list of highlights and emitting user's action for removing certain highlight.
 */
@Component({
  selector: 'app-highlight-table',
  templateUrl: './highlight-table.component.html',
  styleUrls: ['./highlight-table.component.css']
})
export class HighlightTableComponent {

  @Input() highlights: Array<HighlightModel>;

  @Output() remove: EventEmitter<HighlightModel> = new EventEmitter<HighlightModel>();

  /**
   * Just emit the highlight to be removed.
   */
  removeHighlight(highlight: HighlightModel): void {
    this.remove.emit(highlight);
  }
}
