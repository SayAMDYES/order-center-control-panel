import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {OrderCenterRespDto} from "@/app/api/entity/common";

interface RequestConfig extends AxiosRequestConfig {
    showLoading?: boolean;
}

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
});

instance.interceptors.request.use(
    // @ts-ignore
    (config: RequestConfig) => {
        if (config.showLoading) {
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

class Http {
    static get<T>(url: string, config?: RequestConfig): Promise<T> {
        // @ts-ignore
        return instance.get<OrderCenterRespDto<T>>(url, config).then((res) => {
            return res;
        });
    }

    static post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        // @ts-ignore
        return instance.post<OrderCenterRespDto<T>>(url, data, config).then((res) => {
            return res;
        });
    }
}

export default Http;
