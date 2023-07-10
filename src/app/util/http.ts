import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

interface RequestConfig extends AxiosRequestConfig {
    showLoading?: boolean;
}

const instance: AxiosInstance = axios.create({
    baseURL: 'https://www.baidu.com',
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
        return instance.get<OrderCenterRespDto<T>>(url, config).then((res) => {
            if (res.data.code !== 0) {
                return Promise.reject(res.data.msg);
            }
            return res.data.data;
        });
    }

    static post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return instance.post<OrderCenterRespDto<T>>(url, data, config).then((res) => {
            if (res.data.code !== 0) {
                return Promise.reject(res.data.msg);
            }
            return res.data.data;
        });
    }
}

export default Http;
