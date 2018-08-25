import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProgressComponent
  ],
  exports: [
    ProgressComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
