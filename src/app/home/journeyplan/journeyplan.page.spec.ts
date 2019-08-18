import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyplanPage } from './journeyplan.page';

describe('JourneyplanPage', () => {
  let component: JourneyplanPage;
  let fixture: ComponentFixture<JourneyplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
