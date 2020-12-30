import React, { Fragment, useContext, useEffect }   from 'react';
import YourProject                                  from '../project/YourProject.component';
import projectContext                               from '../../context/project/projectContext';
import AlertContext                                         from '../../context/alert/alertContext';
import { CSSTransition, TransitionGroup }           from 'react-transition-group';


const ListadoProject = () => {

    const context           = useContext(projectContext);
    const { msg, projects, viewProjects }      = context;
    
    // Context Alert
    const alertContext          = useContext(AlertContext);
    const { alert, viewAlert }  = alertContext;

    useEffect(() => {
        if (msg) viewAlert(msg.msg, msg.categoria);
        viewProjects();
    }, [msg]);

    if(projects.length === 0 ) return <p>No hay proyecto, Venga!! Empezemos</p>;

    return ( 
        <Fragment>
            <ul className="listado-proyectos ">
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
                <TransitionGroup>
                        { 
                            projects.map( project =>(
                               <CSSTransition
                                    key = { project._id}
                                    timeout     ={600}
                                    classNames  ="proyecto "
                               >
                                    <YourProject 
                                        project={project}
                                    />
                               </CSSTransition>
                            ))
                        } 
                </TransitionGroup>
            </ul>
            
        </Fragment>
     );
}
 
export default ListadoProject;