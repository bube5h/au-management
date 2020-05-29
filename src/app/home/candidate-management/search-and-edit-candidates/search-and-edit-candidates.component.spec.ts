import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndEditCandidatesComponent } from './search-and-edit-candidates.component';

describe('SearchAndEditCandidatesComponent', () => {
  let component: SearchAndEditCandidatesComponent;
  let fixture: ComponentFixture<SearchAndEditCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAndEditCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndEditCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
