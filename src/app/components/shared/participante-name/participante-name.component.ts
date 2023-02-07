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
      case 1:
        this.color = '#235aba';
        this.nameParticipante = 'ELVIS LLACZA GUADALUPE';
      break;
      case 2:
        this.color = '#235aba';
        this.nameParticipante = 'EMMY PAREDES ROJAS';
      break;
      case 7:
        this.color = '#235aba';
        this.nameParticipante = 'FERNANDO JOSE JIMENEZ ROMERO';
        break;
      case 9:
        this.color = '#235aba';
        this.nameParticipante = 'AYRTON KEVIN CAMARENA ALVARO';

        break;
      case 4:
        this.color = '#235aba';
        this.nameParticipante = 'JESUS PUCUHUARANGA BALDEON';

        break;
      case 5:
        this.color = '#235aba';
        this.nameParticipante = 'JHONATAN RICALDI PAREDES';
        break;

      case 12:
        this.color = '#235aba';
        this.nameParticipante = 'ALEXANDER MARCOS OROPEZA';
        break;
      case 7:
        this.color = '#235aba';
        this.nameParticipante = 'CRISTIAN VALENCIA MARCOS';

        break;
      case 8:
        this.color = '#235aba';
        this.nameParticipante = 'VICTOR ZURITA PARIAN';

        break;
      case 9:
        this.color = '#235aba';
        this.nameParticipante = 'SERGIO HILARIO BARRIOS';
        break;

      case 16:
        this.color = '#235aba';
        this.nameParticipante = 'MANUEL AVALOS MALLQUI';
        break;
      case 17:
        this.color = '#235aba';
        this.nameParticipante = 'JESUS GONZALES MILIANO';

        break;
      case 10:
        this.color = '#235aba';
        this.nameParticipante = 'FREY ROJAS AGUILAR';

        break;
      case 19:
        this.color = '#235aba';
        this.nameParticipante = 'KENNEDY FRANKLIN VILLUGAS';
        break;

      case 14:
        this.color = '#235aba';
        this.nameParticipante = 'BRAYAN CRISTIAN AQUINO ORBEZO';
        break;
      case 15:
        this.color = '#235aba';
        this.nameParticipante = 'ALEX MAURO MARTINEZ VALENCIA';
        break;

      case 11:
        this.color = '#235aba';
        this.nameParticipante = 'ISAIAS VASQUEZ MALPARTIDA';
        break;

      case 23:
        this.color = '#235aba';
        this.nameParticipante = 'JHEN UBER LOPEZ RAMOS';
        break;

      case 12:
        this.color = '#235aba';
        this.nameParticipante = 'CRISTIAN BALDEON YAURI';
        break;
        
      case 13:
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
