import { Component } from '@angular/core';
import { DialogsService } from './components/shared/dialogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reportes-sistema-ingetec';
  // public result: any;
  
  // constructor(
  //   // private dialogsService: DialogsService
  //   ) { }
  
  // public openDialog() {
  //   this.dialogsService
  //     .confirm('Confirm Dialog', 'Are you sure you want to do this?')
  //     .subscribe((res: any) => this.result = res);
  // }
}