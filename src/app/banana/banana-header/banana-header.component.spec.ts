import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BananaHeaderComponent } from './banana-header.component';

describe('BananaHeaderComponent', () => {
  let component: BananaHeaderComponent;
  let fixture: ComponentFixture<BananaHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BananaHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BananaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
