import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneCardComponent } from './gene-card.component';

describe('GeneCardComponent', () => {
  let component: GeneCardComponent;
  let fixture: ComponentFixture<GeneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
