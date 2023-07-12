import {OrderCenterReqDto, OrderCenterRespDto} from "@/app/api/entity/common";

class CommodityDto {
    id: number;
    name: string;
    realPrice: number;
    price?: number;
    description?: string;
    image?: string;
    stock?: number;
    sellChannel: number[];
    status: number;
    createTime: string;
    updateTime?: string;

    constructor(id: number,
                name: string,
                realPrice: number,
                price?: number,
                description?: string,
                image?: string,
                stock?: number,
                sellChannel?: number[],
                // @ts-ignore
                status: number,
                createTime: string,
                updateTime?: string) {
        this.id = id;
        this.name = name;
        this.realPrice = realPrice;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stock = stock;
        this.sellChannel = sellChannel ? sellChannel : [];
        this.status = status;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

class CommodityCreateReqDto implements OrderCenterReqDto {
    name: string;
    realPrice: number;
    price?: number;
    description?: string;
    image?: string;
    stock?: number;
    sellChannel: number[];

    constructor(name: string,
                realPrice: number,
                price?: number,
                description?: string,
                image?: string,
                stock?: number,
                sellChannel?: number[]) {
        this.name = name;
        this.realPrice = realPrice;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stock = stock;
        this.sellChannel = sellChannel ? sellChannel : [];
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
                realPrice: number,
                price: number,
                description: string,
                image: string,
                stock: number,
                sellChannel: number[]) {
        super(name, realPrice, price, description, image, stock, sellChannel);
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

export {CommodityCreateReqDto, CommodityUpdateReqDto}