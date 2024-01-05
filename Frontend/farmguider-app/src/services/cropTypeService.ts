import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {GET_CROP_TYPES_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {CropTypeResponseDTO} from "@/entities/CropTypeResponseDTO.ts";

export const getCropTypes = async (): Promise<CropTypeResponseDTO[]> => {
    return await sendHttpRequest<CropTypeResponseDTO[]>({
        endpointUrl: GET_CROP_TYPES_URL,
        typeOfRequest: RequestTypes.GET
    })
}
