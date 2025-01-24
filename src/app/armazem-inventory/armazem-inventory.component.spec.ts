import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmazemInventoryComponent } from './armazem-inventory.component';

describe('ArmazemInventoryComponent', () => {
  let component: ArmazemInventoryComponent;
  let fixture: ComponentFixture<ArmazemInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmazemInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmazemInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
