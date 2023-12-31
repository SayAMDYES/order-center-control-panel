import {
    OrderCenterQueryReqDto,
    OrderCenterQueryRespDto,
    OrderCenterReqDto,
    OrderCenterRespDto
} from "@/app/api/entity/common";
import {getDeliveryTypeDescription} from "@/app/util/CommodityUtil";
import Http from "@/app/util/http";

const createCommodity = function (reqDto: CommodityCreateReqDto): Promise<CommodityCreateRespDto> {
    return Http.post("/v1/commodity-center/commodity", reqDto)
}

const queryCommodities = function (reqDto: CommodityQueryReqDto): Promise<CommodityQueryRespDto> {
    return Http.post("/v1/commodity-center/commodity/query", reqDto)
}

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

    static emptyInstance(): CommodityDto {
        return new CommodityDto(0, "", 0, "", "", 0, [], 0, "", "");
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

    constructor(id: number,
                status: number,
                name: string,
                price: number,
                description: string,
                image: string,
                stock: number,
                deliveryType: number[]) {
        super(name, price, description, image, stock, deliveryType, status);
        this.id = id;
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

const ChannelOption = [
    {value: 1, label: getDeliveryTypeDescription(1)},
    {value: 2, label: getDeliveryTypeDescription(2)},
]

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
    ChannelOption,
    createCommodity,
    queryCommodities
}