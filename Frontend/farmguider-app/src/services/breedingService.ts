import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {GET_BREEDINGS_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";

export const fetchBreedings = async (farmId: number): Promise<BreedingResponseDTO[]>  => {
    return await sendHttpRequest<BreedingResponseDTO[]>({
        endpointUrl: GET_BREEDINGS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {farmId}
    });
}
