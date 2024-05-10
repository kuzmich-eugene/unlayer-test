import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnlayerService } from '../unlayer.service';
import { Subject, firstValueFrom, takeUntil, tap } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
  currentTemplate = new FormControl<any>(null);
  unlayerDesign = '';
  unlayerHtml = '';

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

    this.currentTemplate.valueChanges.pipe(
      tap((value) => {
        this.onDesign(value);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  onDesign(template: any): void {
    unlayer.loadDesign(template.design);
    unlayer.saveDesign((design: any)=>{
      this.unlayerDesign = JSON.stringify(design);
      console.log(this.unlayerDesign,"Current deisgn")
    })
  }

  onCloseDialog(): void {
    this.dialogRef.close(this.unlayerDesign);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
