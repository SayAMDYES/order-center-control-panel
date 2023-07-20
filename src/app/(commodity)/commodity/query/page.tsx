'use client';

import './CommodityQueryPage.scss';
import {Button, DatePicker, Divider, Form, Input, Pagination, Popconfirm, Row, Select, Space, Table} from "antd";
import {CommodityDto, CommodityQueryReqDto} from "@/app/api/entity/commodity/commodity";
import Column from "antd/lib/table/Column";
import {useState} from "react";
import {getDeliveryTypeTag, getStatusDescription, getStatusTag} from "@/app/util/CommodityUtil";

function sleep(ms: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });
}

export default function CommodityQueryPage() {
    let [queryReqDto, updateQueryReqDto] = useState(new CommodityQueryReqDto(1, 10) as CommodityQueryReqDto)
    let [data, updateData] = useState([] as CommodityDto[])
    let [currentPage, updateCurrentPage] = useState(1)
    let [pageSize, updatePageSize] = useState(10)
    let [total, updateTotal] = useState(0)
    let [loading, updateLoading] = useState(false)
    const loadDataSource = async (reqDto: CommodityQueryReqDto) => {
        updateLoading(true)
        let list = [] as CommodityDto[]
        for (let i = (reqDto.currentPage - 1) < 0 ? 0 : (reqDto.currentPage - 1) * reqDto.pageSize; i < ((reqDto.currentPage < 1) ? 1 : reqDto.currentPage * reqDto.pageSize); i++) {
            list.push({
                id: i + 1,
                name: "commodity" + i,
                price: i,
                description: "description" + i,
                deliveryType: [1, 2],
                status: 1,
                createTime: "2021-01-01",
                updateTime: "2021-01-01"
            })
        }
        await sleep(1000)
        updateData(list)
        updateCurrentPage(reqDto.currentPage)
        updatePageSize(reqDto.pageSize)
        updateTotal(100)
        updateLoading(false)
    }

    const onFinish = (reqDto: CommodityQueryReqDto) => {
        queryReqDto.name = reqDto.name
        queryReqDto.deliveryType = reqDto.deliveryType
        queryReqDto.status = reqDto.status
        queryReqDto.createTime = reqDto.createTime
        updateQueryReqDto(queryReqDto)
        loadDataSource(queryReqDto)
    };

    const {RangePicker} = DatePicker;

    const editFunc = (commodity: CommodityDto) => {
        console.log(commodity)
        return commodity;
    }

    const deleteFunc = (commodity: CommodityDto) => {
        console.log(commodity)
        return commodity;
    }

    const onPageChange = (page: number, pageSize?: number | undefined) => {
        queryReqDto.currentPage = page
        queryReqDto.pageSize = pageSize ? pageSize : 10
        updateQueryReqDto(queryReqDto)
        loadDataSource(queryReqDto)
    }

    return (
        <div className={"query-commodity-page-container"}>
            <div className={"submit-container"}>
                <Form layout={"horizontal"}
                      style={{maxWidth: '100%'}}
                      onFinish={onFinish}
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
                            label="DeliveryType"
                            name="deliveryType"
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
                                    {value: 0, label: getStatusDescription(0)},
                                    {value: 1, label: getStatusDescription(1)},
                                    {value: 2, label: getStatusDescription(2)},
                                    {value: 3, label: getStatusDescription(3)}
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
            <Divider className={"divider"}/>
            <div className={"result-container"}>
                <div className={"pagination-container"}>
                    <Pagination showQuickJumper
                                showSizeChanger
                                defaultCurrent={currentPage}
                                defaultPageSize={pageSize}
                                total={total}
                                onChange={onPageChange}
                                pageSizeOptions={[10, 20, 50, 100]}/>
                </div>
                <Table dataSource={data}
                       pagination={false}
                       loading={loading}
                       rowKey={"id"}>
                    <Column title="Id" dataIndex="id" key="id"/>
                    <Column title="Name" dataIndex="name" key="name"/>
                    <Column title="Price" dataIndex="price" key="price"/>
                    <Column title="Description" dataIndex="description" key="description"/>
                    <Column title="DeliveryType" dataIndex="deliveryType" key="deliveryType"
                            render={(tags: number[]) => (
                                <>
                                    {tags.map((tag) => (
                                        getDeliveryTypeTag(tag)
                                    ))}
                                </>
                            )}/>
                    <Column title="Status" dataIndex="status" key="status"
                            render={(tag: number) => (
                                <>
                                    {getStatusTag(tag)}
                                </>
                            )}/>
                    <Column title="CreateTime" dataIndex="createTime" key="createTime"/>
                    <Column title="UpdateTime" dataIndex="updateTime" key="updateTime"/>
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: CommodityDto) => (
                            <Space size="middle">
                                <Button type="primary"
                                        onClick={() => editFunc(record)}
                                        className={"confirm-button"}>Edit</Button>
                                <Popconfirm
                                    placement="topRight"
                                    title={"Are you sure to delete this commodity?"}
                                    description={"This operation cannot be undone."}
                                    onConfirm={() => deleteFunc(record)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button className={"warning-button"}>Delete</Button>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
}