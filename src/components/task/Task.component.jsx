import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/project/projectContext';
import taskContext      from '../../context/task/taskContext';

const Task = ({ tarea }) => {

    const{ _id, name, estado }          = tarea;
    const context                       = useContext(projectContext);
    const { projectVisualize }          = context;

    const contextTask                   = useContext(taskContext);
    const { desactiveTask, getTasks, updateTaskFn, editTaskFn   }  = contextTask;

    // Extraer proyecto
    const[projectState] = projectVisualize;

    const taskEliminate = ( _id ) =>{
        desactiveTask(_id, projectState._id);
        getTasks(projectState._id);
    }

    const taskState = ( task ) =>{
        if(task.estado){
            task.estado = false;
        }else{
            task.estado = true;
        }
        updateTaskFn(task);
    }

    // Fn para editar la tarea
    const selectTask = ( task ) =>{
        editTaskFn(task);
    }
    return (  
       
        <Fragment>
            <li className="tarea sombra">
                <p>
                    { name ? name  : tarea.tasks.name  }
                </p>
                <div className="estado">
                    { estado ?
                        (
                            <button
                                type        ="button"
                                className   ="completo"
                                onClick     ={() => taskState(tarea)}
                            >
                                Completo
                            </button>
                        )
                    :
                        (
                            <button
                                type        ="button"
                                className   ="incompleto"
                                onClick     ={() => taskState(tarea)}
                            >
                                Incompleto
                            </button>
                        )
                    }
                </div>
                <div className="acciones">
                    <button
                        type        ="button"
                        className   ="btn btn-primario"
                        onClick     ={ ()=> selectTask(tarea) }
                    >
                        Editar
                    </button>
                    <button
                        type        ="button"
                        className   ="btn btn-secundario"
                        onClick     = { ()=> taskEliminate(_id) }
                    >
                        Eliminar
                    </button>
                </div>
            </li>
        </Fragment>
    );
}
 
export default Task;