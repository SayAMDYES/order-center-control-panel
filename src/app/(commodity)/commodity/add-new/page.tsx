'use client';

import '@/app/api/entity/commodity/commodity';
import './CommodityAddNewPage.scss';
import {Button, Divider, Form, Input, InputNumber, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {CommodityCreateReqDto} from "@/app/api/entity/commodity/commodity";

export default function CommodityAddNewPage() {
    const onFinish = (reqDto: CommodityCreateReqDto) => {
        console.log('Success:', reqDto);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={"commodity-add-new-page-container"}>
            <div className={"title"}>New commodity information <EditOutlined/></div>
            <Divider className={"divider"}/>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
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
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label="RealPrice"
                    name="realPrice"
                    rules={[{required: false, message: 'Please input real price'}]}
                >
                    <InputNumber/>
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