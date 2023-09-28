'use client';

import './CommodityQueryPage.scss';
import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    message,
    Pagination,
    Popconfirm,
    Row,
    Select,
    Space,
    Table
} from "antd";
import {CommodityDto, CommodityQueryReqDto, queryCommodities} from "@/app/api/entity/commodity/commodity";
import Column from "antd/lib/table/Column";
import {useEffect, useState} from "react";
import {getDeliveryTypeTag, getStatusDescription, getStatusTag} from "@/app/util/CommodityUtil";
import CommodityEditor from "@/app/component/CommodityEditor";

export default function CommodityQueryPage() {
    const [messageApi] = message.useMessage();
    let [queryReqDto, updateQueryReqDto] = useState(new CommodityQueryReqDto(1, 10) as CommodityQueryReqDto)
    let [data, updateData] = useState([] as CommodityDto[])
    let [currentPage, updateCurrentPage] = useState(1)
    let [pageSize, updatePageSize] = useState(10)
    let [total, updateTotal] = useState(0)
    let [loading, updateLoading] = useState(false)
    let [editCommodity, updateCommodity] = useState(CommodityDto.emptyInstance() as CommodityDto)
    let [modal, updateModal] = useState(false)

    const loadDataSource = async (reqDto: CommodityQueryReqDto) => {
        updateLoading(true)

        queryCommodities(reqDto)
            .then(res => {
                    if (res.code == 0 && res.data) {
                        updateData(res.data.list)
                        updateCurrentPage(res.data.currentPage)
                        updatePageSize(res.data.pageSize)
                        updateTotal(res.data.totalCount)
                    } else {
                        messageApi.error(res.message);
                    }
                    updateLoading(false)
                }
            )
            .catch(() => {
                messageApi.error('Query commodity failed');
                updateLoading(false)
            })
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
        updateCommodity(commodity)
        updateModal(true)
        return commodity;
    }

    const submitEdit = (commodity: CommodityDto) => {
        console.log("Submit: " + JSON.stringify(commodity))
        updateModal(false)
        loadDataSource(queryReqDto)
    }

    const deleteFunc = (commodity: CommodityDto) => {
        console.log("Delete: " + JSON.stringify(commodity))
        loadDataSource(queryReqDto)
    }

    const onPageChange = (page: number, pageSize?: number | undefined) => {
        queryReqDto.currentPage = page
        queryReqDto.pageSize = pageSize ? pageSize : 10
        updateQueryReqDto(queryReqDto)
        loadDataSource(queryReqDto)
    }

    useEffect(() => {
        loadDataSource(queryReqDto)
    }, [loadDataSource, queryReqDto]);

    return (
        <div className={"query-commodity-page-container"}>

            <CommodityEditor commodity={editCommodity} open={modal} onFinish={submitEdit} onCancel={() => {
                updateModal(false)
            }}/>

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
                    <Column title="Price" dataIndex="price" key="price" render={(value) => `${value} $`}/>
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