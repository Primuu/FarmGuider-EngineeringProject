import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {GET_AUTH_DATA_URL} from "@/constants/API_ENDPOINTS.ts";
import UserAuthDTO from "@/entities/UserAuthDTO.ts";

export const fetchUserAuthData = async (): Promise<UserAuthDTO> => {
    return await sendHttpRequest<UserAuthDTO>({
        endpointUrl: GET_AUTH_DATA_URL,
        typeOfRequest: RequestTypes.GET
    });
}