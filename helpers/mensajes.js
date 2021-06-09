const { resolve } = require('path');
const { stdin, stdout } = require('process');

require('colors');

const mostrarMenu = ()=>
{
    return new Promise((resolve)=>{
        console.clear();
    console.log('======================================='.green);
    console.log('         Selecciona una opcion         '.green);
    console.log('=======================================\n'.green);

    console.log(`${'1.'.green} Crear tarea`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar tarea`);
    console.log(`${'0.'.green} Salir \n`);

    const readLine = require('readline').createInterface({
        input:stdin,
        output:stdout
    })

    readLine.question('Seleccione una opcion: ',(opt)=>{
        console.log(opt);
        readLine.close();
        resolve(opt);
    })

    })

    
}

const pause = ()=>
{
    return new Promise((resolve)=>{
        const readLine = require('readline').createInterface({
            input:stdin,
            output:stdout
        })
    
        readLine.question(`\n Presione ${'ENTER'.rainbow} para continuar`,(opt)=>{
            console.log(opt);
            readLine.close();
            resolve();
        })
    })
}

module.exports = {mostrarMenu,pause}