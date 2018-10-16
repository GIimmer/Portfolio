import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UntitledComponent } from './untitled.component';

describe('UntitledComponent', () => {
  let component: UntitledComponent;
  let fixture: ComponentFixture<UntitledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UntitledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UntitledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
