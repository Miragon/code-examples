import React, {useState, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';

import ProjectItem from "./items/ProjectItem";
import ErrorView from "../../components/ErrorView";
import {ProjectTO} from "../../api";
import { fetchProjects } from "../../store/reducers/projects";
import {RootState} from "../../store/reducers/Store";
import { ApiError } from '../../models/apiError';
import { useEffect } from 'react';

const ProjectsOverview = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const projects = useSelector((state: RootState) => state.projects)
    const [error, setError] = useState<ApiError | undefined>(projects.error)


    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const refresh = useCallback(async () => {
        setIsLoading(true)
        await dispatch(fetchProjects())
        setIsLoading(false)
    }, [dispatch])


    return (
        <View style={styles.projectContainer}>
            <FlatList
                data={projects.value}
                onRefresh={refresh}
                refreshing={isLoading}
                renderItem={({item}: { item: ProjectTO }) =>
                    <ProjectItem
                        key={item.id}
                        project={item}
                        onViewDetail={() => {}}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyListView}>
                        <Text>No Projects found. Please create some using the web app.</Text>
                        <Text>Pull down to refresh.</Text>
                    </View>
                }
            />

            <ErrorView retryMethod={refresh} error={error} setError={setError}/>
        </View>
    )

}


const styles = StyleSheet.create({
    projectContainer: {
        marginTop: 5,
        flex: 1
    },
    emptyListView: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30
    }
})


export const screenOptions = ({navigation}) => {
    return {
        headerTitle: 'Projects'
    };
};

export default ProjectsOverview;

