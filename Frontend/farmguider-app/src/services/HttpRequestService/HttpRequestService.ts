import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "@/constants/API_ENDPOINTS.ts";

export type UrlParams = Record<string, string | string[]>;

export interface RequestConfig {
    endpointUrl: string;
    typeOfRequest: string;
    urlParams?: UrlParams;
    pathParams?: Record<string, string | number>;
    body?: unknown;
}

const constructUrl = (endpointUrl: string, urlParams?: UrlParams, pathParams?: Record<string, string | number>) => {
    let url: string = `${BASE_URL}${endpointUrl || ''}`;

    if (pathParams) {
        Object.entries(pathParams).forEach(([key, value]) => {
            url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
        });
    }

    const urlObj: URL = new URL(url);

    if (urlParams) {
        Object.entries(urlParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => urlObj.searchParams.append(key, v));
            } else {
                urlObj.searchParams.append(key, value);
            }
        });
    }

    return urlObj.toString();
}

const sendHttpRequest = async <T>(requestConfig: RequestConfig): Promise<T> => {
    const { endpointUrl, typeOfRequest, urlParams, pathParams, body } = requestConfig;

    const axiosRequestConfig: AxiosRequestConfig = {
        withCredentials: true,
        method: typeOfRequest,
        url: constructUrl(endpointUrl, urlParams, pathParams),
        data: body
    };
        const response = await axios(axiosRequestConfig);
        return response.data as T;
}

export default sendHttpRequest;