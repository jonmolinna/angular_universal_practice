import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacionPage } from './animacion-page';

describe('AnimacionPage', () => {
  let component: AnimacionPage;
  let fixture: ComponentFixture<AnimacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimacionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
