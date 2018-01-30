import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Animation module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Default display modules
import {
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule
  ],
  declarations: []
})
export class AppMaterialModule { }
