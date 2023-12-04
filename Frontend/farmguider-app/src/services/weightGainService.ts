import sendHttpRequest from "@/services/HttpRequestService/HttpRequestService.ts";
import {CREATE_WEIGHT_GAIN_URL} from "@/constants/API_ENDPOINTS.ts";
import RequestTypes from "@/services/HttpRequestService/RequestTypes.ts";
import WeightGainCreateDTO from "@/entities/WeightGainCreateDTO.ts";
import WeightGainResponseDTO from "@/entities/WeightGainResponseDTO.ts";

export const createWeightGain = async (cowId: number, weightGainCreateDTO: WeightGainCreateDTO): Promise<WeightGainResponseDTO> => {
    return await sendHttpRequest<WeightGainResponseDTO>({
        endpointUrl: CREATE_WEIGHT_GAIN_URL,
        typeOfRequest: RequestTypes.POST,
        pathParams: {cowId},
        body: weightGainCreateDTO
    })
}
