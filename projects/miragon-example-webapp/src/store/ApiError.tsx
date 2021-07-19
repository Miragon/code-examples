import {AxiosResponse} from "axios";

import {AuthModel} from "./AuthModel";

export interface ApiErrorDetails {
    authModel?: AuthModel,
    axiosResponse?: AxiosResponse,
    requestModel?: unknown//{}
}

class ApiError {

    errorMessage: string;
    details: ApiErrorDetails;

    constructor(errorMessage: string, details: ApiErrorDetails) {
        this.errorMessage = errorMessage;
        this.details = details;
    }

    getUserError(): string {
        if (this.errorMessage === "502" || "400") {
            return "Ups. Da ist etwas schief gelaufen. 🤭 \nWir beheben den Fehler so schnell wie möglich."
        } else if (this.errorMessage === "Network request failed") {
            return "Der Service konnte nicht erreicht werden. Prüfe deine Internetverbindung und versuche es erneut."
        } else {
            return "Es ist ein unbekannter Fehler aufgetreten";
        }
    }
}

export default ApiError