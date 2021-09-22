//--------------SECCION DE FUNCIONES---------------//

import { Almacen, Producto } from "./Class";
//#region funciones
export function agregarProductoAAlmacen(producto: Producto, almacen: Almacen, cantidad:number){
    console.log("--------------------------------------------");
    if (producto.cantidadDeProductoDisponible()>=cantidad && cantidad>0){
        if (producto.productoRegistradoEnAlmacen(almacen)){
            console.log("");
            console.log("Producto ya registrado en Almacen")
            console.log("Se aumentaran las existencias    ")
            producto.setCantidadParcial(cantidad, almacen)
            almacen.mostrarInfoAlmacen();
        }else{
            console.log();
            console.log(producto.getNombre(),"Añadido con exito a ", almacen.getNombreAlmacen());
            almacen.setProductos(producto); 
            producto.setCantidadParcial(cantidad, almacen);
            almacen.mostrarInfoAlmacen();
        }
    }else{
        console.log();
        console.log("Cantidad de producto invalida") 
    }
}


export function bienvenida(){
    console.log("--------------------------------------------");
    console.log("Bienvenido al gestor de Almacenes 2.0");}

//#endregion
