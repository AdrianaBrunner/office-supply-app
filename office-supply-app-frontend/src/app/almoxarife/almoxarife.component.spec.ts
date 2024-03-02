import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmoxarifeComponent } from './almoxarife.component';

describe('AlmoxarifeComponent', () => {
  let component: AlmoxarifeComponent;
  let fixture: ComponentFixture<AlmoxarifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmoxarifeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmoxarifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
