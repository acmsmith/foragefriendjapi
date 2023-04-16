var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'foragefriendapi',
    bearerOnly: true,
    serverUrl: 'https://foragefriendauth.azurewebsites.net',
    realm: 'foragefriend',
    realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh5wdPgHMbql+pIuPz4MldrK8hgTwMPBOVwVSKP0NxFIABf4Fzpm+7lEC05wCeG5+SZPtwazed+4nvkcJG+Q8PGIShzldrjZQlrrpyYFuZZ4D+zA4vXl4SUr9VXpS7twn/N0cAM0XstC5wjzdcsHx1CzdBK8HonRWc55Ap+fvVtlKDSdAXuormjWN+DSxh4HqBaHYgNIxyW68/auuFrTcy+3o5pFL667HCSD47ji/Ry8V5kReS+gAccmTTMXRlDireSZDStZ+4pqlbbilDUo1cxr/4tlILzsAl9tb55vcil1f0DnGyceBzPhx46GoTksCk0tuI3FrS/aSksnZCjjCCwIDAQAB',
    credentials: {
        secret: `${process.env.KEYCOAK_CLIENT_SECRET}`
    }
};

function initKeycloak(app) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        app.use(session({
            secret: 'some secret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore
          }));
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        app.use(_keycloak.middleware({ logout: '/logout' }));
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