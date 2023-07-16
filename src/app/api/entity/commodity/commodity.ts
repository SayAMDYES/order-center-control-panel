import {
    OrderCenterQueryReqDto,
    OrderCenterQueryRespDto,
    OrderCenterReqDto,
    OrderCenterRespDto
} from "@/app/api/entity/common";

class CommodityDto {
    id: number;
    name: string;
    price?: number;
    description?: string;
    image?: string;
    stock?: number;
    deliveryType: number[];
    status: number;
    createTime: string;
    updateTime?: string;

    constructor(id: number,
                name: string,
                price?: number,
                description?: string,
                image?: string,
                stock?: number,
                deliveryType?: number[],
                // @ts-ignore
                status: number,
                createTime: string,
                updateTime?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stock = stock;
        this.deliveryType = deliveryType ? deliveryType : [];
        this.status = status;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

class CommodityCreateReqDto implements OrderCenterReqDto {
    name: string;
    price?: number;
    description?: string;
    image?: string;
    stock: number;
    deliveryType: number[];
    status: number;

    constructor(name: string,
                price?: number,
                description?: string,
                image?: string,
                stock?: number,
                deliveryType?: number[],
                status?: number) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stock = stock ? stock : 0;
        this.deliveryType = deliveryType ? deliveryType : [];
        this.status = status ? status : 0;
    }
}

class CommodityCreateRespDto extends OrderCenterRespDto<CommodityDto> {
    constructor(code: number, message: string, data?: CommodityDto) {
        super(code, message, data);
    }
}

class CommodityUpdateReqDto extends CommodityCreateReqDto {
    id: number;
    status: number;

    constructor(id: number,
                status: number,
                name: string,
                price: number,
                description: string,
                image: string,
                stock: number,
                deliveryType: number[]) {
        super(name, price, description, image, stock, deliveryType);
        this.id = id;
        this.status = status;
    }
}

class CommodityUpdateRespDto extends OrderCenterRespDto<CommodityDto> {
}

class CommodityDeleteReqDto extends OrderCenterReqDto {
    id: number;

    constructor(id: number) {
        super();
        this.id = id;
    }
}

class CommodityDeleteRespDto extends OrderCenterRespDto<null> {
}

class CommodityQueryReqDto extends OrderCenterQueryReqDto {
    name: string | null;
    deliveryType: number | null;
    status: number | null;
    createTime: string[] | null;

    constructor(currentPage: number, pageSize: number, name?: string, deliveryType?: number, status?: number, createTime?: string[]) {
        super(currentPage, pageSize);
        this.name = name ? name : null;
        this.deliveryType = deliveryType ? deliveryType : null;
        this.status = status ? status : null;
        this.createTime = createTime ? createTime : [];
    }
}

class CommodityQueryRespDto extends OrderCenterQueryRespDto<CommodityDto> {
}

export {
    CommodityDto,
    CommodityCreateReqDto,
    CommodityCreateRespDto,
    CommodityUpdateReqDto,
    CommodityUpdateRespDto,
    CommodityDeleteReqDto,
    CommodityDeleteRespDto,
    CommodityQueryReqDto,
    CommodityQueryRespDto,
}