import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_CROP_URL, GET_CROPS_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {CropCreateDTO} from "@/entities/CropCreateDTO.ts";
import CropResponseDTO from "@/entities/CropResponseDTO.ts";

export const createCrop = async (fieldId: number, cropCreateDTO: CropCreateDTO): Promise<CropResponseDTO> => {
    return await sendHttpRequest<CropResponseDTO>({
        endpointUrl: CREATE_CROP_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {fieldId},
        body: cropCreateDTO
    })
}

export const getCrops = async (fieldId: number): Promise<CropResponseDTO[]> => {
    return await sendHttpRequest<CropResponseDTO[]>({
        endpointUrl: GET_CROPS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {fieldId}
    })
}
