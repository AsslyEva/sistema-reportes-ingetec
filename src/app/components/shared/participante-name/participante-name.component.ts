import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-participante-name',
  templateUrl: './participante-name.component.html',
  styleUrls: ['./participante-name.component.scss']
})
export class ParticipanteNameComponent implements OnInit {

  // @Input() numero: number = 1;
  @Input() nameParticipante: string = '';
  @Input() link: string = '/';

  // color: string = 'rgba(0, 165, 165, 1)';

  constructor() { }

  ngOnInit(): void {
    // switch (this.numero) {
    //   case 1:
    //     this.color = '#235aba';
    //     break;
    //   case 2:
    //     this.color = '#323C37';
    //     break;
    //   case 3:
    //     this.color = '#EB3219';
    //     break;
    //   case 4:
    //     this.color = '#157582';
    //     break;
    //     break;
    //   default:
    //     break;
    // }
  }



}
