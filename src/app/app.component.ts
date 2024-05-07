import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { SelectUnlayerTemplateComponent } from './select-unlayer-template/select-unlayer-template.component';
import { ShowUnlayerTemplateComponent } from './show-unlayer-template/show-unlayer-template.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService]
})
export class AppComponent {
  selectedTemplateDesign: string = '';

  constructor(
    private dialogService: DialogService
  ) {}

  async onSelectTemplate(): Promise<void> {
    const dialogRef = this.dialogService.open(SelectUnlayerTemplateComponent, {
      closable: false,
      styleClass: 'unlayer-editor-dialog',
    });

    const design: string = await firstValueFrom(dialogRef.onClose);
    this.selectedTemplateDesign = design;
    console.log(design, 'selected template design');
  }

  async onShowSelectedTemplate(): Promise<void> {
    const dialogRef: DynamicDialogRef = this.dialogService.open(ShowUnlayerTemplateComponent, {
      closable: false,
      styleClass: 'unlayer-editor-dialog',
      data: { templateDesign: this.selectedTemplateDesign }
    });

    const design: string = await firstValueFrom(dialogRef.onClose);
    this.selectedTemplateDesign = design;
    console.log(design, 'selected template design');
  }
}
