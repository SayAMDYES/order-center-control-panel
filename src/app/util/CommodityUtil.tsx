import {Tag} from "antd";

function getDeliveryTypeDescription(value: number): string {
    switch (value) {
        case 1:
            return 'Express';
        case 2:
            return 'CityDelivery'
        default:
            return 'Unknown';
    }
}

function getDeliveryTypeDescriptions(value: number[]): string[] {
    let result: string[] = [];
    value.forEach(item => {
        result.push(getDeliveryTypeDescription(item));
    })
    return result;
}

function getDeliveryTypeTag(value: number) {
    let str = getDeliveryTypeDescription(value)
    switch (str) {
        case 'Express':
            return (<Tag color="blue"
                         key={str}>
                {str}
            </Tag>);
        case 'CityDelivery':
            return (<Tag color="green" key={str}>
                {str}
            </Tag>);
        default:
            return (<Tag color="red" key={str}>
                {str}
            </Tag>);
    }
}

function getStatusDescription(value: number): string {
    switch (value) {
        case 0:
            return 'In Stock';
        case 1:
            return 'On Sale'
        case 2:
            return 'Out Of Stock'
        case 3:
            return 'Discontinued'
        default:
            return 'Unknown';
    }
}

function getStatusTag(value: number) {
    let str = getStatusDescription(value)
    switch (str) {
        case 'In Stock':
            return (<Tag color="blue"
                         key={str}>
                {str}
            </Tag>);
        case 'On Sale':
            return (<Tag color="green" key={str}>
                {str}
            </Tag>);
        case 'Out Of Stock':
            return (<Tag color="orange" key={str}>
                {str}
            </Tag>);
        case 'Discontinued':
            return (<Tag color="red" key={str}>
                {str}
            </Tag>);
        default:
            return (<Tag color="red" key={str}>
                {str}
            </Tag>);
    }
}

export {
    getDeliveryTypeDescription,
    getDeliveryTypeDescriptions,
    getDeliveryTypeTag,
    getStatusDescription,
    getStatusTag
}