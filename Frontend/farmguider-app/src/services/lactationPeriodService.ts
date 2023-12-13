import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_LACTATION_PERIOD_URL, DELETE_LACTATION_PERIOD_URL, GET_LACTATION_PERIODS_URL, UPDATE_LACTATION_PERIOD_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import LactationPeriodCreateDTO from "@/entities/LactationPeriodCreateDTO.ts";
import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";

export const createLactationPeriod = async (cowId: number, lactationPeriodCreateDTO: LactationPeriodCreateDTO): Promise<LactationPeriodResponseDTO> => {
    return await sendHttpRequest<LactationPeriodResponseDTO>({
        endpointUrl: CREATE_LACTATION_PERIOD_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {cowId},
        body: lactationPeriodCreateDTO
    })
}

export const getLactationPeriods = async (cowId: number): Promise<LactationPeriodResponseDTO[]> => {
    return await sendHttpRequest<LactationPeriodResponseDTO[]>({
        endpointUrl: GET_LACTATION_PERIODS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {cowId}
    });
}

export const updateLactationPeriod = async (lactationPeriodId: number, lactationPeriodCreateDTO: LactationPeriodCreateDTO): Promise<LactationPeriodResponseDTO> => {
    return await sendHttpRequest<LactationPeriodResponseDTO>({
        endpointUrl: UPDATE_LACTATION_PERIOD_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: {lactationPeriodId},
        body: lactationPeriodCreateDTO
    })
}

export const deleteLactationPeriod = async (lactationPeriodId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_LACTATION_PERIOD_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {lactationPeriodId}
    })
}
