import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {
    CREATE_WEIGHT_GAIN_URL,
    DELETE_WEIGHT_GAIN_URL,
    GET_WEIGHT_GAIN_CHART_URL,
    GET_WEIGHT_GAINS_URL,
    UPDATE_WEIGHT_GAIN_URL
} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import WeightGainCreateDTO from "@/entities/WeightGainCreateDTO.ts";
import WeightGainResponseDTO from "@/entities/WeightGainResponseDTO.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";
import {ChartValueDTO} from "@/entities/ChartValueDTO.ts";

export const createWeightGain = async (cowId: number, weightGainCreateDTO: WeightGainCreateDTO): Promise<WeightGainResponseDTO> => {
    return await sendHttpRequest<WeightGainResponseDTO>({
        endpointUrl: CREATE_WEIGHT_GAIN_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {cowId},
        body: weightGainCreateDTO
    })
}

export const getWeightGains = async (cowId: number): Promise<WeightGainResponseDTO[]> => {
    return await sendHttpRequest<WeightGainResponseDTO[]>({
        endpointUrl: GET_WEIGHT_GAINS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {cowId}
    });
}

export const getWeightGainChart = async (cowId: number): Promise<ChartValueDTO[]> => {
    return await sendHttpRequest<ChartValueDTO[]>({
        endpointUrl: GET_WEIGHT_GAIN_CHART_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {cowId}
    });
}

export const updateWeightGain = async (weightGainId: number, weightGainCreateDTO: WeightGainCreateDTO): Promise<WeightGainResponseDTO> => {
    return await sendHttpRequest<WeightGainResponseDTO>({
        endpointUrl: UPDATE_WEIGHT_GAIN_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: {weightGainId},
        body: weightGainCreateDTO
    })
}

export const deleteWeightGain = async (weightGainId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_WEIGHT_GAIN_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {weightGainId}
    });
}
