import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CHANGE_PASSWORD_URL, DELETE_ACCOUNT_URL, GET_USER_DATA_URL, UPDATE_USER_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";
import UserUpdateDTO from "@/entities/UserUpdateDTO.ts";
import UserChangePasswordDTO from "@/entities/UserChangePasswordDTO.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";
import UserPasswordDTO from "@/entities/UserPasswordDTO.ts";

export const fetchUserData = async (userId: number): Promise<UserResponseDTO> => {
    return await sendHttpRequest<UserResponseDTO>({
        endpointUrl: GET_USER_DATA_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {userId}
    });
}

export const updateUser = async (userId: number, userUpdateDTO: UserUpdateDTO): Promise<UserResponseDTO> => {
    return await sendHttpRequest<UserResponseDTO>({
        endpointUrl: UPDATE_USER_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: {userId},
        body: userUpdateDTO
    });
}

export const changePassword = async (userChangePasswordDTO: UserChangePasswordDTO): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: CHANGE_PASSWORD_URL,
        typeOfRequest: RequestTypes.PATCH,
        body: userChangePasswordDTO
    });
}

export const deleteAccount = async (userPasswordDTO: UserPasswordDTO): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_ACCOUNT_URL,
        typeOfRequest: RequestTypes.DELETE,
        body: userPasswordDTO
    });
}
