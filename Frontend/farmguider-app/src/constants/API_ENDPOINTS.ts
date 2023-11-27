export const BASE_URL: string = "http://localhost:8080";

// Authentication
export const REGISTER_URL: string = "/register";
export const AUTHENTICATE_URL: string = "/authenticate";
export const REVOKE_URL: string = "/revoke";
export const GET_AUTH_DATA_URL: string = "/auth-data";

// User
export const GET_USER_DATA_URL: string = "/user/{userId}";
export const UPDATE_USER_URL: string = "/user/update/{userId}";
export const CHANGE_PASSWORD_URL: string = "/user/change-password";
export const DELETE_ACCOUNT_URL: string = "/user/delete-account";