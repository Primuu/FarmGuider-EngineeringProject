import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {GET_COW_SUMMARY_URL, GET_FIELD_SUMMARY_URL, GET_MILKING_SUMMARY_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {CowSummaryDTO} from "@/entities/CowSummaryDTO.ts";
import {MilkingSummaryDTO} from "@/entities/MilkingSummaryDTO.ts";
import {FieldSummaryDTO} from "@/entities/FieldSummaryDTO.ts";

export const getCowSummary = async (farmId: number): Promise<CowSummaryDTO> => {
    return await sendHttpRequest<CowSummaryDTO>({
        endpointUrl: GET_COW_SUMMARY_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {farmId}
    })
}

export const getMilkingSummary = async (farmId: number): Promise<MilkingSummaryDTO> => {
    return await sendHttpRequest<MilkingSummaryDTO>({
        endpointUrl: GET_MILKING_SUMMARY_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {farmId}
    })
}

export const getFieldSummary = async (farmId: number): Promise<FieldSummaryDTO[]> => {
    return await sendHttpRequest<FieldSummaryDTO[]>({
        endpointUrl: GET_FIELD_SUMMARY_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {farmId}
    })
}
