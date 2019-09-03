import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * View component displaying list of possible highlighter colors.
 * List can be displayed horizontally (default) and vertically by providing necessary input.
 */
@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {

  @Input() colors: Array<string>;
  @Input() vertical: boolean;
  @Input() descriptionText: string;

  @Output() picked: EventEmitter<string> = new EventEmitter<string>();

  selectedColor: string;

  /**
   * Selecting color and emitting that value to the parent component.
   */
  selectColor(color: string, event?: MouseEvent): void {

    if (event) {
      event.preventDefault();
    }

    this.selectedColor = color;
    this.picked.emit(color);
  }
}
