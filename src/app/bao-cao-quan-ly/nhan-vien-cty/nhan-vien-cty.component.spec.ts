import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanVienCtyComponent } from './nhan-vien-cty.component';

describe('NhanVienCtyComponent', () => {
  let component: NhanVienCtyComponent;
  let fixture: ComponentFixture<NhanVienCtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanVienCtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanVienCtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
