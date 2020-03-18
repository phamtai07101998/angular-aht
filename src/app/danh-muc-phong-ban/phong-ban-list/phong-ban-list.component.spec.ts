import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongBanListComponent } from './phong-ban-list.component';

describe('PhongBanListComponent', () => {
  let component: PhongBanListComponent;
  let fixture: ComponentFixture<PhongBanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongBanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongBanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
