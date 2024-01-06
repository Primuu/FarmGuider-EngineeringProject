import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {GET_COW_SUMMARY_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {CowSummaryDTO} from "@/entities/CowSummaryDTO.ts";

export const getCowSummary = async (farmId: number): Promise<CowSummaryDTO> => {
    return await sendHttpRequest<CowSummaryDTO>({
        endpointUrl: GET_COW_SUMMARY_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {farmId}
    })
}
