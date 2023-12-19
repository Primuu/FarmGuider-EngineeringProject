import sendHttpRequest, {mapToUrlParams} from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_FIELD_URL, GET_FIELDS_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import FieldCreateDTO from "@/entities/FieldCreateDTO.ts";
import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import FieldSearchParams from "@/entities/FieldSearchParams.ts";

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
