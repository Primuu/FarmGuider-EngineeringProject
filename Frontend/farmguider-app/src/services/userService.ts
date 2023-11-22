import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {GET_USER_DATA_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";

export const fetchUserData = async (userId: number): Promise<UserResponseDTO> => {
    return await sendHttpRequest<UserResponseDTO>({
        endpointUrl: GET_USER_DATA_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: { userId }
    });
}
