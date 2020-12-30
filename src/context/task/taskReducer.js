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

export default ( state, action ) => {
    switch (action.type) {

        case TASKS_PROJECT :
            return{
                ...state,
                tasksProject : action.payload !== undefined ? action.payload.filter( task => task?.active === true ) : [],
                editTask : null,
            }
    
        case POST_TASK: 
            return{
                ...state,
                tasksProject       : [ ...state.tasksProject, action.payload],
                errorTask   : false,
            }
        
        case VALIDATE_TASK: 
            return{
                ...state,
                errorTask : true,
            }
        case DESACTIVE_TASK : 
            return{
                ...state,
                tasksProject : state.tasksProject.filter( task => task._id !== action.payload.task?._id )
            }
    
        case UPDATE_TASK :
        case ACTIVE_TASK :
            return{
                ...state,
                tasksProject : state.tasksProject.map( 
                            task => task._id === action.payload._id 
                        ?
                            action.payload : task ),
                editTask : null,
            }

        case EDIT_TASK : 
            return{
                ...state,
                editTask : action.payload,
            }

        case CLEAN_TASK :
            return{
                ...state,
                editTask : null
            }
    
        default:
           return state;
    }
}