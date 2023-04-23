# foragefriendjapi
API to manage forage information in a database<br>

Clone this project and install:<br>
`npm install`<br>

run the server with `npm run start`<br>

run the server with nodemon: `npm run server`<br>

## Environmental Variables
Several environmental variables are required in the root/.env file. Create this file if it doesn't already exist.<br>
The following example is for nodejs server running on localhost:3000, a keycloak auth server running on localhost:8080 and a mongodb running on localhost:27017:<br>

DATABASE_URL=mongodb://localhost:27017/dbname<br>
ROOT_SERVER=http://localhost:3000<br>
PORT=3000<br>
REDIRECT_URI=/version<br>
KEYCLOAK_AUTH_ENDPOINT=http://localhost:8080/realms/foragefriend/protocol/openid-connect/auth<br>
KEYCLOAK_TOKEN_ENDPOINT=http://localhost:8080/realms/foragefriend/protocol/openid-connect/token<br>
KEYCLOAK_LOGOUT_ENDPOINT=http://localhost:8080/realms/foragefriend/protocol/openid-connect/logout<br>
KEYCLOAK_CLIENT_SECRET=<realm_public_key_from_keycloak><br>
KEYCLOAK_CLIENT_ID=<client_id_from_keycloak><br>
KEYCLOAK_REALM_PUBLIC_KEY=<realm_public_key_from_keycloak><br>
KEYCLOAK_SERVER=http://localhost:8080<br>
KEYCLOAK_REALM=<realm_name_from_keycloak><br>
