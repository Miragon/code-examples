import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';

import ProjectItem from "./items/ProjectItem";
import * as projectActions from "../../store/actions/projects";
import Styles from '../../constants/Styles';
import {RootState} from "../../store/reducers/rootReducer";
import ErrorView from "../../components/ErrorView";
import {ProjectTO} from "../../api/models";

const ProjectsOverview = ({ navigation }:StackScreenProps<{Profile: any}>) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const projects: Array<ProjectTO> = useSelector((state: RootState) => state.projects.allProjects)

    const fetchProjectsAndJobs = useCallback( () => {
        try{
            setIsLoading(true)
            dispatch(projectActions.fetchProjects())
        } catch (err){
            throw new Error(err)
        }
        setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        return navigation.addListener('focus', fetchProjectsAndJobs)
    }, [dispatch, fetchProjectsAndJobs])

    if (isLoading){
        return (
            <View style={Styles.centered}>
                <ActivityIndicator animating={true}/>
            </View>
        )
    } else {
        return (
            <View style={styles.projectContainer}>
                <FlatList
                    data={projects}
                    renderItem={({ item }: { item: ProjectTO }) =>
                        <ProjectItem
                            key={item.id}
                            project={item}
                            onViewDetail={() => {}}
                        />
                    }
                />

                <ErrorView retryMethod={fetchProjectsAndJobs}/>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    projectContainer: {
        marginTop: 5
    }
})


export const screenOptions = () => {
    return {
        headerTitle: 'Projekte'
    };
};

export default ProjectsOverview;

