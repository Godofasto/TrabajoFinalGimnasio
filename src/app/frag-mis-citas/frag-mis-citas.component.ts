import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { SubirActividadesService } from '../subir-actividades.service';
import { SubirUsuarioService } from '../subir-usuario.service';

@Component({
  selector: 'app-frag-mis-citas',
  templateUrl: './frag-mis-citas.component.html',
  styleUrls: ['./frag-mis-citas.component.css']
})
export class FragMisCitasComponent {
  today: Date;
  cosasU:any;
  actividades:any;
  currentMonth: number;
  currentYear: number;
  selectYear: number;
  selectMonth: number;
  months: string[];
  years: number[];
  monthAndYear: string;
  calendar: number[][];
  citas:string[] = [];
  cita:string;
  modalOpen = false;
  permisoAdmin = false;

  constructor(private http: HttpClient,private SubirActividadesService : SubirActividadesService, private localStoragesService: LocalStorageService, private subirUsuarioService : SubirUsuarioService) {}


  ngOnInit() {
    if(this.localStoragesService.isLoggedIn()){
      this.subirUsuarioService.retornarUsuarios({}).subscribe((response)=>{
        console.log(response);
        this.cosasU = response;
        console.log(this.cosasU);
        for(let i = 0; i < this.cosasU.length; i++){
          console.log(this.cosasU[i]);
          if(this.cosasU[i].nombre == this.localStoragesService.username){
            if(this.cosasU[i].perfilId == 1){
              this.permisoAdmin = true;
            }else if(this.cosasU[i].perfilId == 4){
              this.permisoAdmin = false;
            }
          }
       }
      })
      // this.permisoAdmin = true;
    }
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.selectYear = this.currentYear;
    this.selectMonth = this.currentMonth;
    this.months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    this.years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    this.monthAndYear = '';
    this.calendar = [];
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  next() {
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  previous() {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  jump() {
    this.currentYear = this.selectYear;
    this.currentMonth = this.selectMonth;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  showCalendar(month: number, year: number) {
    const firstDay = (new Date(year, month)).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    this.monthAndYear = this.months[month] + ' ' + year;
    this.selectYear = year;
    this.selectMonth = month;

    let date = 1;
    this.calendar = [];

    for (let i = 0; i < 6; i++) {
      const week: number[] = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (date > daysInMonth) {
          break;
        } else {
          week.push(date);
          date++;
        }
      }

      this.calendar.push(week);
    }
  }

  isToday(day: number): boolean {
    return (
      day === this.today.getDate() &&
      this.currentYear === this.today.getFullYear() &&
      this.currentMonth === this.today.getMonth()
    );
  }
  pillarCita(dia){
    // console.log(dia);
    // console.log(this.selectMonth);  //El mes 0 es enero, va del 0 al 11
    // console.log(this.selectYear);
    // this.cita = 'BodyCombat';
    // this.citas.push(this.cita);
    // console.log(this.citas)
    this.SubirActividadesService.recogerActividades({}).subscribe((response)=>{
      this.actividades = response;
      console.log(this.actividades);
    })
    Swal.fire({
      title: 'Elige una opción',
      input: 'select',
      inputOptions: {
        'opcion1': 'Opción 1',
        'opcion2': 'Opción 2',
        'opcion3': 'Opción 3'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      inputPlaceholder: 'Selecciona una opción',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes seleccionar una opción';
        }
        return '';
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedOption = result.value;
        Swal.fire({
          title: 'Has elegido',
          text: `Has seleccionado la opción: ${selectedOption}`
        });
      }
    });
  }
  openModal(){
    if(this.modalOpen == false){
      this.modalOpen = true;
    }else{
      this.modalOpen = false
    }
      
  }
}
