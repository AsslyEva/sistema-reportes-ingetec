import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-title-dashboard',
  templateUrl: './title-dashboard.component.html',
  styleUrls: ['./title-dashboard.component.scss']
})
export class TitleDashboardComponent implements OnInit {

  @Input() numero: number = 1;
  @Input() link: string = '/';
  @Input() title: string = '';


  // title: string = environment.systemName;

  color: string = 'rgba(0, 165, 165, 1)';

  constructor() { }

  ngOnInit(): void {
    switch (this.numero) {
      case 1:
        this.color = 'rgb(275, 165, 0)';
        break;
      case 2:
        this.color = 'rgb(0, 165, 165)';
        break;
      case 3:
        this.color = 'rgb(235, 50, 25)';
        break;
      case 4:
        this.color = 'rgb(50, 60, 55)';
        break;
        break;
      default:
        break;
    }
  }



}
