import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DetalleCuadrillaComponent } from './detalle-cuadrilla/detalle-cuadrilla.component';


@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<DetalleCuadrillaComponent>;

        dialogRef = this.dialog.open(DetalleCuadrillaComponent);

        // dialogRef.componentInstance.title = title;
        // dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}