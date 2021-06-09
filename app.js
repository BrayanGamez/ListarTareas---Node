require('colors');
const {inquirerMenu,
  pause,
readInput,
listadoTareasBorrar,
confirm,
mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {GuardarDB,leerDB} = require('./helpers/fileSave');
console.clear();

const main = async()=>
{
    let opt ='';
    const tareas = new Tareas();
    const arrayDB = leerDB();
    if (arrayDB)
     {
      tareas.cargarTareaFromArray(arrayDB);
    }
    do {
    opt= await inquirerMenu();
    switch (opt) {
      case '1':
        //Creamos la tarea
        console.log('\n');
        const desc = await readInput('Descripcion:');
        tareas.crearTarea(desc);
        break;

      case '2':
        console.log('\n');
          tareas.listarTareas();
        break;

      case '3':
        console.log('\n');
          tareas.listarPendientesCompletadas();
      break;
      
      case '4':
        console.log('\n');
          tareas.listarPendientesCompletadas(false);
      break;

      case '5':
        console.log('\n');
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
      break;

      case '6':
        console.log('\n');
          const id = await listadoTareasBorrar(tareas.listadoArr);
          if (id !=='0') {
            const ok = await confirm('Esta seguro ?');
          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea Borrada'.cyan);
          }
          }
      break;
    }
    GuardarDB(tareas.listadoArr);
      await pause();
    } while (opt!=='0');
}

main();