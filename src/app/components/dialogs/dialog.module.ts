import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { ExampleDialogComponent } from './example/example-dialog.component';

@NgModule({
  declarations: [ExampleDialogComponent],
  entryComponents: [ExampleDialogComponent],
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class DialogModule {}
