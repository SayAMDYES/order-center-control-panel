'use client';

import './CommodityQueryPage.scss';
import {Button, DatePicker, Divider, Form, Input, Row, Select, Space} from "antd";
import {CommodityQueryReqDto} from "@/app/api/entity/commodity/commodity";

export default function CommodityQueryPage() {
    const onFinish = (reqDto: CommodityQueryReqDto) => {
        console.log(reqDto)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const {RangePicker} = DatePicker;

    return (
        <div className={"query-commodity-page-container"}>
            <div className={"submit-container"}>
                <Form layout={"horizontal"}
                      style={{maxWidth: '100%'}}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      className={"form"}>
                    <Row className={"row"}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: false}]}>
                            <Input placeholder={"commodity name"}/>
                        </Form.Item>

                        <Form.Item
                            label="SellChannel"
                            name="sellChannel"
                            rules={[{required: false}]}
                            className={"margin-left-form-item"}>
                            <Select
                                style={{width: 140}}
                                options={[
                                    {value: 1, label: "Express"},
                                    {value: 2, label: "CityDelivery"}
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{required: false}]}
                            className={"margin-left-form-item"}>
                            <Select
                                style={{width: 140}}
                                options={[
                                    {value: 0, label: "In Stock"},
                                    {value: 1, label: "On Sale"},
                                    {value: 2, label: "Out Of Stock"},
                                    {value: 3, label: "Discontinued"}
                                ]}
                            />
                        </Form.Item>
                    </Row>
                    <Row className={"row"}>
                        <Form.Item
                            label="CreateTime"
                            name="createTime"
                            rules={[{required: false}]}>
                            <RangePicker format={"YYYY-MM-DD"}/>
                        </Form.Item>
                    </Row>
                    <Row className={"row"}>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Space>
                                <Button className={"confirm-button"}
                                        htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="reset">Reset</Button>
                            </Space>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
            <Divider/>
            <div className={"result-container"}>2</div>
        </div>
    )
}