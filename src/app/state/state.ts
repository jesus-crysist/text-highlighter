export class HighlightModel {
  constructor(
    public text: string,
    public color: string
  ) {
  }
}

/**
 * State model, containing list of colors, list of highlights and picked color for highlighting.
 */
export class HighlighterState {
  colors: Array<string>;
  pickedColor: string;
  highlights: Array<HighlightModel>;
}

/**
 * Initial state with empty values.
 */
export const INITIAL_STATE: HighlighterState = {
  colors: [],
  pickedColor: null,
  highlights: []
};
