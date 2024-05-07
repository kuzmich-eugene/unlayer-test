import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUnlayerTemplateComponent } from './show-unlayer-template.component';

describe('ShowUnlayerTemplateComponent', () => {
  let component: ShowUnlayerTemplateComponent;
  let fixture: ComponentFixture<ShowUnlayerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUnlayerTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowUnlayerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
