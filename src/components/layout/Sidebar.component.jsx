import React, { Fragment } from 'react';
import NewProject from '../project/NewProject.component';
import ListadoProject from '../project/ListadoProject.component';

const Sidebar = () => {
    return ( 
        <Fragment>
            <aside>
                <h1>
                    MERN 
                </h1>
                <NewProject
                />
                <div className="proyectos">
                    <h2> Tus proyectos </h2>
                    <ListadoProject/>
                </div>
            </aside>
        </Fragment>
     );
}
 
export default Sidebar;