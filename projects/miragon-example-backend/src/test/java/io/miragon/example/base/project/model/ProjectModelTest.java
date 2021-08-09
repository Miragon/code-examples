package io.miragon.example.base.project.model;

import io.miragon.example.base.project.domain.model.NewProject;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.domain.model.UpdateProject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@DisplayName("Project Model")
public class ProjectModelTest {

    private final String CUSTOMER = "UHU AG";
    private final String ADDRESS = "The Street 123";

    private final String NEW_CUSTOMER = "KUKA AG";
    private final String NEW_ADDRESS = "The Street 123";

    @Test
    @DisplayName("Create new project")
    public void createNewProject() {
        final Project newProject = new Project(new NewProject(this.CUSTOMER, this.ADDRESS));
        assertNull(newProject.getId());
        assertEquals(this.CUSTOMER, newProject.getCustomer());
        assertEquals(this.ADDRESS, newProject.getAddress());
    }

    @Test
    @DisplayName("Update existing project")
    public void updateProject() {
        final Project existingProject = new Project(new NewProject(this.CUSTOMER, this.ADDRESS));
        existingProject.updateProject(new UpdateProject(this.NEW_CUSTOMER, this.NEW_ADDRESS));
        assertEquals(this.NEW_CUSTOMER, existingProject.getCustomer());
        assertEquals(this.NEW_ADDRESS, existingProject.getAddress());
    }

}
