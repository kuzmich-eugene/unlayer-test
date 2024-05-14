import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, firstValueFrom, takeUntil, tap } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { UnlayerService } from '../unlayer.service';

declare const unlayer: any;

@Component({
  selector: 'app-select-unlayer-template',
  standalone: true,
  imports: [DropdownModule, ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-unlayer-template.component.html',
  styleUrl: './select-unlayer-template.component.scss'
})
export class SelectUnlayerTemplateComponent {
  templates = [];
  currentTemplate = new FormControl<any>({ value: null, disabled: true });
  unlayerDesign = '';
  unlayerHtml = '';
  isUnlayerEditorReady = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private unlayerService: UnlayerService,
    private dialogRef: DynamicDialogRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.templates = await firstValueFrom(this.unlayerService.getUnlayerTemplates());
    console.log(this.templates, 'templates')

    unlayer.init({
      id: 'editor1',
      projectId: 218241,
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

    unlayer.addEventListener('design:updated', () => {
      unlayer.exportHtml((data: any) => {
        this.unlayerDesign = JSON.stringify(data.design);
        this.unlayerHtml = data.html;
      });
    });

    unlayer.addEventListener('editor:ready', () => {
      this.isUnlayerEditorReady = true;
      this.currentTemplate.enable({ emitEvent: false});
      console.log('editor:ready');
    });

    this.currentTemplate.valueChanges.pipe(
      tap((template) => {
        unlayer.loadDesign(template.design);
        this.saveDesign();
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  async onCloseDialog(): Promise<void> {
    await this.saveDesign();
    this.dialogRef.close(this.unlayerDesign);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private asyncDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  };

  private async saveDesign(): Promise<void> {
    await this.asyncDelay(100);
    unlayer.saveDesign((design: any)=>{
      this.unlayerDesign = JSON.stringify(design);
    })
  }
}
