import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Almacen, Producto, registroAlmacenes, registroProductos } from './Class';
import { agregarProductoAAlmacen, bienvenida } from './functions';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//#region Bienvenida
// Mensaje de Bienvenida
bienvenida()
//#endregion


//#region Añadir y Mostrar Almacenes-Productos

//Añadir Almacenes
let Almacen01: Almacen = new Almacen("Almacen01");
let Almacen02: Almacen = new Almacen("Almacen02");
let Almacen03: Almacen = new Almacen("Almacen03");
let Almacen04: Almacen = new Almacen("Almacen04");

//Añadir al registro de Almacenes
registroAlmacenes.agregarAlmacen(Almacen01);
registroAlmacenes.agregarAlmacen(Almacen02);
registroAlmacenes.agregarAlmacen(Almacen03);
registroAlmacenes.agregarAlmacen(Almacen04);


//Mostrar Almacenes registrados
registroAlmacenes.mostrarListaAlmacenes();



//Añadir productos
let Producto01: Producto = new Producto("Papas","kilogramos",20);
let Producto02: Producto = new Producto("Cebollas", "kilogramos", 40);
let Producto03: Producto = new Producto("Camotes", "kilogramos", 15);
let Producto04: Producto = new Producto("Chifles", "Bolsas 100gr", 50);
let Producto05: Producto = new Producto("Coca-Cola", "Botellas 1l", 20);
let Producto06: Producto = new Producto("Inca-Kola", "Botellas 1l", 20);

//Añadir al registro de Productos
registroProductos.agregarProducto(Producto01);
registroProductos.agregarProducto(Producto02);
registroProductos.agregarProducto(Producto03);
registroProductos.agregarProducto(Producto04);
registroProductos.agregarProducto(Producto05);
registroProductos.agregarProducto(Producto06);

//Mostrar Productos registrados
registroProductos.mostrarListaProductos();


//#endregion


//#region PruebasParaExposicion
//Añadimos recursos
// agregarProductoAAlmacen(Producto01,Almacen01,17);
// agregarProductoAAlmacen(Producto02,Almacen01,0);
// agregarProductoAAlmacen(Producto03,Almacen02,12);
// agregarProductoAAlmacen(Producto04,Almacen02,-25);

// Producto01.mostrarInfoProductoTotal();
// Producto03.mostrarInfoProductoTotal();
// Producto04.mostrarInfoProductoTotal();

// Almacen01.moverProductoDeAlmacen(Almacen02,Producto01,15);
// Almacen02.moverProductoDeAlmacen(Almacen01,Producto03,10);
// Almacen02.moverProductoDeAlmacen(Almacen01,Producto04,12);

// Producto01.mostrarInfoProductoTotal();
// Producto03.mostrarInfoProductoTotal();
// Producto04.mostrarInfoProductoTotal();

// Almacen01.eliminarProductoDeAlmacen(Producto01);
// agregarProductoAAlmacen(Producto01,Almacen01,3);

// Producto01.mostrarInfoProductoTotal();

// Almacen01.regresarExistencias(Producto01);

// Producto01.mostrarInfoProductoTotal();
//#endregion


//#region OTRAS PRUEBAS Añadir y Modificar Producto-Saldo en Almacen-Saldo Disponible


// Producto01.mostrarInfoProductoTotal();
// Almacen01.mostrarInfoAlmacen();

// agregarProductoAAlmacen(Producto01,Almacen01,15);
// agregarProductoAAlmacen(Producto02,Almacen01,3);
// agregarProductoAAlmacen(Producto02,Almacen02,21);


// Producto02.mostrarInfoProductoTotal();

// Almacen01.regresarExistencias(Producto01);

// agregarProductoAAlmacen(Producto01,Almacen02,21);
// Producto01.mostrarInfoProductoTotal();
// Producto01.agregarSaldoProducto(29);

// console.log("ELIMINO PRODUCTO 1");
// Almacen01.eliminarProductoDeAlmacen(Producto01);
// console.log("AGREGO PRODUCTO 1");
// agregarProductoAAlmacen(Producto01,Almacen01,2);
// console.log("ELIMINO PRODUCTO 1");
// Almacen01.eliminarProductoDeAlmacen(Producto01);
// console.log("AGREGO PRODUCTO 1");
// agregarProductoAAlmacen(Producto01,Almacen01,3);
// console.log("ELIMINO PRODUCTO 2");
// Almacen02.eliminarProductoDeAlmacen(Producto02);

// Producto01.mostrarInfoProductoTotal();
// Producto02.mostrarInfoProductoTotal();

//SEGUNDA PARTE DE PRUEBAS

// agregarProductoAAlmacen(Producto01,Almacen01,20);
// agregarProductoAAlmacen(Producto01,Almacen01,15);
// agregarProductoAAlmacen(Producto02,Almacen01,15);
// agregarProductoAAlmacen(Producto03,Almacen01,15);

// console.log("--------------------------------------------")
// console.log("MOVEMOS PRODUCTO DE ALMACEN01 - ALMACEN02 - ALMACEN01")
// Almacen01.moverProductoDeAlmacen(Almacen02,Producto01,30);
// Almacen01.moverProductoDeAlmacen(Almacen02,Producto01,20);
// Almacen02.moverProductoDeAlmacen(Almacen01,Producto01,20);
// Almacen01.moverProductoDeAlmacen(Almacen03,Producto01,10);

// console.log("--------------------------------------------")
// console.log("ELIMINO PRODUCTOS")
// Almacen01.regresarExistencias(Producto01);
// Almacen01.eliminarProductoDeAlmacen(Producto01);
// Almacen01.eliminarProductoDeAlmacen(Producto02);
// Almacen01.regresarExistencias(Producto01);


// Producto01.mostrarInfoProductoTotal();

//PRUEBAS FINALES

// agregarProductoAAlmacen(Producto03,Almacen01,15);


// Almacen01.moverProductoDeAlmacen(Almacen03,Producto03,12);
// Almacen01.moverProductoDeAlmacen(Almacen04,Producto03,2);
// Almacen01.regresarExistencias(Producto03);
// Almacen03.eliminarProductoDeAlmacen(Producto03);

// Producto03.mostrarInfoProductoTotal();


//#endregion

console.log("--------------------------------------------");