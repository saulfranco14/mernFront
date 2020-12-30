import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import{
    VIEW_ALERT,
    HIDE_ALERT,
} from '../../types';

const AlertState = props => {

    const initialState = {
        alert : null
    }

    const [state, dispatch] = useReducer( alertReducer , initialState );

    const viewAlert = ( msg, category ) =>{
        
        dispatch({
            type : VIEW_ALERT,
            payload : {
                msg,
                category,
            }
        });

        setTimeout(() => {
            dispatch({
                type : HIDE_ALERT,
            })
        }, 5000 );
    }


    return(
        <alertContext.Provider
            value={{
                alert : state.alert,
                viewAlert,
            }}
        >
            { props.children }
        </alertContext.Provider>
    )

}

export default AlertState;