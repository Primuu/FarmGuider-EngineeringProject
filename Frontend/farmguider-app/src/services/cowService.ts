import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_COW_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import CowCreateDTO from "@/entities/CowCreateDTO.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";

export const createCow = async (breedingId: number, cowCreateDTO: CowCreateDTO): Promise<CowResponseDTO> => {
    return await sendHttpRequest<CowResponseDTO>({
        endpointUrl: CREATE_COW_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {breedingId},
        body: cowCreateDTO
    })
}