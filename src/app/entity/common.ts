interface OrderCenterReqDto<T extends any> {
}

interface OrderCenterRespDto<T extends any> {
    code: number;
    msg: string;
    data: T;
}