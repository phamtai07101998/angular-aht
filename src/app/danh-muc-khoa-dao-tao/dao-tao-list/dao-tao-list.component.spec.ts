import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaoTaoListComponent } from './dao-tao-list.component';

describe('DaoTaoListComponent', () => {
  let component: DaoTaoListComponent;
  let fixture: ComponentFixture<DaoTaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaoTaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaoTaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
