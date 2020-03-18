import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoPhanListComponent } from './bo-phan-list.component';

describe('BoPhanListComponent', () => {
  let component: BoPhanListComponent;
  let fixture: ComponentFixture<BoPhanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoPhanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoPhanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
