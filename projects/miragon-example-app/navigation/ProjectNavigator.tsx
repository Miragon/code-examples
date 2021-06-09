import React, {useCallback, useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { useDispatch } from 'react-redux';

import ProjectsOverviewScreen, {screenOptions as projectsOverviewScreenOptions} from '../screens/project/ProjectsOverview';

import * as projectActions from "../store/actions/projects";

import Colors from '../constants/Colors';
import ErrorView from "../components/ErrorView";
import { View } from 'react-native';


const defaultNavOptions = {
    headerTintColor: Colors.primary,
    headerTitleStyle: {
    },
    headerBackTitleStyle: {
        fontSize: 12,
        color: Colors.primary
    },
    headerBackTitle: "Zurück",
};

const ProjectStackNavigator = createStackNavigator();

function ProjectNavigator() {

    return (
        <View style={{flex: 1}}>
            <ProjectStackNavigator.Navigator screenOptions={defaultNavOptions}>
                <ProjectStackNavigator.Screen
                    name="ProjectsOverview"
                    component={ProjectsOverviewScreen}
                    options={projectsOverviewScreenOptions}
                />
            </ProjectStackNavigator.Navigator>
        </View>

    );
}

export default ProjectNavigator;