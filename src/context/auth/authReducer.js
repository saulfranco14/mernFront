import{
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
} from '../../types';


export default ( state, action ) => {

    switch ( action.type ) {    

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS :

            localStorage.setItem('token', action.payload);
            return{
                ...state,
                auth    : true,
                msg     : null,
                loading : false,
            }

        case GET_USER :
            return {
                ...state,
                auth    : true,
                user    : action.payload,
                loading : false,
            }

        case LOGOUT: 
        case LOGIN_ERROR:
        case REGISTER_ERROR :
            localStorage.removeItem('token');
            return{
                ...state,
                token   : null,
                auth    : null,
                user    : null,
                msg     : action.payload,
                loading : false,
            }
        default: 
            return state;
    }

}