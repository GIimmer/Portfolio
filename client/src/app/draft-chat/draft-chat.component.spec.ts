import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftChatComponent } from './draft-chat.component';

describe('DraftChatComponent', () => {
  let component: DraftChatComponent;
  let fixture: ComponentFixture<DraftChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
