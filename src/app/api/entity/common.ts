class OrderCenterReqDto {
    constructor() {
    }
}

class OrderCenterRespDto<T extends any> {
    code: number;
    message: string;
    data?: T;

    constructor(code: number, message: string, data?: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

export {OrderCenterReqDto, OrderCenterRespDto}