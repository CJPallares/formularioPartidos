import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  equipos = [
    {"equipo":"Alaves", "jugadores": ["Fernando Pacheco","Antonio Sivera","Aritz Castro","Tachi"," Rubén Duarte","Rodrigo Ely","Víctor Laguardia"]},
    {"equipo":"Atletico Madrid", "jugadores": ["Ivo Grbic","Jan Oblak","Miguel San Román","José Giménez"," Manuel Sánchez","Renan Lodi","Stefan Savic"]},
    {"equipo":"Cadiz", "jugadores":["Jeremías Ledesma","David Gil","Juan Flere","Sergio González"," Fali","Marcos Mauro","Carlos Akapo"]} 
  ];

  jugadoresLocal = [];
  jugadoresVisitante = [];
  equipoLocal:any;
  equipoVisitante:any;

  formulario: FormGroup;
  grupoEquipos: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private navCtrl: NavController) {
  }

  ngOnInit() {
    this.grupoEquipos = new FormGroup({
      equipoLocal: new FormControl('', Validators.compose([
        Validators.required
      ])),
      equipoVisitante: new FormControl('', Validators.compose([
        Validators.required
      ]))
    }, (formGroup: FormGroup) => {
      return this.validarGrupoEquipos(formGroup);
    });
  
    this.formulario = this.formBuilder.group({
      fechaPartido: new FormControl('', Validators.compose([
        Validators.required
      ])),
      grupoEquipos : this.grupoEquipos,
      golesLocal: new FormControl('', Validators.compose([
        Validators.required
      ])),
      golesVisitante: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  onSubmit(values){
  }

  onChangeEquipoLocal($event){
    this.equipoLocal=$event.target.value.equipo;
    this.jugadoresLocal=Array.from($event.target.value.jugadores); //ojo, es clonarlo pero no cogerlo como referencia porque entonces al hacer cambios borraríamos el original (la lista de jugadores por ej)
    this.formulario.controls['golesLocal'].setValue('');
    this.formulario.controls['golesVisitante'].setValue('');
  }

  deleteJugadorLocal(indice){
    this.jugadoresLocal.splice(indice,1);
  }

  onChangeEquipoVisitante($event){
    this.equipoVisitante=$event.target.value.equipo;
    this.jugadoresVisitante=Array.from($event.target.value.jugadores);
    this.formulario.controls['golesLocal'].setValue('');
    this.formulario.controls['golesVisitante'].setValue('');
  }

  deleteJugadorVisitante(indice){
    this.jugadoresVisitante.splice(indice,1);
  }

  validarGrupoEquipos(fg: FormGroup){
    var equipoLocal:string=fg.controls['equipoLocal'].value;
    var equipoVisitante:string=fg.controls['equipoVisitante'].value;

    if(equipoLocal!='' && equipoLocal!='' && equipoLocal===equipoVisitante) //si no hay valor en la fecha de nacimiento no se valida
        return {validarGrupoEquipos:true};
    else
        return null;
  }//end_validarGrupoEquipos

}//end_class
