import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/project/projectContext';

const NewProject = () => {

    const context               = useContext(projectContext);
    const {errorForm, formNewProject, viewForm, agregarProject, viewFormError }    = context;

    const[ project, setProject ] = useState({
        name : '',
        description : '',
        speciality : '',
    });

    const { name, description, speciality } = project;

    const onChangeProject = ( e ) => {
        setProject({
            ...project,
            [e.target.name] : e.target.value,
        })
    }

    const onSubmitProject = (e) => {
        e.preventDefault();
        if( name === '' || description === '' || speciality === ''){
            console.log("entro");
            viewFormError();
            return;
        }
        agregarProject(project);
        setProject({
            name : '',
            description : '',
            speciality : '',
        })
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick = { ()=> viewForm() }
            >
                Nuevo Proyecto
            </button>
            {
                formNewProject ? 
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={ onSubmitProject }
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre de tu proyecto"
                            name="name"
                            value={name}
                            onChange={onChangeProject}
                        />

                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Descripción de tu proyecto"
                            name="description"
                            value={description}
                            onChange={onChangeProject}
                        /> 

                        <select
                            className="input-text"
                            name="speciality"
                            value={speciality}
                            onChange={onChangeProject}
                        >
                            <option value="*">Especialidad de tu proyecto</option>
                            <option value="frontEnd">Front-End</option>
                            <option value="backEnd">Back-End</option>
                            <option value="BD">Base de datos</option>
                            <option value="devOps">Devops</option>
                            <option value="PO">Product Owner</option>
                            <option value="UX">UX</option>
                            <option value="DS">Data Science</option>
                        </select>

                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Crear Proyecto"
                        />
                    </form>
                )
                : null
            }
            {
                errorForm ?
                    <p className="mensaje error">
                       Todos los campos son obligatorios
                    </p>
                :
                null
            }
        </Fragment>
    );
}
 
export default NewProject;