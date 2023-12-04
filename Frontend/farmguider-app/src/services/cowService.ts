import sendHttpRequest, {mapToUrlParams} from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_COW_URL, DELETE_COW_URL, GET_COWS_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import CowCreateDTO from "@/entities/CowCreateDTO.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import CowSearchParams from "@/entities/CowSearchParams.ts";
import Page from "@/entities/Page.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";

export const createCow = async (breedingId: number, cowCreateDTO: CowCreateDTO): Promise<CowResponseDTO> => {
    return await sendHttpRequest<CowResponseDTO>({
        endpointUrl: CREATE_COW_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {breedingId},
        body: cowCreateDTO
    })
}

export const getCows = async (breedingId: number, cowSearchParams: CowSearchParams): Promise<Page<CowResponseDTO>> => {
    return await sendHttpRequest<Page<CowResponseDTO>>({
        endpointUrl: GET_COWS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {breedingId},
        urlParams: mapToUrlParams(cowSearchParams as Partial<Record<string, unknown>>)
    })
}

export const deleteCow = async (cowId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_COW_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {cowId}
    })
}