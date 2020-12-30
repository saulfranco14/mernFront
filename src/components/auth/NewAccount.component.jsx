import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link }                                             from 'react-router-dom';
import AlertContext                                         from '../../context/alert/alertContext';
import AuthContext                                          from '../../context/auth/authContext';

const NewAccount = ( props ) => {

    // Context Alert
    const alertContext          = useContext(AlertContext);
    const { alert, viewAlert }  = alertContext;

    // Context Auth
    const authContext           = useContext(AuthContext);
    const { auth, msg, registerUser }      = authContext;

    // User Success
    useEffect(() => {
        if( auth ) props.history.push('/projects');
        if( msg )  viewAlert( msg.msg, msg.categoria );
    }, [ msg, auth, props.history ]);

    // User
    const [ user, setUser ] = useState({
        email       : '',
        password    : '',
        nombre      : '',
        confirm     : ''    
    });

    const { email, password, nombre, confirm } = user;

    const onChange = ( e ) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = ( e ) => {
        e.preventDefault();
        if ( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === ''  ) {
            viewAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        if ( password.length < 8 ) {
            viewAlert('El password debe de tener mínimo 8 carácteres', 'alerta-error');
            return;
        }
        if ( password !== confirm) {
            viewAlert('El password debe de coincidir', 'alerta-error');
            return;
        }

        // Register User
        registerUser({
            nombre,
            email,
            password
        });
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
                    <h2> Crea tu cuenta </h2>
                        <form
                            onSubmit={ onSubmit }

                        >
                            <div className="campo-form">
                                <label htmlFor="nombre">Nombre</label>
                                <input 
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Escribe tu nombre"
                                    autoComplete="off"
                                    value={ nombre }
                                    onChange={onChange}

                                />
                            </div>
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
                                <label htmlFor="confirm">Confirmar Passsword</label>
                                <input 
                                    type="password"
                                    id="confirm"
                                    name="confirm"
                                    placeholder="Confirma tu password"
                                    autoComplete="off"
                                    value = { confirm }
                                    onChange={onChange}

                                />
                            </div>
                            <div className="campo-form">
                                <input
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value="Registrarme"
                                />
                            </div>
                        </form>
                        <Link
                            to={'/'}
                            className="enlace-cuenta"
                        >
                            Iniciar Sesión
                        </Link>
                </div>
            </div>
        </Fragment>
     );
}
 
export default NewAccount;