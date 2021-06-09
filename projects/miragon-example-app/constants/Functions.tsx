import getEnvVars from "../environment";
const {apiUrl} = getEnvVars();

const helpers = {
    throwError: function(errorMessage: string) {
        throw new Error(errorMessage);
    },
    getClientConfig: function(token: string) {
        return {
            basePath: apiUrl,
                baseOptions: {
                    "headers": {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            }
    }
}


export default helpers