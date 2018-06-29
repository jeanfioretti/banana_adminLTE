import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BananaControlSidebarComponent } from './banana-control-sidebar.component';

describe('BananaControlSidebarComponent', () => {
  let component: BananaControlSidebarComponent;
  let fixture: ComponentFixture<BananaControlSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BananaControlSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BananaControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
