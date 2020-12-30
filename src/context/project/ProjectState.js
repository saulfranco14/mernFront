import React, { useReducer }    from 'react';
import projectContext           from './projectContext';
import projectReducer           from './projectReducer';
import { 
        FORMULARIO_PROYECTO, 
        GET_PROYECTOS, 
        AGREGAR_PROYECTO, 
        VALIDATE_FORM,
        VISUALIZE_PROJECT,
        DESACTIVE_PROJECT,
        ERROR_PROJECT,
} from '../../types';
import clientAxios              from '../../config/axios';


const ProjectState = props => {
    

    const initialState = {
        errorForm           : false,
        formNewProject      : false,
        projects            : [],
        projectVisualize    : null,
        msg                 : null,
    }

    const [state, dispatch] = useReducer(projectReducer, initialState);

    const viewForm = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
        })
    }

    const viewProjects = async ( ) =>{
        try {
            const response = await clientAxios.get('/api/projects');
            dispatch({
                type: GET_PROYECTOS,
                payload : response.data.projects
            })
        } catch (error) {
            console.error(error);
        }
    }

    const agregarProject = async( project ) => {
      
        try{
            const response = await clientAxios.post('/api/projects', project );
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const viewFormError = () =>{
        dispatch({
            type: VALIDATE_FORM,
        })
    }

    const viewProjectVisualize = ( projectId ) =>{
        dispatch({
            type: VISUALIZE_PROJECT,
            payload : projectId,
        })
    }

    const desactiveProject = async ( projectId ) => {

        const alert = {
            msg : "Hubo un error",
            categoria : "alerta-error"
        }

        try{
            const response = await clientAxios.put(`/api/projects/active/${projectId}` );

            if (response.data === 500 ){
                dispatch({
                    type    : ERROR_PROJECT,
                    payload : alert
                })
                return;
            }

            dispatch({
                type : DESACTIVE_PROJECT,
                payload : response.data
            })
        } catch (error) {
            console.log(error);
            
            dispatch({
                type    : ERROR_PROJECT,
                payload : alert
            })
        }
        
    }


    return(
        <projectContext.Provider
            value = {{
                errorForm           : state.errorForm,
                projects            : state.projects,
                projectVisualize    : state.projectVisualize,
                formNewProject      : state.formNewProject,
                msg                 : state.msg,
                viewForm,
                viewProjects,
                agregarProject,
                viewFormError,
                viewProjectVisualize,
                desactiveProject,
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;