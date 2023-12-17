import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {
    CREATE_MILKING_URL,
    DELETE_MILKING_URL,
    GET_MILKING_CHART_URL,
    GET_MILKINGS_URL,
    UPDATE_MILKING_URL
} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import MilkingResponseDTO from "@/entities/MilkingResponseDTO.ts";
import MilkingCreateDTO from "@/entities/MilkingCreateDTO.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";
import {ChartValueDTO} from "@/entities/ChartValueDTO.ts";

export const createMilking = async (cowId: number, milkingCreateDTO: MilkingCreateDTO): Promise<MilkingResponseDTO> => {
    return await sendHttpRequest<MilkingResponseDTO>({
        endpointUrl: CREATE_MILKING_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {cowId},
        body: milkingCreateDTO
    })
}

export const getMilkings = async (cowId: number): Promise<MilkingResponseDTO[]> => {
    return await sendHttpRequest<MilkingResponseDTO[]>({
        endpointUrl: GET_MILKINGS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {cowId}
    });
}

export const getMilkingChart = async (lactationPeriodId: number): Promise<ChartValueDTO[]> => {
    return await sendHttpRequest<ChartValueDTO[]>({
        endpointUrl: GET_MILKING_CHART_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {lactationPeriodId}
    });
}

export const updateMilking = async (milkingId: number, milkingCreateDTO: MilkingCreateDTO): Promise<MilkingResponseDTO> => {
    return await sendHttpRequest<MilkingResponseDTO>({
        endpointUrl: UPDATE_MILKING_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: {milkingId},
        body: milkingCreateDTO
    })
}

export const deleteMilking = async (milkingId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_MILKING_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {milkingId}
    });
}
