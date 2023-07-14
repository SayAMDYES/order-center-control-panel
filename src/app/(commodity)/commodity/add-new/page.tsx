'use client';

import '@/app/api/entity/commodity/commodity';
import './NewCommodityPage.scss';
import {Button, Checkbox, Divider, Form, Input, InputNumber, Radio, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {CommodityCreateReqDto} from "@/app/api/entity/commodity/commodity";

export default function NewCommodityPage() {
    const channelOption = ["Express", "CityDelivery"]

    const onFinish = (reqDto: CommodityCreateReqDto) => {
        console.log('Success:', reqDto);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={"new-commodity-page-container"}>
            <div className={"title"}>New commodity information <EditOutlined/></div>
            <Divider className={"divider"}/>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 800}}
                initialValues={{remember: false}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    <InputNumber defaultValue={0} min={0} precision={0}/>
                </Form.Item>

                <Form.Item
                    label="SellChannel"
                    name="sellChannel"
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
                    <Radio.Group defaultValue={0}>
                        <Radio value={0}>In Stock</Radio>
                        <Radio value={1}>On Sale</Radio>
                        <Radio value={2}>Out Of Stock</Radio>
                        <Radio value={3}>Discontinued</Radio>
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