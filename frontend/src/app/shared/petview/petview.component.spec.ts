import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetviewComponent } from './petview.component';

describe('PetviewComponent', () => {
  let component: PetviewComponent;
  let fixture: ComponentFixture<PetviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
