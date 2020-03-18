import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanVienThuViecComponent } from './nhan-vien-thu-viec.component';

describe('NhanVienThuViecComponent', () => {
  let component: NhanVienThuViecComponent;
  let fixture: ComponentFixture<NhanVienThuViecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanVienThuViecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanVienThuViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
