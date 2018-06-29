import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BananaLeftSideComponent } from './banana-left-side.component';

describe('BananaLeftSideComponent', () => {
  let component: BananaLeftSideComponent;
  let fixture: ComponentFixture<BananaLeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BananaLeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BananaLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
