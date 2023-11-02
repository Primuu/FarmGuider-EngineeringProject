import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {AUTHENTICATE_URL, GET_AUTH_DATA_URL, REGISTER_URL} from "@/constants/API_ENDPOINTS.ts";
import UserAuthDTO from "@/entities/UserAuthDTO.ts";
import AuthenticationRequestDTO from "@/entities/AuthenticationRequestDTO.ts";
import UserCreateDTO from "@/entities/UserCreateDTO.ts";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";

export const fetchUserAuthData = async (): Promise<UserAuthDTO> => {
    console.log("fetcher")
    return await sendHttpRequest<UserAuthDTO>({
        endpointUrl: GET_AUTH_DATA_URL,
        typeOfRequest: RequestTypes.GET
    });
}

export const authenticate = async (authenticationRequestDTO: AuthenticationRequestDTO): Promise<string> => {
    console.log("authenticate")
    return await sendHttpRequest<string>({
        endpointUrl: AUTHENTICATE_URL,
        typeOfRequest: RequestTypes.POST,
        body: authenticationRequestDTO
    });
}

export const register = async (userCreateDTO: UserCreateDTO): Promise<UserResponseDTO> => {
    console.log("register")
    return await sendHttpRequest<UserResponseDTO>({
        endpointUrl: REGISTER_URL,
        typeOfRequest: RequestTypes.POST,
        body: userCreateDTO
    });
}