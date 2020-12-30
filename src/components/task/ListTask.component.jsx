import React, { Fragment, useContext }      from 'react';
import Task                                 from '../task/Task.component';
import projectContext                       from '../../context/project/projectContext';
import taskContext                          from '../../context/task/taskContext';
import { CSSTransition, TransitionGroup }   from 'react-transition-group';

const ListTask = () => {

    const context                                   = useContext(projectContext);
    const contextTask                               = useContext(taskContext);
    const { projectVisualize, desactiveProject }    = context;
    const { tasksProject }                              = contextTask;


    // No han seleccionado algún proyecto
    if( !projectVisualize ) return <h2> Selecciona un proyecto</h2>
    const [ projectView ]           = projectVisualize ;
    const handleDesactive = () =>{
        desactiveProject(projectView._id)
    }
    return (  
        <Fragment>
            <h2 className="textUppercase"> Proyecto: {projectView.name}  </h2>
            <h5 className="text-center"> {projectView.speciality}</h5>

                <ul className="listado-tareas">
                    { 
                        tasksProject.length === 0 ?
                        (<li className="tarea"><p>No hay tareas</p></li>)
                    :                       
                        <TransitionGroup>
                            { 
                                tasksProject.map( task =>(
                                    <CSSTransition
                                        key         ={task.id}
                                        timeout     ={600}
                                        classNames  ="tarea"
                                    >
                                        <Task
                                            tarea   ={task}
                                        />
                                    </CSSTransition>
                                ))
                            } 
                            
                        </TransitionGroup>
                    }
                </ul>
        
            <button
                type="button"
                className="btn btn-eliminar"
                onClick = { handleDesactive }
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
}
 
export default ListTask;
