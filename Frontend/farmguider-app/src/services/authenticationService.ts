import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {
    AUTHENTICATE_URL,
    CHANGE_PASSWORD_URL,
    GET_AUTH_DATA_URL,
    REGISTER_URL,
    REVOKE_URL
} from "@/constants/API_ENDPOINTS.ts";
import UserAuthDTO from "@/entities/UserAuthDTO.ts";
import AuthenticationRequestDTO from "@/entities/AuthenticationRequestDTO.ts";
import UserCreateDTO from "@/entities/UserCreateDTO.ts";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";
import UserChangePasswordDTO from "@/entities/UserChangePasswordDTO.ts";

export const fetchUserAuthData = async (): Promise<UserAuthDTO> => {
    return await sendHttpRequest<UserAuthDTO>({
        endpointUrl: GET_AUTH_DATA_URL,
        typeOfRequest: RequestTypes.GET
    });
}

export const authenticate = async (authenticationRequestDTO: AuthenticationRequestDTO): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: AUTHENTICATE_URL,
        typeOfRequest: RequestTypes.POST,
        body: authenticationRequestDTO
    });
}

export const register = async (userCreateDTO: UserCreateDTO): Promise<UserResponseDTO> => {
    return await sendHttpRequest<UserResponseDTO>({
        endpointUrl: REGISTER_URL,
        typeOfRequest: RequestTypes.POST,
        body: userCreateDTO
    });
}

export const revoke = async (): Promise<ResponseMessage>  => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: REVOKE_URL,
        typeOfRequest: RequestTypes.DELETE
    });
}

export const changePassword = async (userChangePasswordDTO: UserChangePasswordDTO): Promise<ResponseMessage>  => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: CHANGE_PASSWORD_URL,
        typeOfRequest: RequestTypes.PATCH,
        body: userChangePasswordDTO
    });
}