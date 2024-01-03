import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {ADD_HARVEST_URL, CREATE_CROP_URL, DELETE_CROP_URL, GET_CROPS_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import {CropCreateDTO} from "@/entities/CropCreateDTO.ts";
import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";
import {HarvestCreateDTO} from "@/entities/HarvestCreateDTO.ts";

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

export const addHarvest = async (cropId: number, harvestCreateDTO: HarvestCreateDTO): Promise<CropResponseDTO> => {
    return await sendHttpRequest<CropResponseDTO>({
        endpointUrl: ADD_HARVEST_URL,
        typeOfRequest: RequestTypes.PATCH,
        pathParams: {cropId},
        body: harvestCreateDTO
    })
}

export const deleteCrop = async (cropId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_CROP_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {cropId}
    });
}
