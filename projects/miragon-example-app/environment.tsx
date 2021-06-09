import { Platform } from "react-native";
import Constants from "expo-constants"

const localhost = Platform.OS === "ios" ? "http://localhost:8080" : "http://192.168.179.70:8080";

const ENV = {
    local: {
        apiUrl: localhost,
    },
    test: {
        apiUrl: "https://url-to-dev-env.com"
    },
    prod: {
        apiUrl: "https://url-to-prod-env.com",
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.local;
    } else {
        if(env !== undefined){
            if (env.indexOf('default') !== -1) return ENV.test //iPhone
            if (env.indexOf('test') !== -1) return ENV.test
            if (env.indexOf('prod') !== -1) return ENV.prod
        }
        else {
            throw new Error("Wrong release-channel specified. Please enter 'test' or 'prod'")
        }
    }
    return {apiUrl: ""}
};

export default getEnvVars;