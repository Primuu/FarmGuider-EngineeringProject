import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_MILKING_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import MilkingResponseDTO from "@/entities/MilkingResponseDTO.ts";
import MilkingCreateDTO from "@/entities/MilkingCreateDTO.ts";

export const createMilking = async (cowId: number, milkingCreateDTO: MilkingCreateDTO): Promise<MilkingResponseDTO> => {
    return await sendHttpRequest<MilkingResponseDTO>({
        endpointUrl: CREATE_MILKING_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {cowId},
        body: milkingCreateDTO
    })
}
