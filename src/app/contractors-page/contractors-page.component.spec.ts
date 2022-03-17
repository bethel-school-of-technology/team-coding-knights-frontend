import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsPageComponent } from './contractors-page.component';

describe('ContractorsPageComponent', () => {
  let component: ContractorsPageComponent;
  let fixture: ComponentFixture<ContractorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
