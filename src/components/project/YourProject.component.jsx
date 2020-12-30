import React, { Fragment, useContext } from 'react';
import projectContext   from '../../context/project/projectContext';
import taskContext      from '../../context/task/taskContext';

const YourProject = ( { project }  ) => {

    const context                       = useContext(projectContext);
    const contextTask                   = useContext(taskContext);
    const { viewProjectVisualize }      = context;
    const { getTasks }                  = contextTask;

    // desctructuracion
    const { name }             = project;

    const selectProject = ( projectId ) => {
        viewProjectVisualize(projectId);
        getTasks(projectId);
    }


    return ( 
        <Fragment>
            {/* Se van a visualizar los proyectos que solo estén activos */}
            {
                project.active === true ? 
                <li>
                    <button
                        type="button"
                        className="btn btn-blank textUppercase"
                        onClick = { ()=> selectProject( project._id ) }
                    >
                    { name }
                    </button>
                </li>
                :
                null
            }
        </Fragment>
     );
}
 
export default YourProject;