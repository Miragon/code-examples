import {Configuration, ConfigurationParameters} from "../api";
import getEnvVars from "../environment";
const {apiUrl} = getEnvVars();

const helpers = {
    throwError: function(errorMessage: string) {
        throw new Error(errorMessage);
    },
    getClientConfig: function (token: string) {
        const config: ConfigurationParameters = {
            basePath: apiUrl,
            baseOptions: {
                "headers": {
                    'Authorization': `Bearer ${token}`,
                }
            }
        }

        return new Configuration(config)
    },
}


export default helpers