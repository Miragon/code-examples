# Miragon Example Project
Miragon is your best choice for process automation projects. The Startup based in Augsburg is specialised in Software Development using the Camunda Process Engine and provides professional IT expertise. Visit our website: https://www.flowsquad.io/ </br>

This project is part of our blog post series, in which we show how to implement various challenging requirements with the highest code quality.

## 1. Project structure
This backend application allows managing projects, which represent an object containing the customers name and his address. 
Using the APIs endpoints, a client is able to create, read, update and delete (CRUD) his projects.

### 1.1 Domain 'project'
We are separating our domains always according the different layers an object representation has to go through:
- **api**: Layer of the transport object (TO). We'll receive the object in a json format at our published resource (the controller) and map it to an internal representation.
- **domain**: Core Layer using internal object representation. Used for communication with external services, notifying clients, sending object to local database, ... .
- **infrastructure**: Layer for storing the object entities. Its repositories provide a mechanism for the communication with the database, called Java Persistence API (JPA).

### 1.2 Shared functionality
- **Exception Handling**: 
- **Security**:


## 2. Running this project