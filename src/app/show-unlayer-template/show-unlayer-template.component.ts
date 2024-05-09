import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

declare const unlayer: any;

@Component({
  selector: 'app-show-unlayer-template',
  standalone: true,
  imports: [],
  templateUrl: './show-unlayer-template.component.html',
  styleUrl: './show-unlayer-template.component.scss'
})
export class ShowUnlayerTemplateComponent implements OnInit {
  currentUnlayerTemplateDesign = '';
  unlayerDesign = '';
  unlayerHtml = '';

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}


  ngOnInit(): void {
    this.currentUnlayerTemplateDesign = this.config.data?.templateDesign ?? null;
    unlayer.init({
      id: 'editor',
      projectId: 218240,
      displayMode: 'email',
      appearance: {
        theme: 'modern_dark'
      },
      tools: {
        timer: {
          enabled: true
        },
        video: {
          enabled: true
        }
      },
      version: 'latest'
    });

    if (this.currentUnlayerTemplateDesign) {
      unlayer.loadDesign(JSON.parse(this.currentUnlayerTemplateDesign));
    }

    unlayer.addEventListener('design:updated', () => {
      unlayer.exportHtml((data: any) => {
        this.unlayerDesign = JSON.stringify(data.design);
        this.unlayerHtml = data.html;
      });
    });

    unlayer.saveDesign((design: any) => {
      console.log('save design', design);
      this.unlayerDesign = JSON.stringify(design);
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close(this.unlayerDesign);
  }
}
