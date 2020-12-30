import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';


const RoutePrivate = ( { component : Component, ...props } ) => {

    const contextAuth   = useContext(authContext);
    const { auth , getUserByAuth, loading }      = contextAuth;

    useEffect(() => {
        getUserByAuth();

        // eslint-disable-next-line
    }, [])

    return ( 
        <Route 
            { ...props }
            render = { props => !auth && !loading ? 
                ( <Redirect to="/" /> ) 
                :
                ( <Component { ...props} /> )   
            }
        />
     );
}
 
export default RoutePrivate;