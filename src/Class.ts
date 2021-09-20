
//--------------SECCION DE VARIABLES AUXILIARES---------------//

//#region Variables de uso general
let varIdProducto: number = 0;
let varIdAlmacen: number = 0;
let almacenActual: Almacen ; 
//#endregion 



//--------------SECCION DE CLASES------------------//

//#region Clase Registro Almacenes
export class RegistroAlmacenes{
    private almacenes: Almacen[];

    constructor(){
        this.almacenes = [];
    }

    agregarAlmacen(almacen: Almacen){
        this.almacenes.push(almacen);
    }

    getListaAlmacenes(){
        return this.almacenes;
    }

    mostrarListaAlmacenes(){
        console.log("--------------------------------------------");
        console.log("ALMACENES REGISTRADOS")
        console.log("--------------------------------------------");
        for (let value of this.almacenes){
            console.log(value.getNombreAlmacen());
        }
    }
}

export let registroAlmacenes: RegistroAlmacenes = new RegistroAlmacenes();

//#endregion 


//#region Clase Registro Productos
export class RegistroProductos{
    private productos: Producto[];

    constructor(){
        this.productos = [];
    }

    agregarProducto(prod: Producto){
        this.productos.push(prod);
    }

    getListaProductos(){
        return this.productos;
    }

    mostrarListaProductos(){
        console.log("--------------------------------------------");
        console.log("PRODUCTOS REGISTRADOS")
        console.log("--------------------------------------------");
        for (let value of this.productos){
            console.log(value.getNombre());
        }
    }
}

export let registroProductos: RegistroProductos = new RegistroProductos();

//#endregion


//#region Clase Almacen
export class Almacen{
    private idAlmacen: number
    private nombre: string;
    private cantidadProductos: number;
    private productos: Producto[];

    constructor(nombre:string){
        varIdAlmacen++;
        this.idAlmacen = varIdAlmacen;
        this.nombre = nombre;
        this.cantidadProductos = 0;
        this.productos = [];
    }
    //Metodos "GET Y SET"
    getNombreAlmacen(){
        return this.nombre;
    }
    getIdAlmacen(){
        return this.idAlmacen;
    }
    getProductos(){
        return this.productos;
    }
    setProductos(producto: Producto){
        this.productos.push(producto);
        this.cantidadProductos++;
    }
    setCantidad(){
        this.cantidadProductos ++;
    }


    //Metodos Muestra Info
    public mostrarInfoAlmacen(){
        console.log("--------------------------------------------");
        console.log("INFORMACION ALMACEN ", this.getNombreAlmacen().toUpperCase());
        console.log("--------------------------------------------");
        console.log("Id De Almacen:                     ", this.idAlmacen);
        console.log("Nombre:                            ", this.nombre);
        console.log("Cantidad de Productos en Almacen:  ", this.cantidadProductos);
        this.mostrarProductos();   
    } 

    public mostrarProductos(){
        console.log("--------------------------------------------");
        if(this.productos.length == 0){console.log("Productos en Almacen:               Ninguno")}
        else {
            console.log("Productos Almacen:   ");
            for (let almacenes of registroAlmacenes.getListaAlmacenes() ){
                if(this.getIdAlmacen()==almacenes.getIdAlmacen()){
                    for(let value of this.productos){
                        value.mostrarInfoProductoPorAlmacen(almacenes);
                    }
                    break;
                }
            }
        }
        
    }


    //Metodo Agregar-Eliminar-Mover-Reducir Producto

    public reducirSaldoProductoDeAlmacen(producto:Producto, cantidad:number){
        for (let almacenes of registroAlmacenes.getListaAlmacenes()){
            if(this.getIdAlmacen() == almacenes.getIdAlmacen()){
                almacenActual = almacenes;
            }
        }
        console.log("--------------------------------------------");
        if (producto.mostrarCantidadDeProductoEnAlmacen(almacenActual)<cantidad || cantidad<0){console.log("La cantidad a retirar es invalida :c")}
        else {
            if(producto.mostrarCantidadDeProductoEnAlmacen(almacenActual)-cantidad==0){
                producto.setCantidadParcial(0,almacenActual);
            }else{

            }
                
            
        }
    }

    public moverProductoDeAlmacen(almacenDestino:Almacen, producto:Producto, cantidad: number){
        let almacenEmisor: Almacen =  almacenDestino;
        for (let value of registroAlmacenes.getListaAlmacenes()){
            if (value.getIdAlmacen() == this.getIdAlmacen()){
                almacenEmisor=value;
                break;
            }else{
                continue;
            }
        }
        if(producto.productoRegistradoEnAlmacen(almacenEmisor)){
            if(producto.mostrarCantidadDeProductoEnAlmacen(almacenEmisor)>=cantidad && cantidad>0){
                let value = producto.mostrarCantidadDeProductoEnAlmacen(almacenEmisor);
                value -= cantidad;
                if(value==0){
                    for (let prod of this.productos){
                        if(producto == prod){
                            console.log("--------------------------------------------");
                            console.log(producto.getNombre(),"Eliminado del",almacenEmisor.getNombreAlmacen() ," por 0 existencias")
                            this.cantidadProductos--;
                            let index = this.productos.indexOf(producto);
                            this.productos.splice(index,1);
                            producto.setCantidadParcialMovimiento(0,almacenEmisor);
                            break;
                        }else{
                            continue;
                        }
                    }
                }else{
                    producto.setCantidadParcialMovimiento(value,almacenEmisor);
                }
                if(producto.productoRegistradoEnAlmacen(almacenDestino)){
                    producto.setCantidadParcial(cantidad,almacenDestino);
                }else{
                    almacenDestino.setProductos(producto); 
                    producto.setCantidadParcial(cantidad, almacenDestino);
                    console.log("--------------------------------------------");
                    console.log(producto.getNombre(),"Añadido con exito a ", almacenDestino.getNombreAlmacen());
                    this.mostrarInfoAlmacen();
                    almacenDestino.mostrarInfoAlmacen();
                }
            }else{
                console.log("--------------------------------------------");
                console.log("Cantidad Invalida")
            }
        }else{
            console.log("--------------------------------------------");
            console.log("Producto no registrado en Almacen")
        }
    }

    public eliminarProductoDeAlmacen(producto: Producto){
        let valorE: boolean = true;
        for(let almacenes of registroAlmacenes.getListaAlmacenes()){
            if(almacenes.getIdAlmacen() == this.getIdAlmacen()){
                almacenActual = almacenes;
            }
        }
        for (let prod of this.productos){
            if(producto == prod){
                console.log("--------------------------------------------");
                console.log(producto.getNombre(),"Eliminado del Almacen")
                console.log(producto.getNombre(),"Existencias eliminadas perdidas")
                this.cantidadProductos--;
                let index = this.productos.indexOf(producto);
                this.productos.splice(index,1);
                valorE = false;
                producto.eliminarExistenciasDeProducto(producto,almacenActual)
                this.mostrarInfoAlmacen();
                break;
            }else{
                continue;
            }
        }
        if (valorE == true){
            console.log("--------------------------------------------");
            console.log("Producto No registrado en Almacen");
        }
        
    }

    public regresarExistencias(producto:Producto){      
        let valorE: boolean = true;
        for (let prod of this.productos){
            if(producto == prod){
                console.log("--------------------------------------------");
                console.log(producto.getNombre(),"Eliminado del Almacen")
                console.log(producto.getNombre(),"Existencias regresadas al producto")
                this.cantidadProductos--;
                let index = this.productos.indexOf(producto);
                this.productos.splice(index,1);
                for (let value of registroAlmacenes.getListaAlmacenes()){
                    if (value.getIdAlmacen() == this.getIdAlmacen()){
                        producto.regresarExistenciasDeProducto(value, producto);
                    }
                }
                valorE = false;
                this.mostrarInfoAlmacen();
                break;
            }else{
                continue;
            }
        }
        if (valorE == true){
            console.log("--------------------------------------------");
            console.log("Producto No registrado en Almacen");
        }
        
    }

    public aumentarSaldoProductoAlmacen(producto: Producto,cantidad: number){
        if (producto.cantidadDeProductoDisponible()>cantidad){
            console.log("--------------------------------------------");
            console.log(producto.getNombre(),"aumentaron existencias en ",cantidad, "en ",this.getNombreAlmacen());
            for(let almacenes of registroAlmacenes.getListaAlmacenes()){
                if(this.getIdAlmacen() == almacenes.getIdAlmacen()){
                    producto.setCantidadParcial(cantidad,almacenes);
                    break
                }else{
                    continue
                }
            }
        }
        else{
            console.log("--------------------------------------------");
            console.log(producto.getNombre(),"No es posible aumentar las existencias del producto");
        }
        
    }
}
//#endregion


//#region Clase Producto
export class Producto{
    private idProducto: number
    private nombre: string;
    private unidad: string;
    private cantidadParcial: {[idAlmacen:number] : number};
    private cantidadTotal: number;
    private cantidadEliminada: {[idAlmacen:number] : number};

    constructor(nombre:string, unidad: string, cantidadTotal:number){
        varIdProducto+=1;
        this.idProducto=varIdProducto;
        this.nombre = nombre;
        this.unidad = unidad;
        this.cantidadParcial = {};
        this.cantidadEliminada = {};
        this.cantidadTotal = cantidadTotal;
    }

    
    // Metodos de acceso
    setCantidad(cantidad: number){
        this.cantidadTotal+=cantidad;
    }
    getCantidadTotal(){
        return this.cantidadTotal;
    }
    getCantidadesParciales(){
        return this.cantidadParcial;
    }
    getNombre(){
        return this.nombre;
    }

    // Metodos para mostrar informacion
    public mostrarInfoProductoTotal(){
        console.log("--------------------------------------------");
        console.log("INFORMACION TOTAL PRODUCTO ", this.nombre);
        console.log("--------------------------------------------");
        console.log("Id Producto:       ", this.idProducto);
        console.log("Nombre:            ", this.nombre);
        console.log("Unidad:            ", this.unidad);
        console.log("SaldoTotalInicial: ", this.cantidadTotal);
        console.log("SaldoDisponible    ", this.cantidadDeProductoDisponible());
        this.mostrarNombrePertenece();
    }
    
    public mostrarInfoProductoPorAlmacen(almacen: Almacen){
        if(this.productoRegistradoEnAlmacen(almacen)){
            console.log("--------------------------------------------");
            console.log("Almacen:                ",almacen.getNombreAlmacen());
            console.log("Id Producto:            ", this.idProducto);
            console.log("Nombre:                 ", this.nombre);
            console.log("Unidad:                 ", this.unidad);
            console.log("Existencias en Almacen: ", this.mostrarCantidadDeProductoEnAlmacen(almacen));
        }
        else{
            console.log("--------------------------------------------");
            console.log("PRODUCTO NO REGISTRADO EN ALMACEN: ",almacen.getNombreAlmacen());
            console.log("--------------------------------------------");
        }
        
        
    }


    public mostrarNombrePertenece(){
        let cont: number = 0;
        for (let a in this.cantidadParcial){
            cont++;
        }
        for (let a in this.cantidadEliminada){
            cont++;
        }
        if (cont!= 0){
            console.log(" ");
            console.log("Esta/Estuvo en los siguientes Almacenes:")
            console.log(" ");
            for (let almacenes of registroAlmacenes.getListaAlmacenes()){
                for (let index in this.cantidadParcial){
                    console.log("Nombre: ",almacenes.getNombreAlmacen());
                    if (almacenes.getIdAlmacen()==parseInt(index) ){
                        
                        console.log(" Existencias Disponibles: ",this.cantidadParcial[index]);
                    }
                    else console.log(" Existencias Disponibles: ",0);
 
                }   
                for (let index in this.cantidadEliminada){
                    if (almacenes.getIdAlmacen()==parseInt(index) ){
                        console.log(" Existencias Eliminadas:  ",this.cantidadEliminada[index]);
                    }else console.log(" Existencias Eliminadas:  ",0);
                }
               
                
            }
        }else{console.log("Pertenece Almacen:  Ninguno")}
    }


    public mostrarCantidadDeProductoEnAlmacen(almacen: Almacen): number{
        if(this.productoRegistradoEnAlmacen(almacen)){
            for(let index in this.cantidadParcial){
                if(parseInt(index)== almacen.getIdAlmacen()){
                    return this.cantidadParcial[index]; 
                }
            }
        }else{
            return 0;
        }
        return 0;
    }

    //Metodos de validacion
    public cantidadDeProductoDisponible(): number{
        let value: number = 0;
        let cont: number = 0;
        for (let a in this.cantidadParcial){
            cont++;
        }
        for (let a in this.cantidadEliminada){
            cont++;
        }
        if (cont>0){
            for (let key in this.cantidadParcial){
                value += this.cantidadParcial[key];
            }
            for(let key in this.cantidadEliminada){
                value += this.cantidadEliminada[key];
            }
            return this.cantidadTotal-value;
        }
        else 
            return this.cantidadTotal;
    }

    public productoRegistradoEnAlmacen(almacen: Almacen): boolean{
        for (let key in this.cantidadParcial){
            if(parseInt(key)==almacen.getIdAlmacen()){
                return true
            }
        }
        return false
    }

    public productoRegistradoEnAlmacenesConExistenciasEliminadas(almacen: Almacen): boolean{
        for (let key in this.cantidadEliminada){
            if(parseInt(key)==almacen.getIdAlmacen()){
                return true
            }
        }
        return false
    }

    public regresarExistenciasDeProducto(almacen: Almacen, producto: Producto){
        if (this.productoRegistradoEnAlmacen(almacen)){
            for (let key in this.cantidadParcial){
                if (parseInt(key) == almacen.getIdAlmacen()){
                    delete this.cantidadParcial[key];
                };
            }
        }
    }


    //Metodos de agregacion
    agregarSaldoProducto(cantidad: number){
        this.setCantidad(cantidad);
    }

    setCantidadParcial(cantidad: number, almacen:Almacen){
        if (this.productoRegistradoEnAlmacen(almacen) && cantidad>0){
            for (let key in this.cantidadParcial){
                if(parseInt(key)== almacen.getIdAlmacen()){
                    let valorAnterior = this.cantidadParcial[key];
                    valorAnterior += cantidad;
                    delete this.cantidadParcial[almacen.getIdAlmacen()];
                    this.cantidadParcial[almacen.getIdAlmacen()] = valorAnterior;
                    console.log("GAAAAAAAAAAAAAAAAAAAAAAA");
                    break;

                }else{
                    console.log("GAAAAAAAAAAAAAAAAAAAAAAA");
                }
            }
        }else{
            this.cantidadParcial[almacen.getIdAlmacen()] = cantidad;
        }
        
    }

    eliminarExistenciasDeProducto(producto: Producto, almacen:Almacen): number{
        let nuevoValor: number=0;
        if(this.productoRegistradoEnAlmacenesConExistenciasEliminadas(almacen)){
            for (let value in this.cantidadEliminada){
                if (almacen.getIdAlmacen()== parseInt(value)){
                    nuevoValor = this.cantidadEliminada[almacen.getIdAlmacen()];
                    nuevoValor += producto.cantidadParcial[almacen.getIdAlmacen()];
                    console.log(nuevoValor); 
                    delete this.cantidadEliminada[almacen.getIdAlmacen()];
                    this.cantidadEliminada[almacen.getIdAlmacen()] = nuevoValor;
                    this.cantidadParcial[almacen.getIdAlmacen()] = 0;
                    delete this.cantidadParcial[almacen.getIdAlmacen()]
                    return nuevoValor;
                }
            }

        }else{
            this.cantidadEliminada[almacen.getIdAlmacen()] = this.cantidadParcial[almacen.getIdAlmacen()];
            delete this.cantidadParcial[almacen.getIdAlmacen()];
            return this.cantidadParcial[almacen.getIdAlmacen()];
        }
        return 0;
    }


    setCantidadParcialMovimiento(cantidad:number,almacen:Almacen){
        if (this.productoRegistradoEnAlmacen(almacen) && cantidad>=0){
            if (cantidad!=0){
                for (let key in this.cantidadParcial){
                    if (parseInt(key) == almacen.getIdAlmacen()){
                        let valorAnterior = this.cantidadParcial[key];
                        valorAnterior -= cantidad;
                        delete this.cantidadParcial[almacen.getIdAlmacen()];
                        this.cantidadParcial[almacen.getIdAlmacen()] = valorAnterior;
                    };
                }
            }else{
                for (let key in this.cantidadParcial){
                    if (parseInt(key) == almacen.getIdAlmacen()){
                        delete this.cantidadParcial[almacen.getIdAlmacen()];
                        break
                    }
                }
            }
        }else{
            console.log("No llegamos :c");
            this.cantidadParcial[almacen.getIdAlmacen()] = cantidad;
        }
    }

}
//#endregion 




