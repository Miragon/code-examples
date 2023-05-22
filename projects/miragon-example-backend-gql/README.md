# Miragon Example Backend - GraphQL
Miragon is your best choice for process automation projects. The Startup based in Augsburg is specialised in Software Development using the Camunda Process Engine and provides professional IT expertise. Visit our website: https://www.miragon.io/ </br>

This project is part of our blog post series, in which we show how to implement various challenging requirements with the highest code quality.

## 1. Project structure
This backend application does basically the same as [this project of our blog post series](https://github.com/Miragon/code-examples/tree/main/projects/miragon-example-backend), but it uses GraphQL instead of REST. The application is supposed to show how Spring integrates with GraphQL and how advantages like selective querying or subscriptions can be implemented.
It allows managing projects, which represent an object containing a customerId name and an adress. You can also manage customers, which represent an object containing a name. The application demonstrates how one GraphQL Query can access multiple resources by querying a customer with his corresponding projects.

### 1.1 Domain 'project'
We are separating our domains always according the different layers an object representation has to go through:
- **api**: Layer of the transport object (TO). We'll receive the object in a json format at our published mutation-function (defined in the schema) and map it to an internal representation (in the controller).
- **domain**: Core Layer using internal object representation. Used for communication with external services, notifying clients, sending object to local database, ... .
- **infrastructure**: Layer for storing the object entities. Its repositories provide a mechanism for the communication with the database, called Java Persistence API (JPA).

### 1.2 Shared functionality
The `shared` package contains cross domain functionality:
- **Security**: Using JSON Web Token (JWT) in combination with Auth0 to secure the endpoints.
- **Api-Docu**: Swagger provides our api-doku at: http://localhost:8081/swagger-ui.html

## 2. Running this project
The Project uses an in Memory Database, which can be used to store and manipulate data during the session. You can test the api with the [GraphiQL](http://localhost:8081/graphiql) interface.
```

### 2.1 NoSecurity profile
To run this project in development mode use the Spring Boot noSecurity profile: </br>
In intelliJ -> Edit Configurations... -> Active Profile: "no-security"

### 2.2 Using Auth0
1. Visit https://auth0.com and create an account (basic functionality is free)
1. Create a tenant and get its domain: f.ex. `miragon-example-tenant.eu.auth0.com`
1. Ether set your auth0-domain in application-properties like
   ```
   spring.security.oauth2.resourceserver.jwt.issuer-uri=https://miragon-example-tenant.eu.auth0.com/
   ```
   or overwrite this variable in your RunConfigurations
1. In Auth0: Go to Applications -> APIs -> Test and click on "Create Test Application". You can now use the request to get a valid token via Postman.
1. Use the token for requests against this API. The following example was exported from Postman:
    ```
   curl --location --request POST 'http://localhost:8080/api/project' \
    --header 'accept: */*' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGc.....' \
    --data-raw '{"customer":"Grandma Uschi","address":"Spitalgasse 15, 86150 Augsburg"}'
   ```
