const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
require('colors');

const Preguntas = 
[
    {
        type:'list',
        name:'opcion',
        message:'Que desea hacer?',
        choices:[
            {
                value:'1',
                name:`${'1.'.cyan} Crear Tarea`            
            },
            {
                value:'2',
                name:`${'2.'.cyan} Listar Tareas`            
            },
            {
                value:'3',
                name:`${'3.'.cyan} Listar Tareas Completadas`            
            },
            {
                value:'4',
                name:`${'4.'.cyan} Listar tareas pendientes`            
            },
            {
                value:'5',
                name:`${'5.'.cyan} Completar Tarea(s)`           
            },
            {
                value:'6',
                name:`${'6.'.cyan} Borrar Tarea`            
            },
            {
                value:'0',
                name:`${'0.'.cyan} Salir`            
            }

        ]
    }
];

const inquirerMenu = async()=>
{
    console.log('======================================='.green);
    console.log('         Selecciona una opcion         '.white);
    console.log('=======================================\n'.green);
    const {opcion}= await inquirer.prompt(Preguntas);
    return opcion;
}

const pause = async()=>
{
    const question = [
        {
            type:'input',
            name:'enter',
            message:`Presione ${'Enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async(message)=>
{
    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value)
            {
                if (value.length ===0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas=[])=>
{
    const choices = tareas.map((tareas,i)=>
    {
        const idx = `${i+1}.`.green;
        return {
            value:tareas.id,
            name:`${idx} ${tareas.desc}`
        }
    });

    choices.unshift(
        {
            value:'0',
            name:'0.'.green + 'Cancelar'
        }
    );

    const preguntas =[
        {
            type:'list',
            name:'id',
            message:'borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirm = async(message='')=>
{
    const question = 
    [
        {
           type:'confirm',
           name:'ok',
           message 
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas=[])=>
{
    const choices = tareas.map((tareas,i)=>
    {
        const idx = `${i+1}.`.green;
        return {
            value:tareas.id,
            name:`${idx} ${tareas.desc}`,
            checked:(tareas.completadoEn)?true:false
        }
    });

    choices.unshift(
        {
            value:'0',
            name:'0.'.green + 'Cancelar'
        }
    );

    const preguntas =[
        {
            type:'checkbox',
            name:'ids',
            message:'marcar',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {inquirerMenu,pause,readInput,listadoTareasBorrar,confirm,mostrarListadoCheckList}