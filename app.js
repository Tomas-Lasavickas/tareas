const { log } = require('console');
const fs = require('fs'); // File System
const { listenerCount } = require('process');
const process = require('process')

let tareasJSON = fs.readFileSync('./tareas.json', 'utf8');
let arrayDeTareas = JSON.parse(tareasJSON);

switch (process.argv[2]) {
    case 'listarTareas':
    console.log("Este es el listado de tareas que existen");
    console.log("----------------------------------------");
    for(let i = 0; i < arrayDeTareas.length; i++){
        console.log(`${i+1}. ${arrayDeTareas[i].titulo} -- ${arrayDeTareas[i].estado}`)
    }            
    break;
    case 'crearTarea': 
    let tituloTarea = process.argv[3]
    let nuevaTarea = {
        titulo: tituloTarea,
            estado: (process.argv[4] == undefined) ? "pendiente" : process.argv[4]
        }
        arrayDeTareas.push(nuevaTarea);
        fs.writeFileSync('./tareas.json',  JSON.stringify(arrayDeTareas))
        console.log(nuevaTarea);
        console.log('Se ha creado una nueva tarea')
    break;
    case 'eliminarUltimaTarea':
        arrayDeTareas.pop(process.argv[2]);
        JSON.stringify(arrayDeTareas)
        fs.writeFileSync('./tareas.json',  JSON.stringify(arrayDeTareas, null, 2))
        console.log('Se ha eliminado una tarea')
    break;
    case 'eliminarTarea':
        let tareaAEliminar = process.argv[3] - 1;
        arrayDeTareas.splice(tareaAEliminar, 1);
        fs.writeFileSync('./tareas.json',  JSON.stringify(arrayDeTareas, null, 2))
        console.log("Se ha elimidado una tarea")
    break;
    case 'filtrarTareas':

        let estadoParaBuscar = process.argv[3];
        let tareasFiltradas = arrayDeTareas.filter(function(elemeneto, indice){
            elemeneto.posicionOriginal = indice - 1;
            return estadoParaBuscar.toLowerCase() == (elemeneto.estado).toLowerCase()
        }) 
        for(let i = 0; i < tareasFiltradas.length; i++){
            console.log(`${i+1}. ${arrayDeTareas[i].titulo} -- ${arrayDeTareas[i].estado}`);
        } 
    break;
    case 'cambiarEstado':
        let laTarea = process.argv[3];
        let nuevoEstado = process.argv[4];

        arrayDeTareas[laTarea - 1].estado = nuevoEstado;
        fs.writeFileSync('./tareas.json', JSON.stringify(arrayDeTareas, null, 2));
        break;
    default:
        console.log('No existe semejante función maestro');
    break;
}