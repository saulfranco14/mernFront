import { 
        FORMULARIO_PROYECTO, 
        GET_PROYECTOS, 
        AGREGAR_PROYECTO, 
        VALIDATE_FORM,
        VISUALIZE_PROJECT,
        DESACTIVE_PROJECT,
        ERROR_PROJECT,
} from '../../types';

export default ( state, action ) => {
    switch( action.type ) {

        case FORMULARIO_PROYECTO: 
            return{
                ...state,
                formNewProject : true,
            }

        case GET_PROYECTOS: 
            return{
                ...state,
                projects : action.payload,
            }
       
        case AGREGAR_PROYECTO: 
            return{
                ...state,
                projects        : [...state.projects, action.payload],
                formNewProject  : false,
                errorForm       : false,
            }
        
        
        case VALIDATE_FORM: 
            return{
                ...state,
                errorForm : true,
            }
        
        case VISUALIZE_PROJECT: 
            return{
                ...state,
                projectVisualize : state.projects.filter( project =>
                    project._id === action.payload  
                ),
            }
        
        case DESACTIVE_PROJECT:
            return{
                ...state,
                projects : state.projects.filter( project =>
                    project._id !== action.payload.task?._id
                ),
                
                projectVisualize : null
            }    
        case ERROR_PROJECT : 
            return {
                ...state,
                msg : action.payload,
            }
        default : 
            return state;
    }
}