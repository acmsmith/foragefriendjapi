var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
    bearerOnly: true,
    serverUrl: `${process.env.KEYCLOAK_SERVER}`,
    realm: `${process.env.KEYCLOAK_REALM}`,
    realmPublicKey: `${process.env.KEYCLOAK_REALM_PUBLIC_KEY}`,
    credentials: {
        secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`
    }
};

function initKeycloak(app) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        console.log(keycloakConfig);
        var memoryStore = new session.MemoryStore();
        app.use(session({
            secret: 'some secret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore
          }));
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        app.use(_keycloak.middleware());
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};