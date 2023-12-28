import sendHttpRequest, {mapToUrlParams} from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_FIELD_URL, DELETE_FIELD_URL, GET_FIELD_URL, GET_FIELDS_URL, UPDATE_FIELD_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import FieldCreateDTO from "@/entities/FieldCreateDTO.ts";
import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import FieldSearchParams from "@/entities/FieldSearchParams.ts";
import ResponseMessage from "@/entities/ResponseMessage.ts";

export const createField = async (farmId: number, fieldCreateDTO: FieldCreateDTO): Promise<FieldResponseDTO> => {
    return await sendHttpRequest<FieldResponseDTO>({
        endpointUrl: CREATE_FIELD_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {farmId},
        body: fieldCreateDTO
    })
}

export const getFields = async (farmId: number, fieldSearchParams: FieldSearchParams): Promise<FieldResponseDTO[]> => {
    return await sendHttpRequest<FieldResponseDTO[]>({
        endpointUrl: GET_FIELDS_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {farmId},
        urlParams: mapToUrlParams(fieldSearchParams as Partial<Record<string, unknown>>)
    })
}

export const getField = async (fieldId: number): Promise<FieldResponseDTO> => {
    return await sendHttpRequest<FieldResponseDTO>({
        endpointUrl: GET_FIELD_URL,
        typeOfRequest: RequestTypes.GET,
        pathParams: {fieldId},
    })
}

export const updateField = async (fieldId: number, fieldCreateDTO: FieldCreateDTO): Promise<FieldResponseDTO> => {
    return await sendHttpRequest<FieldResponseDTO>({
        endpointUrl: UPDATE_FIELD_URL,
        typeOfRequest: RequestTypes.PUT,
        pathParams: {fieldId},
        body: fieldCreateDTO
    })
}

export const deleteField = async (fieldId: number): Promise<ResponseMessage> => {
    return await sendHttpRequest<ResponseMessage>({
        endpointUrl: DELETE_FIELD_URL,
        typeOfRequest: RequestTypes.DELETE,
        pathParams: {fieldId}
    })
}
