import React, { Fragment, useState, useContext, useEffect }    from 'react'
import { Link }                                     from 'react-router-dom';
import AlertContext                                 from '../../context/alert/alertContext';
import AuthContext                                  from '../../context/auth/authContext';


const Login = ( props ) => {


    // Context Alert
    const alertContext          = useContext(AlertContext);
    const { alert, viewAlert }  = alertContext;

    // Context Auth
    const authContext               = useContext(AuthContext);
    const { auth, msg, loginUser }  = authContext;

    // User Success
    useEffect(() => {
        if( auth ) props.history.push('/projects');
        if( msg )  viewAlert( msg.msg, msg.categoria );
    }, [ msg, auth, props.history ]);

    // User
    const [ user, setUser ] = useState({
        email       : '',
        password    : ''
    });

    const { email, password } = user;

    const onChange = ( e ) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = ( e ) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '' ) viewAlert( 'Todos los campos son obligatorios', 'alerta-error' ) ;
        
        loginUser( { email, password } );
    
    }

    return ( 
        <Fragment>
            <div className="form-usuario">
                {
                    alert ? 
                    (
                        <div className={ `alerta ${alert.category}` }>
                            {alert.msg}
                        </div>
                    )
                    :
                    null
                }
                <div className="contenedor-form sombra-dark">
                    <h2> Iniciar Sesión </h2>
                        <form
                            onSubmit={ onSubmit }

                        >
                            <div className="campo-form">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Escribe tu email"
                                    autoComplete="off"
                                    value={ email }
                                    onChange={onChange}

                                />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="email">Password</label>
                                <input 
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Escribe tu contraseña"
                                    autoComplete="off"
                                    value = { password }
                                    onChange={onChange}

                                />
                            </div>
                            <div className="campo-form">
                                <input
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value="Iniciar Sesión"
                                />
                            </div>
                        </form>
                        <Link
                            to={'/createAccount'}
                            className="enlace-cuenta"
                        >
                            Crear Cuenta
                        </Link>
                </div>
            </div>
        </Fragment>
     );
}
 
export default Login;