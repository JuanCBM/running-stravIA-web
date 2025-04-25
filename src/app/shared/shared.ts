import {CommonModule, DatePipe, NgClass, NgFor, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DurationPipe} from './pipes/duration.pipe';
import {DistancePipe} from './pipes/distance.pipe';
import {TranslateModule} from '@ngx-translate/core';

// Angular Material imports
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export const SHARED_IMPORTS = [
  // Angular modules
  CommonModule,
  NgIf,
  NgFor,
  NgClass,
  DatePipe,
  FormsModule,
  ReactiveFormsModule,
  RouterLink,
  RouterLinkActive,

  // Translation
  TranslateModule,

  // Angular Material modules
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,

  // Custom pipes
  DurationPipe,
  DistancePipe,
];

export const SHARED_DECLARATIONS = [
  // Add shared components, directives, and pipes here
  DurationPipe,
  DistancePipe,
];
