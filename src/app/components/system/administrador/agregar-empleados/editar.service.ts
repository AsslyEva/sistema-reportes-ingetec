import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';


@Injectable()
export class EditarService {

    constructor(private dialog: MatDialog) { }

    public confirm(data: any): Observable<boolean> {

        let dialogRef: MatDialogRef<EditarEmpleadoComponent>;

        dialogRef = this.dialog.open(EditarEmpleadoComponent,{
          data: {data}
        });

        // dialogRef.componentInstance.title = title;
        // dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
