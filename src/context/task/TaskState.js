import React, { useReducer }    from 'react'; 
import TaskContext              from './taskContext';
import TaskReducer              from './taskReducer';
import clientAxios              from '../../config/axios';
import {
    TASKS_PROJECT,
    POST_TASK,
    VALIDATE_TASK,
    DESACTIVE_TASK,
    ACTIVE_TASK,
    EDIT_TASK,
    UPDATE_TASK,
    CLEAN_TASK,
} from '../../types';

const TaskState = props => {
    
    const initialState = {
        tasksProject    : [],
        errorTask       : false,
        editTask        : null,
    }

    const [state, dispatch] = useReducer( TaskReducer, initialState);

    const getTasks = async ( project_id ) => {
        try {
            const response = await clientAxios.get('/api/tasks', { params : { project_id } });
            // console.log(response);
            dispatch({
                type: TASKS_PROJECT,
                payload : response.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    const postTask = async ( task ) => {
        try {

            const response = await clientAxios.post('/api/tasks', task);
            console.log(response);

            dispatch({
                type    : POST_TASK,
                payload : response.data 
            });

        } catch (error) {
            console.log(error);
        }
    }

    const validateTask = () => {
        dispatch({
            type : VALIDATE_TASK,
        })
    }

    // editTask 
    const editTaskFn = ( task ) => {
        dispatch({
            type    : EDIT_TASK,
            payload : task
        })
    }

    const desactiveTask =async ( taskId, project_id) => {
        try {
            const response = await clientAxios.put(`/api/tasks/desactive/${taskId}`, { params: { project_id , taskId } } )
            dispatch({
                type    : DESACTIVE_TASK,
                payload : response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const stateTask = ( task )  => {
        dispatch({
            type    : ACTIVE_TASK,
            payload : task,
        })
    }

    // Actualizar tarea
    const updateTaskFn = async ( task ) => {
        try {

            const response = await clientAxios.put(`/api/tasks/${task._id} `, task );
            
            dispatch({
                type : UPDATE_TASK,
                payload : response.data.task
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Limpiar tarea
    const cleanTaskFn = ( ) => {
        dispatch({
            type : CLEAN_TASK,    
        })
    }

    return(
        <TaskContext.Provider
            value={{
                tasksProject    : state.tasksProject,
                errorTask       : state.errorTask,
                editTask        : state.editTask,
                state           : state.editTaskNull,
                getTasks,
                postTask,
                validateTask,
                desactiveTask,
                stateTask,
                updateTaskFn,
                cleanTaskFn,
                editTaskFn,
            }}
        >
            { props.children }
        </TaskContext.Provider>
    )
}

export default TaskState;