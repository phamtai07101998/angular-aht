import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopDongListComponent } from './hop-dong-list.component';

describe('HopDongListComponent', () => {
  let component: HopDongListComponent;
  let fixture: ComponentFixture<HopDongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopDongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopDongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
