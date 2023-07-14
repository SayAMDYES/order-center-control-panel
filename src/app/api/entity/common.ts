abstract class OrderCenterReqDto {
    protected constructor() {
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

abstract class OrderCenterQueryReqDto extends OrderCenterReqDto {
    currentPage: number;
    pageSize: number;

    protected constructor(currentPage: number, pageSize: number) {
        super();
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }
}

class OrderCenterQueryRespDto<T extends any> extends OrderCenterRespDto<Page<T>> {
    constructor(code: number, message: string, data: Page<T>) {
        super(code, message);
        this.data = data;
    }
}

class Page<T> {
    currentPage: number;
    totalPage: number;
    list: T[];

    constructor(currentPage: number, totalPage: number, list: T[]) {
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.list = list;
    }
}

export {OrderCenterReqDto, OrderCenterRespDto, OrderCenterQueryReqDto, OrderCenterQueryRespDto, Page}