import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerComponent } from 'src/app/color-picker/color-picker.component';
import { HighlightListComponent } from 'src/app/highlight-list/highlight-list.component';
import { HighlightTableComponent } from 'src/app/highlight-table/highlight-table.component';
import { Action, ActionTypes } from 'src/app/state/actions';
import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';

const highlightMocks = [
  {
    color: 'red',
    text: 'brown fox'
  },
  {
    color: 'yellow',
    text: 'lazy dog'
  },
  {
    color: 'red',
    text: 'red fox'
  }
];

describe('HighlightsComponent', () => {
  let component: HighlightListComponent;
  let store: TextHighlighterStore;
  let fixture: ComponentFixture<HighlightListComponent>;
  let debugElement: DebugElement;
  let filteredHighlights = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          HighlightListComponent,
          HighlightTableComponent,
          ColorPickerComponent
        ],
        providers: [TextHighlighterStore]
      })
      .compileComponents();

    store = TestBed.get(TextHighlighterStore);

    fixture = TestBed.createComponent(HighlightListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    component.filteredHighlights$.subscribe(fh => filteredHighlights = fh);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display new data when input is changed', () => {

    expect(filteredHighlights.length).toBe(0); // initial value

    store.dispatch(new Action(ActionTypes.HighlightAddValues, highlightMocks));

    expect(filteredHighlights.length).toBe(3);
  });

  it('should filter values by "red" color', () => {

    store.dispatch(new Action(ActionTypes.HighlightAddValues, highlightMocks));
    fixture.detectChanges();

    // unfiltered highlights
    expect(filteredHighlights.length).toBe(3);

    component.filterByColor('red');

    expect(filteredHighlights.length).toBe(2);
  });

  it('should dispatch action to remove element from the highlight list', () => {

    spyOn(store, 'dispatch').and.callThrough();

    store.dispatch(new Action(ActionTypes.HighlightAddValues, highlightMocks));

    expect(filteredHighlights.length).toBe(3);

    component.removeHighlight(highlightMocks[0]);

    expect(store.dispatch).toHaveBeenCalled();
    expect(filteredHighlights.length).toBe(2);
  });
});
