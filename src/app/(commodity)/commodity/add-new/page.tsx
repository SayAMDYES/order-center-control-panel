'use client';

import '@/app/api/entity/commodity/commodity';
import './NewCommodityPage.scss';
import {Button, Checkbox, Divider, Form, Input, InputNumber, message, Radio, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {CommodityCreateReqDto, createCommodity} from "@/app/api/entity/commodity/commodity";
import {getDeliveryTypeDescription, getStatusDescription} from "@/app/util/CommodityUtil";

const channelOption = [
    {value: 1, label: getDeliveryTypeDescription(1)},
    {value: 2, label: getDeliveryTypeDescription(2)},
]

export default function NewCommodityPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (reqDto: CommodityCreateReqDto) => {
        createCommodity(reqDto).then(res => {
            if (res.code !== 0) {
                messageApi.error(res.message);
                return;
            }
            messageApi.success('Create commodity success');
        }).catch(() => {
            messageApi.error('Create commodity failed');
        })
    }

    return (
        <div className={"new-commodity-page-container"}>
            {contextHolder}
            <div className={"title"}>New commodity information <EditOutlined/></div>
            <Divider className={"divider"}/>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 800}}
                onFinish={onFinish}
                initialValues={{
                    stock: 0,
                    status: 0,
                } as CommodityCreateReqDto}
                autoComplete="off"
            >
                <Form.Item
                    label="CommodityName"
                    name="name"
                    rules={[{required: true, message: 'Please input commodity name'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{required: true, message: 'Please input price'}]}
                >
                    <InputNumber min={0} precision={2}/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{required: false, message: 'Please input description'}]}
                >
                    <Input.TextArea
                        showCount
                        allowClear
                        autoSize={true}
                        maxLength={200}
                        style={{resize: 'none'}}
                    />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="image"
                    rules={[{required: false, message: 'Please input image url'}]}
                >
                    <Input.TextArea
                        showCount
                        allowClear
                        autoSize={true}
                        maxLength={200}
                        style={{resize: 'none'}}
                    />
                </Form.Item>

                <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[{required: false, message: 'Please input stock'}]}
                >
                    <InputNumber min={0} precision={0}/>
                </Form.Item>

                <Form.Item
                    label="DeliveryType"
                    name="deliveryType"
                    rules={[{required: true, message: 'Please choose sell channel'}]}
                >
                    <Checkbox.Group
                        options={channelOption}
                    />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{required: false, message: 'Please choose status'}]}
                >
                    <Radio.Group>
                        <Radio value={0}>{getStatusDescription(0)}</Radio>
                        <Radio value={1}>{getStatusDescription(1)}</Radio>
                        <Radio value={2}>{getStatusDescription(2)}</Radio>
                        <Radio value={3}>{getStatusDescription(3)}</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Space>
                        <Button className={"confirm-button"}
                                htmlType="submit">
                            Create
                        </Button>
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}