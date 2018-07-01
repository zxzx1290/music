import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingMainComponent } from './playing-main.component';

describe('PlayingMainComponent', () => {
  let component: PlayingMainComponent;
  let fixture: ComponentFixture<PlayingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
