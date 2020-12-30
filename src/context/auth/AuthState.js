import React, { useReducer }    from 'react';
import authtContext             from './authContext';
import authReducer              from './authReducer';
import clientAxios              from '../../config/axios';
import authToken                from '../../config/auth';

import{
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
} from '../../types';

const AuthState = ( props ) => {

    const initialState = {
        token   : localStorage.getItem('token'),
        auth    : null,
        user    : null,
        msg     : null,  
        loading : true,  
    }

    const [state, dispatch] = useReducer( authReducer, initialState );

    // REGISTER USER
    const registerUser = async ( user ) =>{
        try {
            const response = await clientAxios.post( 'api/users', user );
           
            dispatch({
                type    : REGISTER_SUCCESS,
                payload : response.data.token
            })
            // Data User
            getUserByAuth();

        } catch (error) {

            const alert = {
                msg         : error.response.data.msg,
                categoria   : 'alerta-error'
            }
            dispatch({
                type    : REGISTER_ERROR,
                payload : alert
            })
        }
    }

    // USER AUTH
    const getUserByAuth = async () =>{
        const token = localStorage.getItem('token');
        if(token) authToken(token) ;
        try {
            const response = await clientAxios.get('/api/auth');
            dispatch({
                type    : GET_USER,
                payload : response.data
            })
        } catch (error) {
            console.error(error);
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    }

    // LOGIN USER 
    const loginUser = async( data ) => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            dispatch({
                type : LOGIN_SUCCESS,
                payload : response.data.token,
            })
            // Data User
            getUserByAuth();

        } catch (error) {
            const alert = {
                msg         : error.response.data.msg,
                categoria   : 'alerta-error'
            }
            dispatch({
                type    : LOGIN_ERROR,
                payload : alert
            })
        }
    }
    
    const logoutUser = () => {
        dispatch({
            type : LOGOUT
        })
    }

    return(
        <authtContext.Provider
            value={{
                token   : state.token,
                auth    : state.auth,
                user    : state.user,
                msg     : state.msg,
                loading : state.loading,
                registerUser,
                getUserByAuth,
                loginUser,
                logoutUser,
            }}
        >
            { props.children }
        </authtContext.Provider>
    )
}

export default AuthState;