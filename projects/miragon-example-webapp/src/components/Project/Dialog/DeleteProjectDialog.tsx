import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ProjectControllerApi, ProjectTO } from "../../../api";
import { removeProject } from "../../../store/reducers/projects";
import { apiExec, hasFailed } from "../../../util/ApiUtils";
import PopupDialog from "../../Dialog/PopupDialog";
import KeyValueGrid from "../../Data/KeyValueGrid";

interface DeleteProjectDialogProps {
    open: boolean;
    project: ProjectTO | undefined;
    onClosed: (deleted: boolean) => void;
}

/**
 * A dialog to confirm that the selected project should really be deleted.
 */
const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = props => {
    const dispatch = useDispatch();

    const {
        project,
        onClosed,
        open
    } = props;

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string | undefined>();

    /**
     * Perform the deletion of a project after a confirmation is received
     */
    const onDelete = useCallback(async () => {
        if (!project) {
            return;
        }

        setDisabled(true);
        const response = await apiExec(ProjectControllerApi, api => api.deleteProject(project.id));
        setDisabled(false);
        if (hasFailed(response)) {
            setError(response.error.message);
        } else {
            dispatch(removeProject(project.id));
            onClosed(true);
        }
    }, [project, onClosed, dispatch]);

    return (
        <PopupDialog
            open={open}
            disabled={disabled}
            title="Delete Project"
            description="Are you sure to delete the Project?"
            secondary="Cancel"
            onSecondary={() => onClosed(false)}
            primary="Delete"
            onPrimary={onDelete}
            deleteMode
            error={error}
            onCloseError={() => setError(undefined)}>

            <KeyValueGrid
                left
                keyWidth="120px"
                entries={[
                    ["Customer", project?.customer],
                    ["Address", project?.address]
                ]} />

        </PopupDialog>
    );
}

export default DeleteProjectDialog;
