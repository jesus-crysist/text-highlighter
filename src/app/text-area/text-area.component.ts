import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

/**
 * View component presenting text-area where text can be added and highlighted.
 */
@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnChanges {

  @Input() highlighterColor: string;

  @Output() textHighlighted: EventEmitter<string> = new EventEmitter<string>();

  editable = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // setting *editable* state of text-area element if highlighted color is NULL
    if (
      !changes.highlighterColor ||
      !changes.highlighterColor.currentValue ||
      changes.highlighterColor.currentValue !== changes.highlighterColor.previousValue
    ) {
      this.editable = !changes.highlighterColor.currentValue;
    }
  }

  endSelecting(): void {

    if (!this.highlighterColor) {
      return;
    }

    const selection = window.getSelection();

    // displaying selected text as highlighted with *highlightedColor* value as background color
    const range = selection.getRangeAt(0);
    const frag = range.extractContents(); // removing current text nodes from DOM
    const markEl = document.createElement('mark'); // creating MARK element
    markEl.style.backgroundColor = this.highlighterColor;
    markEl.appendChild(frag);
    range.insertNode(markEl); // placing MARK element where previous text was

    // emitting selected text value
    const selectedText = selection.toString();
    this.textHighlighted.emit(selectedText);

    this.unselectText();
  }

  /**
   * Hiding browser's text selection presentation.
   */
  unselectText(): void {
    const selection = window.getSelection();
    selection.collapse(null);
  }

}
