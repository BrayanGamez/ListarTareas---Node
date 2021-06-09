const Tarea = require('./tarea');

class Tareas{
_listado = {};
constructor()
{
    this._listado = {};
}

    toggleCompletadas(ids=[])
    {
        ids.forEach(id=>
            {
                const tarea = this._listado[id];//como js trabaja por referencia a pesar de que se modifique esa const se hara en el objeto global
                if (!tarea.completadoEn) {
                    tarea.completadoEn = new Date().toISOString();
                }
            })

        this.listadoArr.forEach(tarea=>{
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

    cargarTareaFromArray(data=[])
    {
        data.forEach(element => {
            this._listado[element.id] = element;
        });
    }

    borrarTarea(id)
    {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    listarTareas()
    {
        if (this._listado) {
            Object.keys(this._listado).forEach((e,i)=>
                {
                    console.log('\n');
                const idx =   `${i+1}.`.green;
                 const estado= !this._listado[e].completadoEn?`pendiente`.red:
                    `completado`.green;
                    console.log(`${idx}. ${this._listado[e].desc} :: ${estado}`)
                });
        } else {
            console.log('No hay tareas cargadas'.red);
        }
    }

    listarPendientesCompletadas(complete=true)
    {
        const data = this.listadoArr;
        if (complete)
         {
             let i=1;
             data.forEach((element)=>
                {
                    if (element.completadoEn) {
                        const flag = `completado en ${element.completadoEn}`.green;
                        const id = `${i}.`.cyan;
                        console.log(`${id} ${element.desc} :: ${flag }`);
                        i++
                    }
                })   
        }
        else
        {
            let i=1;
             data.forEach((element)=>
                {
                    if (element.completadoEn) {
                        const flag = 'pendiente'.red;
                        const id = `${i}.`.cyan;
                        console.log(`${id} ${element.desc} :: ${flag}`);
                        i++
                    } 
                })
        }
    }

get listadoArr()
{
    const listado = [];
    Object.keys(this._listado).forEach(key=>
        {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
    return listado;
}

    crearTarea(desc='')
    {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

}

module.exports = Tareas;