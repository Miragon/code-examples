import { UserInfoModel } from "./UserInfoModel";
export class AuthModel {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    userInfo?: UserInfoModel;
    issuedAt?: number;
    expiresIn?: number;
}