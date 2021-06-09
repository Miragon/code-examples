import { AxiosResponse } from "axios";
import { AuthSessionResult } from "expo-auth-session";
import {AuthModel} from "./AuthModel";

export interface ApiErrorDetails {
    authModel?: AuthModel,
    axiosResponse?: AxiosResponse | AuthSessionResult,
    requestModel?: {}
}

class ApiError {
    constructor(
        public errorMessage: string,
        public details: ApiErrorDetails,
    ) {
    }

    getUserError() {
        if (this.errorMessage === "502" || "400"){
            return "Ups. Da ist etwas schief gelaufen. 🤭 \nWir beheben den Fehler so schnell wie möglich. 🛠 "
        }
        else if (this.errorMessage === "Network request failed"){
            return "Der Service konnte nicht erreicht werden. Prüfe deine Internetverbindung und versuche es erneut."
        }
    }
}

export default ApiError