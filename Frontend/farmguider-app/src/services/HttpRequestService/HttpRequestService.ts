import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "@/constants/API_ENDPOINTS.ts";

export type UrlParams = Record<string, string | string[]>;

export interface RequestConfig {
    endpointUrl: string;
    typeOfRequest: string;
    urlParams?: UrlParams;
    body?: unknown;
}

const constructUrl = (endpointUrl: string, urlParams?: UrlParams) => {
    const url = new URL(`${BASE_URL}${endpointUrl || ''}`);

    if (urlParams) {
        Object.entries(urlParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => url.searchParams.append(key, v));
            } else {
                url.searchParams.append(key, value);
            }
        });
    }
    return url.toString();
}

const sendHttpRequest = async <T>(requestConfig: RequestConfig): Promise<T> => {
    const { endpointUrl, typeOfRequest, urlParams, body } = requestConfig;

    const axiosRequestConfig: AxiosRequestConfig = {
        withCredentials: true,
        method: typeOfRequest,
        url: constructUrl(endpointUrl, urlParams),
        data: body
    };
        const response = await axios(axiosRequestConfig);
        return response.data as T;
}

export default sendHttpRequest;