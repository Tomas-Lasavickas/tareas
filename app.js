const fs = require('fs'); // File System
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
            estado: 'pendiente'
        }
        arrayDeTareas.push(nuevaTarea);
        JSON.stringify(arrayDeTareas)
        fs.writeFileSync('./tareas.json',  JSON.stringify(arrayDeTareas))
        console.log(nuevaTarea);
        console.log('Se ha creado una nueva tarea')
    break;
    case 'eliminarUltimaTarea':
        arrayDeTareas.pop(process.argv[2]);
        JSON.stringify(arrayDeTareas)
        fs.writeFileSync('./tareas.json',  JSON.stringify(arrayDeTareas))
        console.log('Se ha eliminado una tarea')
    break;
    case 'eliminarUnaTarea':
        //terminar en clase   
    break;
    case 'filtrarTareas':
         
        let estadoParaBuscar = process.argv[3];
        let tareasFiltradas = arrayDeTareas.filter(function(elemeneto){
            return estadoParaBuscar == elemeneto.estado
        }) 
        for(let i = 0; i < tareasFiltradas.length; i++){
            console.log(`${i+1}. ${arrayDeTareas[i].titulo} -- ${arrayDeTareas[i].estado}`);
        } 
    break;
    default:
        console.log('Hasta el momento solo puedo listar tareas a través del comando listarTareas');
    break;
}