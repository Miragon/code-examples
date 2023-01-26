package io.miragon.example.base.project;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.miragon.example.base.project.adapter.in.web.CreateProjectTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(profiles = {"test"})
@AutoConfigureMockMvc
class ProjectSystemTest {

    @Autowired
    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testCreateProject() throws Exception {
        final String customer = "testCustomer";
        final String address = "Sample Address 1234";

        final CreateProjectTO project = new CreateProjectTO(customer, address);
        this.mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(this.objectMapper.writeValueAsString(project)))
                .andExpect(status().isOk());

        this.mockMvc.perform(get("/api/project/" + customer))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", is(notNullValue())))
                .andExpect(jsonPath("$[0].customer", is(customer)))
                .andExpect(jsonPath("$[0].address", is(address)));
    }

}
