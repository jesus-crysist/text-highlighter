import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorPickerComponent } from 'src/app/color-picker/color-picker.component';

const colorMocks = ['red', 'yellow', 'green'];

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let debugElement: DebugElement;
  let colorItems: Array<DebugElement>;
  let selectedColor: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ColorPickerComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    colorItems = debugElement.queryAll(By.css('li'));

    component.picked.subscribe(color => selectedColor = color);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty initially', () => {
    expect(colorItems.length).toBe(0);
    expect(debugElement.query(By.css('p'))).toBeTruthy();
  });

  it('should display elements provided in input', () => {

    component.colors = colorMocks;
    fixture.detectChanges();

    colorItems = debugElement.queryAll(By.css('li a'));

    expect(colorItems.length).toBe(colorMocks.length + 1); // including "no-highlighter" item
    expect(colorItems[0].nativeElement.style.color).toContain(colorMocks[0]);
    expect(colorItems[1].nativeElement.style.color).toContain(colorMocks[1]);
    expect(colorItems[2].nativeElement.style.color).toContain(colorMocks[2]);
  });

  it('should trigger "selected" event if color item is clicked on', () => {

    component.colors = colorMocks;
    fixture.detectChanges();

    colorItems = debugElement.queryAll(By.css('li a'));
    const redColorItem = colorItems[0];
    redColorItem.triggerEventHandler('click', {target: redColorItem.nativeElement, preventDefault: () => {}});

    expect(selectedColor).toBe(colorMocks[0]);
  });

  it('should deselect previously selected color when clicking on X', () => {

    component.colors = colorMocks;
    fixture.detectChanges();

    component.selectColor('red');

    colorItems = debugElement.queryAll(By.css('li a'));
    const removeColorItem = colorItems[3]; // last item is the X item
    removeColorItem.triggerEventHandler('click', {target: removeColorItem.nativeElement, preventDefault: () => {}});

    expect(selectedColor).toBeNull();
  });

  it('should display vertically if such input is provided', () => {

    component.colors = colorMocks;
    fixture.detectChanges();

    const listElement = debugElement.query(By.css('ul'));
    expect(listElement.nativeElement.className).toContain('horizontal');

    component.vertical = true;
    fixture.detectChanges();

    expect(listElement.nativeElement.className).toContain('vertical');
  });
});
