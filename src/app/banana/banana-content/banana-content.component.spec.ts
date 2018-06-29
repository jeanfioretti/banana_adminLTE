import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BananaContentComponent } from './banana-content.component';

describe('BananaContentComponent', () => {
  let component: BananaContentComponent;
  let fixture: ComponentFixture<BananaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BananaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BananaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
