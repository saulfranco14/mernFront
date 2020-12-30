import React, { Fragment, useContext, useEffect }  from 'react';
import Sidebar              from '../layout/Sidebar.component';
import Header               from '../layout/Header.component';
import FormTask             from '../task/FormTask.component';
import ListTask             from '../task/ListTask.component';
import authContext          from '../../context/auth/authContext';


const Projects = () => {

    const authToken             = useContext( authContext );
    const { getUserByAuth  }    = authToken;

    useEffect(() => {
        getUserByAuth();

        // eslint-disable-next-line
    }, [])

    return ( 
        <Fragment>
            <div className="contenedor-app">
                <Sidebar/>
                <div className="seccion-principal">
                    <Header 
                    
                    />
                    <main>
                        <FormTask

                        />
                         <div className="contenedor-tareas">
                            <ListTask
                            
                            />
                         </div>
                    </main>
                </div>
            </div>
        </Fragment>
     );
}
 
export default Projects;