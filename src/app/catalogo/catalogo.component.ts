import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { SubirProductosService } from '../subir-productos.service';
import { LocalStorageService } from '../local-storage.service';
import { SubirUsuarioService } from '../subir-usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{ //implements OnInit 
  miModelo={nombre: '', descripcion:'', precio:0, urlImagen:'', tipo:''}
  productoActualizado = {nombre: '', descripcion:'', precio:0, urlImagen:'', tipo:''};
  permisoAdmin = false;
  cosas:any;
  cosasU:any;
  prueba:any;
  isLoading:boolean = true;
  modalOpen = false;
  isClickedA = false;
  isClickedB = false;
  isClickedC = false;
  isClickedD = true;
  constructor(private http: HttpClient, private location:Location,private subirproductoService : SubirProductosService, private localStoragesService: LocalStorageService, private subirUsuarioService : SubirUsuarioService) {}

  // ngOnInit(): void {
  //   this.http.get('https://localhost:7104/api/productos/listado').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
    
  //   //Ver como se supone que tengo que quitar las comillas -> Se quitan quitando el |JSON
  // }
  openModal(){
    if(this.modalOpen == false){
      this.modalOpen = true;
    }else{
      this.modalOpen = false
    }
      
  }
  // mostrarSuplementacion(){
  //   this.http.get('https://localhost:7104/api/productos/listadoSuplementacion').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  // mostrarModa(){
  //   this.http.get('https://localhost:7104/api/productos/listadoModa').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  // mostrarEquipamiento(){
  //   this.http.get('https://localhost:7104/api/productos/listadoEquipamiento').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  // mostrarTodo(){
  //   this.http.get('https://localhost:7104/api/productos/listado').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  mostrarRedux(dat){
    this.subirproductoService.recogerProductos(dat).subscribe((response)=>{
      this.isLoading = false;
      console.log(response);
      this.cosas = response;
    }, (error) => {
      console.error(error);
    })
  }
  ngOnInit(){
    this.mostrarRedux('');
    console.log(this.permisoAdmin)
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
  }
  toggleClickedA(){
    this.isClickedA = !this.isClickedA;
    this.isClickedB = false;
    this.isClickedC = false;
    this.isClickedD = false;
  }
  toggleClickedB(){
    this.isClickedB = !this.isClickedB;
    this.isClickedA = false;
    this.isClickedC = false;
    this.isClickedD = false;
  }
  toggleClickedC(){
    this.isClickedC = !this.isClickedC;
    this.isClickedA = false;
    this.isClickedB = false;
    this.isClickedD = false;
  }
  toggleClickedD(){
    this.isClickedD = !this.isClickedD;
    this.isClickedA = false;
    this.isClickedB = false;
    this.isClickedC = false;
  }
  borrarProducto(Id : Number){ //Podria intentar ocultarlos en vez de eliminarlos directamente
    console.log(this.cosas)
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podrás recuperar este producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`https://localhost:7104/api/productos/${Id}`).subscribe(()=>{
        const indice = this.cosas.findIndex(p => p.id === Id);
        this.cosas.splice(indice, 1); //Esto es para que se vea en local el cambio porque recargar la pagina es cutre
    })
        
      }
    })
    
  }
  public editarProducto(id: number, productoActualizado: any) {
    const url = `https://localhost:7104/api/productos/editar/${id}`;
  
    this.http.put(url, productoActualizado).subscribe(
      () => {
        
        console.log('Producto actualizado correctamente');
        window.location.reload();
      },
      error => {
        console.error('Error al actualizar el producto', error);
        // Maneja el error adecuadamente
      }
    );
  }
  public onEditarClick(cosa: any) {
    // const miFormulario = new FormGroup({
    //   nombre: new FormControl('', Validators.pattern(/^[\p{L}\s]*$/u)),
    //   precio: new FormControl('', Validators.pattern(/^\d{2}$/)),
      
    //   imagen: new FormControl('', Validators.pattern(/^.*\.(jpg|jpeg|png|gif|bmp)$/))
    // });
    //Meter aqui un sweet alert con el formulario para editarlo
    //buscar dialog
    Swal.fire({
      title: 'Editar Producto',
      html:
      '<form id="miFormulario" name="miFormulario">'+
        '<input id="input1" class="swal2-input" formControlName="nombre" name="nombre" class="form-control" placeholder="Nombre" value="' + cosa.nombre + '">' +
        '<input id="input2" class="swal2-input" name="descripcion" placeholder="Descripción" value="' + cosa.descripcion + '">' +
        '<input id="input3" class="swal2-input" name="precio" placeholder="precio" formControlName="precio" class="form-control" value="' + cosa.precio + '">' +
        '<select id="select1" class="swal2-select">' +
        '  <option value="Suplementos">Suplementos</option>' +
        '  <option value="Moda">Moda</option>' +
        '  <option value="Equipamiento">Equipamiento</option>' +
        '</select>'+
        '</form>',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Seleccionar imagen'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      preConfirm: (file) => {
        // const nombreControl = miFormulario.controls['nombre'];
        // const precioControl = miFormulario.controls['precio'];

        // debugger;
        // console.log(nombreControl.valid) 
        // console.log(precioControl.valid);
        
        // if(nombreControl.invalid){
          
        //   if (nombreControl.hasError('pattern') && nombreControl.touched) {
        //     Swal.showValidationMessage('El nombre solo debe contener letras y espacios');
        //   }
        // }else{
        if(file){
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const base64 = event.target.result;
              resolve(base64);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(file);
          });
        }else{
          console.log(cosa);
          return cosa.urlImagen;
        }
          
      }
    }).then((result) => {
      
      const form = document.getElementById('miFormulario') as HTMLFormElement;
      const miFormulario = new FormGroup({
        nombre: new FormControl(form['nombre'].value, Validators.pattern(/^[\p{L}\s]*$/u)),
        precio: new FormControl(form['precio'].value, Validators.pattern(/^\d{2}$/)),
        // imagen: new FormControl('', Validators.pattern(/^.*\.(jpg|jpeg|png|gif|bmp)$/))
      });
      const nombreControl = miFormulario.controls['nombre'];
      const precioControl = miFormulario.controls['precio'];
      console.log(nombreControl.invalid);
      console.log(precioControl.invalid)
      if(nombreControl.invalid || precioControl.invalid){
          Swal.fire({
            title:"Algun campo está mal rellenado",
            icon:"warning",
           
        showConfirmButton: true,
          })
          }else{
      // console.log(precioControl.valid);
      if (result.value) {
        const input1Value = (document.getElementById('input1') as HTMLInputElement).value;
        const input2Value = (document.getElementById('input2') as HTMLInputElement).value;
        const input3Value = (document.getElementById('input3') as HTMLInputElement).value;
        const select1Value = (document.getElementById('select1') as HTMLSelectElement).value;
        const base64Image = result.value;
        const productoActualizado: any = {
          Id: 1,
          Nombre: input1Value,
          Precio: input3Value,
          Descripcion: input2Value,
          Tipo: select1Value,
          urlImagen: base64Image
        };
    
        this.editarProducto(cosa.id, productoActualizado);
      }else{
        if(result.value){
        const input1Value = (document.getElementById('input1') as HTMLInputElement).value;
        const input2Value = (document.getElementById('input2') as HTMLInputElement).value;
        const input3Value = (document.getElementById('input3') as HTMLInputElement).value;
        const select1Value = (document.getElementById('select1') as HTMLSelectElement).value;
        // const base64Image = result.value;
        var imagenAnterior = this.miModelo.urlImagen;
        const productoActualizado: any = {
          Id: 1,
          Nombre: input1Value,
          Precio: input3Value,
          Descripcion: input2Value,
          Tipo: select1Value,
          urlImagen: imagenAnterior
        };
    
        this.editarProducto(cosa.id, productoActualizado);
      }
    }
  }
    });
  
    
  }


  convertirImagen(event) {
    debugger; //Por que este debugger no funciona??
    console.log(event);
    const archivo = event.target.files[0];
    
    if (archivo) {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => {
        const base64String = lector.result as string;
        console.log(base64String);
        // const base64Value = base64String.split(',')[1]; // Extract the base64 value from the data URL
        
        this.productoActualizado.urlImagen = base64String;
        
      };
    }
  }
  
  
}
