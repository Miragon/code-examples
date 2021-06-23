import React from "react";
import {Route, Switch} from "react-router-dom";

import ProjectOverviewPage from "../../sites/Project/ProjectOverviewPage"
import ProjectEditPage from "../../sites/Project/ProjectEditPage"
import ProjectAddPage from "../../sites/Project/ProjectAddPage";

const Router: React.FC = () => {
    return (
        <Switch>
            <Route
                exact path="/"
                component={ProjectOverviewPage}/>

            <Route
                exact path="/projects"
                component={ProjectOverviewPage}/>

            <Route
                exact path="/projectEdit/:projectId"
                component={ProjectEditPage}/>

            <Route
                exact path="/projectAdd"
                component={ProjectAddPage}/>

        </Switch>
    );
};

export default Router;
