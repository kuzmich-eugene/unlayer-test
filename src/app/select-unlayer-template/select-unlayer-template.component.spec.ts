import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnlayerTemplateComponent } from './select-unlayer-template.component';

describe('UnlayerEmailEditorComponent', () => {
  let component: SelectUnlayerTemplateComponent;
  let fixture: ComponentFixture<SelectUnlayerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUnlayerTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUnlayerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
