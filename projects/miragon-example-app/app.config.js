import app_config from "./app.json"

export default  {
    ...app_config.expo,
    extra: {
        auth0ClientId: process.env.AUTH0_CLIENT_ID,
        auth0Domain: process.env.AUTH0_DOMAIN,
    },
};