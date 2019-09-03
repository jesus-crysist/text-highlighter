import { TestBed } from '@angular/core/testing';
import { Action, ActionTypes } from 'src/app/state/actions';
import { HighlightModel, INITIAL_STATE } from 'src/app/state/state';

import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';

const highlightMocks = [
  { color: 'red', text: 'brown fox'},
  { color: 'green', text: 'lazy dog'}
];

describe('TextHighlighterStore', () => {
  let service: TextHighlighterStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextHighlighterStore]
    });
    service = TestBed.get(TextHighlighterStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain "state$" Observables and initial value', () => {
    expect(service.state$).toBeDefined();
    expect(service.state$.subscribe).toBeDefined();
    expect(service.state).toEqual(INITIAL_STATE);
  });

  it('should be able to get Observable for single property', () => {
    expect(service.getValueState('pickedColor').subscribe).toBeTruthy();
  });

  it('should dispatch "ColorAddValues" action', () => {

    const colors = ['red', 'yellow', 'green'];

    service.dispatch(new Action(ActionTypes.ColorAddValues, colors));

    expect(service.state.colors).toBe(colors);
    expect(service.state.pickedColor).toBeNull();
    expect(service.state.highlights.length).toBe(0);
  });

  it('should dispatch "ColorPicked" action', () => {

    const pickedColor = 'blue';

    service.dispatch(new Action(ActionTypes.ColorPicked, pickedColor));

    expect(service.state.pickedColor).toBe(pickedColor);
    expect(service.state.highlights.length).toBe(0);
  });

  it('should dispatch "HighlightAddValues" action', () => {

    service.dispatch(new Action(ActionTypes.HighlightAddValues, highlightMocks));

    expect(service.state.highlights.length).toBe(2);
    expect(service.state.pickedColor).toBeNull();
  });

  it('should dispatch "HighlightAdd" action', () => {

    const highlightedText = new HighlightModel('quick brown fox', 'blue');

    service.dispatch(new Action(ActionTypes.HighlightAdd, highlightedText));

    expect(service.state.highlights[0]).toEqual(highlightedText);
    expect(service.state.pickedColor).toBeNull();
  });

  it('should dispatch "HighlightRemove" action', () => {

    service.dispatch(new Action(ActionTypes.HighlightAddValues, highlightMocks));

    service.dispatch(new Action(ActionTypes.HighlightRemove, highlightMocks[1]));

    expect(service.state.highlights.length).toEqual(1);
    expect(service.state.pickedColor).toBeNull();
  });
});
