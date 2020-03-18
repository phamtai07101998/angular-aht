import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanSuListComponent } from './nhan-su-list.component';

describe('NhanSuListComponent', () => {
  let component: NhanSuListComponent;
  let fixture: ComponentFixture<NhanSuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanSuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanSuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
