import React, { Fragment}                         from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login                                      from './components/auth/Login.component';
import NewAccount                                 from './components/auth/NewAccount.component';
import Projects                                   from './components/project/Projects.component';
import ProjectState                               from './context/project/ProjectState';
import TaskState                                  from './context/task/TaskState';
import AlertState                                 from './context/alert/AlertState';
import AuthState                                  from './context/auth/AuthState';
import authToken                                  from './config/auth';
import RoutePrivate                               from './components/routes/RoutePrivate.component';

const token = localStorage.getItem('token');
if(token) authToken(token);

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Fragment>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/createAccount" component={NewAccount} />
                  <RoutePrivate exact path="/projects" component={Projects} />
                </Switch>
              </Router>
            </Fragment>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
