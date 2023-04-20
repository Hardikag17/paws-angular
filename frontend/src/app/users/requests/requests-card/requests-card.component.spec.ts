import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsCardComponent } from './requests-card.component';

describe('RequestsCardComponent', () => {
  let component: RequestsCardComponent;
  let fixture: ComponentFixture<RequestsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
