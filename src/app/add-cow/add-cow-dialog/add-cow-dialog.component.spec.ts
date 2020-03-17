import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowDialogComponent } from './add-cow-dialog.component';

describe('AddCowDialogComponent', () => {
  let component: AddCowDialogComponent;
  let fixture: ComponentFixture<AddCowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
