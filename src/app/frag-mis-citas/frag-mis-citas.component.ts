import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { SubirActividadesService } from '../subir-actividades.service';
import { SubirCitasService } from '../subir-citas.service';
import { SubirUsuarioService } from '../subir-usuario.service';
import { SubirEntrenadorService } from '../subir-entrenador.service';

@Component({
  selector: 'app-frag-mis-citas',
  templateUrl: './frag-mis-citas.component.html',
  styleUrls: ['./frag-mis-citas.component.css']
})
export class FragMisCitasComponent {
  today: Date;
  mesArreglado:any;
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
  citas:any;
  cita:string;
  idActiElegido:string;
  idUsuarioActivo:any;
  modalOpen = false;
  permisoAdmin = false;
  opciones = [];
  fechaElegidaFormateada:Date;
  fechaActualFormateada:Date;
  fechaElegida:string = ''
  miModelo = {Nombre : '', Fecha : '', UsuariosId : '', ActividadesId : ''}
  constructor(private SubirEntrenadoresService : SubirEntrenadorService,private http: HttpClient,private SubirActividadesService : SubirActividadesService, private localStoragesService: LocalStorageService, private subirUsuarioService : SubirUsuarioService, private subirCitasService : SubirCitasService) {}


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
              this.idUsuarioActivo = this.cosasU[i].id;
              this.subirCitasService.recogerCitas(this.idUsuarioActivo).subscribe((response)=>{
                this.citas=response
              })
            }else if(this.cosasU[i].perfilId == 4){
              this.permisoAdmin = false;
              this.idUsuarioActivo = this.cosasU[i].id;
              this.subirCitasService.recogerCitas(this.idUsuarioActivo).subscribe((response)=>{
                this.citas=response
              })
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

    
    this.SubirActividadesService.recogerActividadesConEntrenadores({}).subscribe((response)=>{ //Puedo intentar craftear la salida aqui 
      this.actividades = response;
      console.log(this.actividades);
    })
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
    if(dia<10){
      dia = '0'+dia;
    }
    // this.mesArreglado = parseInt(this.selectMonth)
    
    this.fechaElegida = this.selectYear + '-' + (this.selectMonth+1) + '-' + dia;
    console.log(this.fechaElegida); //La fecha en la que hago click
    var fechaActual = new Date();

    var diaa = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses empiezan en 0, por lo que se suma 1
    var anio = fechaActual.getFullYear();

    var fechaFormateada = anio + '-' + mes + '-' + diaa; //La fecha del dia en el que estamos

    

    const fechaFormateadaa: Date = new Date(fechaFormateada); // Asegúrate de que fechaFormateada sea un objeto Date válido
    const fechaElegida: Date = new Date(this.fechaElegida); // Asegúrate de que this.fechaElegida sea un objeto Date válido
    console.log(fechaFormateadaa);
    console.log(fechaElegida);
    if (fechaFormateadaa > fechaElegida) {
      Swal.fire({
        icon: 'error',
        title: '¡No puedes elegir una fecha que ya ha pasado!'
      });
      return;
    }
    
    console.log(fechaFormateadaa);
    this.opciones = [];
    this.SubirActividadesService.recogerActividades({}).subscribe((response)=>{

      this.actividades = response;
      console.log(this.actividades);
      
      for(let x = 0; x < this.actividades.length ; x++){
        this.opciones.push({value : this.actividades[x].nombre, label : this.actividades[x].nombre});
      }
      console.log(this.opciones);
      Swal.fire({
        title: 'Elige una opción',
        input: 'select',
        inputOptions: this.getInputOptions(this.opciones),
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
            title: `Has seleccionado la opción: ${selectedOption}`
          }).then((result)=>{
            if(result.isConfirmed){
              this.miModelo.Nombre = selectedOption;
              this.miModelo.Fecha = this.fechaElegida;
              //Iteramos sobre actividades, buscamos el que tenga el nomrbe que hemos elegido y de ahi sacamos el Id
              for(let x = 0; x < this.actividades.length ; x++){
                if(this.actividades[x].nombre == selectedOption){
                  this.idActiElegido = this.actividades[x].id;
                  console.log(this.idActiElegido);
                }
              }
              this.miModelo.ActividadesId = this.idActiElegido;
              this.miModelo.UsuariosId = this.idUsuarioActivo;
              console.log(this.miModelo)
              this.subirCitasService.subirCitas(this.miModelo).subscribe((response)=>{
                Swal.fire({
                  icon: 'success',
                  title :'Su cita se ha guardado correctamente'
                }).then((result)=>{
                  this.subirCitasService.recogerCitas(this.idUsuarioActivo).subscribe((response)=>{
                    console.log(response);
                    this.citas=response;

                  })
                  this.SubirActividadesService.recogerActividadesConEntrenadores({}).subscribe((response)=>{ //Puedo intentar craftear la salida aqui 
                    this.actividades = response;
                    console.log(this.actividades);
                  })
                  // this.SubirEntrenadoresService.recogerEntrenadores
                })
              }, 
              (error)=>{
                Swal.fire({
                  icon: 'error',
                  title :'No se ha podido guardar la cita, vuelve a intentarlo'
                })
              })
            }else if(result.isDenied){
              Swal.fire({
                icon: 'error',
                title :'No se ha podido guardar la cita, vuelve a intentarlo'
              })
            }
          });
        }
      });
    })
  }
  openModal(){
    if(this.modalOpen == false){
      this.modalOpen = true;
    }else{
      this.modalOpen = false
    }
      
  }
  getInputOptions(opciones: any){
    const inputOptions = {};
    opciones.forEach(option=>{
      console.log(option);
      inputOptions[option.value] = option.label;});
      console.log(inputOptions);
      return inputOptions;
    };
    borrarProducto(Id : Number){ //Podria intentar ocultarlos en vez de eliminarlos directamente
      console.log(this.citas)
      Swal.fire({
        title: '¿Estas seguro?',
        text: "No podrás recuperar esta cita",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete(`https://localhost:7104/api/citas/${Id}`).subscribe(()=>{
          const indice = this.citas.findIndex(p => p.id === Id);
          this.citas.splice(indice, 1); //Esto es para que se vea en local el cambio porque recargar la pagina es cutre
      })
          
        }
      })
      
    }
}
