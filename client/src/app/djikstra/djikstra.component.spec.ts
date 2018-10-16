import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjikstraComponent } from './djikstra.component';

describe('DjikstraComponent', () => {
  let component: DjikstraComponent;
  let fixture: ComponentFixture<DjikstraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjikstraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjikstraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
