import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AgregarEmpleadoComponent } from './agregar-empleado/agregar-empleado.component';


@Injectable()
export class AgregarService {

    constructor(private dialog: MatDialog) { }

    public confirm(codigo: string, lider: string): Observable<boolean> {

        let dialogRef: MatDialogRef<AgregarEmpleadoComponent>;

        dialogRef = this.dialog.open(AgregarEmpleadoComponent,{
          data: {codigo: codigo, lider: lider}
        });

        // dialogRef.componentInstance.title = title;
        // dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
