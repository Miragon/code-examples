import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import ProjectsOverviewScreen, {screenOptions as projectsOverviewScreenOptions} from '../screens/project/ProjectsOverview';


import Colors from '../constants/Colors';
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