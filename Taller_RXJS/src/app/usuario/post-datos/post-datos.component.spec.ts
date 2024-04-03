import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDatosComponent } from './post-datos.component';

describe('PostDatosComponent', () => {
  let component: PostDatosComponent;
  let fixture: ComponentFixture<PostDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostDatosComponent]
    });
    fixture = TestBed.createComponent(PostDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
