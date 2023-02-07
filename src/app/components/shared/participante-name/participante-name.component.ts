import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-participante-name',
  templateUrl: './participante-name.component.html',
  styleUrls: ['./participante-name.component.scss']
})
export class ParticipanteNameComponent implements OnInit {

  @Input() numero: number = 1;
  @Output() nameParticipante: string = '';
  @Input() link: string = '/';

  color: string = 'rgba(0, 165, 165, 1)';

  constructor() { }

  ngOnInit(): void {
    switch (this.numero) {
      case 46:
        this.color = '#235aba';
        this.nameParticipante = 'ELVIS LLACZA GUADALUPE';
      break;
      case 47:
        this.color = '#235aba';
        this.nameParticipante = 'EMMY PAREDES ROJAS';
      break;
      case 35:
        this.color = '#235aba';
        this.nameParticipante = 'JESUS PUCUHUARANGA BALDEON';

        break;
      case 36:
        this.color = '#235aba';
        this.nameParticipante = 'JHONATAN RICALDI PAREDES';
        break;

      case 37:
        this.color = '#235aba';
        this.nameParticipante = 'CRISTIAN VALENCIA MARCOS';
        break;

      case 38:
        this.color = '#235aba';
        this.nameParticipante = 'VICTOR ZURITA PARIAN';

        break;
      case 39:
        this.color = '#235aba';
        this.nameParticipante = 'SERGIO HILARIO BARRIOS';
        break;

      case 40:
        this.color = '#235aba';
        this.nameParticipante = 'FREY ROJAS AGUILAR';

        break;

      case 41:
        this.color = '#235aba';
        this.nameParticipante = 'BRAYAN CRISTIAN AQUINO ORBEZO';
        break;

      case 44:
        this.color = '#235aba';
        this.nameParticipante = 'ALEX MAURO MARTINEZ VALENCIA';
        break;

      case 43:
        this.color = '#235aba';
        this.nameParticipante = 'ISAIAS VASQUEZ MALPARTIDA';
        break;

      case 44:
        this.color = '#235aba';
        this.nameParticipante = 'CRISTIAN BALDEON YAURI';
        break;
        
      case 45:
        this.color = '#235aba';
        this.nameParticipante = 'EFRAIN ALLCA MARTINEZ';
        break;

      case 26:
        this.color = '#235aba';
      this.nameParticipante = 'CRISTHIAN RENZO ÑAUPARI ALCÁNTARA';
      break;
        
      case 25:
        this.color = '#235aba';
        this.nameParticipante = 'DEYVID KEVIN MENDEZ MEZA';
      break;

      case 27:
        this.color = '#235aba';
        this.nameParticipante = 'EDWUARDO JESUS GARCIA RAMIREZ';
      break;

      case 28:
        this.color = '#235aba';
        this.nameParticipante = 'JASMIN LIDA YAURI LAUREANO';
      break;

      case 29:
        this.color = '#235aba';
        this.nameParticipante = 'WILLIAM MENIZ VENTOCILLA';
      break;

      case 30:
        this.color = '#235aba';
        this.nameParticipante = 'JHOEL BENJAMIN MANDUJANO SALVADOR';
      break;

      case 31:
        this.color = '#235aba';
        this.nameParticipante = 'ALEX MANDUJANO SALVADOR';
      break;

      default:
        break;
    }
  }



}
