import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatazoneComponent } from './datazone.component';

describe('DatazoneComponent', () => {
  let component: DatazoneComponent;
  let fixture: ComponentFixture<DatazoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatazoneComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatazoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
