import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BananaFooterComponent } from './banana-footer.component';

describe('BananaFooterComponent', () => {
  let component: BananaFooterComponent;
  let fixture: ComponentFixture<BananaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BananaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BananaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
