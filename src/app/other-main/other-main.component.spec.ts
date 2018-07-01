import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMainComponent } from './other-main.component';

describe('OtherMainComponent', () => {
  let component: OtherMainComponent;
  let fixture: ComponentFixture<OtherMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
