import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';



const MaterialComponents = [
  MatDialogModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatTooltipModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatTabsModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatCardModule,
  MatBadgeModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTableModule,
  MatChipsModule,
  MatStepperModule,
  MatChipsModule,
];


@NgModule({
    declarations: [],
    imports: [
        MaterialComponents
    ],
    exports: [
        MaterialComponents
    ]
})
export class AngularMaterialModule { }
