import React from "react";
import {Route, Switch} from "react-router-dom";
import ProjectOverviewPage from "../../Sites/Project/ProjectOverviewPage"

const Router: React.FC = () => {
    return (
        <Switch>
            <Route
                exact path="/"
                component={ProjectOverviewPage}/>

            <Route
                exact path="/projects"
                component={ProjectOverviewPage}/>

        </Switch>
    );
};

export default Router;
