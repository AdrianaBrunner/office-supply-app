import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ListasComponent } from '../listas/listas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule, MatToolbarModule, MatTableModule, MatExpansionModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule,
    CommonModule, FormsModule, ReactiveFormsModule, ListasComponent
  ],
  exports: [
    CommonModule,
    MatCardModule, MatToolbarModule, MatTableModule, MatExpansionModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule,
    CommonModule, FormsModule, ReactiveFormsModule, ListasComponent
  ]
})
export class SharedImportsModule {}
