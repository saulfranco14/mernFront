import React, { Fragment, useContext, useState, useEffect } from 'react';
import projectContext from '../../context/project/projectContext';
import taskContext      from '../../context/task/taskContext';


const FormTask = () => {

    const context               = useContext(projectContext);
    const { projectVisualize }  = context;
    const contextTask           = useContext(taskContext);
    const { 
            editTask, 
            errorTask, 
            postTask, 
            validateTask, 
            getTasks, 
            updateTaskFn,
            cleanTaskFn,
        }   = contextTask;

     // Seleccionar tarea en el form
    useEffect(() => {
        if ( editTask !== null ) {
            setTask(editTask)
        }else{
            setTask({
                name : '' 
            })
        }
    }, [editTask])


    const[ task, setTask ]      = useState({
        name : '',
    })

    const { name } = task; 

    // No han seleccionado algún proyecto
    if( !projectVisualize ) return null
    const [ projectView ]   = projectVisualize ;

    const handleChange = ( e ) => {
        setTask({
            ...task, 
            [ e.target.name ] : e.target.value
        })
    }

    const onSubmit = ( e ) => {
        e.preventDefault();

        if( name.trim() === ''){
            validateTask();
            return;
        }

        if ( editTask === null ) {
            console.log(task);
            task.project_id     = projectView._id;
            postTask(task);
        }else{
            // Actualizar tarea
            updateTaskFn(task);
            // Limpia la tarea
            cleanTaskFn();
        }
       
        getTasks(projectView._id)
        setTask({
            name: ''
        })
    }

    return (  
        <Fragment>
            <div className="formulario">
                <form
                    onSubmit={ onSubmit }
                >
                    <div className="contenedor-input">
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre de la tarea"
                            name="name"
                            value={ name }
                            onChange= { handleChange }
                        />
                    </div>
                    <div className="contenedor-input">
                        <input
                            type="submit"
                            className="btn btn-primario btn-submit btn-block"
                            value={ editTask ? ' Editar tarea ' : 'Agregar tarea'}
                        />
                    </div>
                </form>
                {
                    errorTask ? 
                     <p className="mensaje error">
                         La tarea es obligatoria
                     </p>
                    : 
                    null
                }
            </div>

        </Fragment>
    );
}
 
export default FormTask;