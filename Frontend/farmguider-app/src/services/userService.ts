import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {GET_USER_DATA_URL, UPDATE_USER_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";
import UserUpdateDTO from "@/entities/UserUpdateDTO.ts";

export const fetchUserData = async (userId: number): Promise<UserResponseDTO> => {
    return await sendHttpRequest<UserResponseDTO>({
        endpointUrl: GET_USER_DATA_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: { userId }
    });
}

export const updateUser = async (userId: number, userUpdateDTO: UserUpdateDTO): Promise<UserResponseDTO> => {
    return await sendHttpRequest<UserResponseDTO>({
        endpointUrl: UPDATE_USER_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: { userId },
        body: userUpdateDTO
    });
}
