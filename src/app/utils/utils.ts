export function LenguajeDataTable(tipo: string = "registros"){
    return {
        lengthMenu: "Mostrar _MENU_ registros",
        searchPlaceholder: "Término de búsqueda",
        zeroRecords: "No se encontraron resultados",
        info: "N° de " + tipo + ": _MAX_",
        infoEmpty: "",
        infoFiltered: "(N° de resultados de la búsqueda: _TOTAL_)",
        search: "Buscar: ",
        paginate: {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        loadingRecords:"Cargando...",
        processing:'Procesando...'
    }
}

export function extraerFotoBase64(foto: any){
    return new Promise((resolve, _) => {
      const readerFoto = new FileReader();
      readerFoto.readAsDataURL(foto);
      readerFoto.onloadend = () => resolve(readerFoto.result);
      readerFoto.readAsDataURL(foto);      
    });
}