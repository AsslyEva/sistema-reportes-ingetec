import { Injectable } from '@angular/core';
import { ActividadEspecifica } from 'src/app/model/interfaces/global/actividad_especiifica';
import { Segmento } from 'src/app/model/interfaces/global/segmento';


@Injectable()
export class GeneralServide {
  getStates() {
    throw new Error('Method not implemented.');
  }

  getSegmento() {
    
    return [
     new Segmento(1, 'CONEXIONES NUEVAS BT' ),
     new Segmento(2, 'REINSTALACION DE SERVICIO RS' ),
     new Segmento(3, 'ACTIVIDADES COMERCIALES COMPLEMENTARIAS AC' ),
     new Segmento(4, 'MULTISERVICIOS ELECTRICOS (ME)' ),

    ];
  }
  
  getActividadEspecifica() {
   return [
     new ActividadEspecifica(1, 1, 'Aéreo Monofásico' ),
     new ActividadEspecifica(2, 1, 'Subterráneo Trifásico sin rotura ni resane de vereda' ),
     new ActividadEspecifica(3, 1, 'Instalación de int. termomagnético en caja portamedidor' ),
     new ActividadEspecifica(4, 1, 'Captación de Clientes-Nuevo Suministro' ),
     new ActividadEspecifica(5, 2, 'Aérea Monofásico'),
     new ActividadEspecifica(6, 2, 'Aéreo Monofásico sin caja ni acometida'),
     new ActividadEspecifica(7, 2, 'Instalación de medidor trifásico, caja e ITM'),
     new ActividadEspecifica(8, 2, 'Subterráneo Trifásico'),
     new ActividadEspecifica(9, 3, 'Instalación del conductor de acometida Monofásica/Trifasica Aérea' ),
     new ActividadEspecifica(10, 3, 'Instalación caja portamedidor monofásico' ),
     new ActividadEspecifica(11, 3, 'Picado de canaleta en pared'),
     new ActividadEspecifica(12, 4, 'Puesta a Tierra Tipo III, con ruptura de Piso' ),
     new ActividadEspecifica(13, 4, 'Construcción de Banco de Medidores a todo costo' )
    ];
  }

}