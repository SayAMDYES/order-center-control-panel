import {ChannelOption, CommodityDto} from "@/app/api/entity/commodity/commodity";
import {Checkbox, Form, Input, InputNumber, Modal, Radio} from "antd";
import {getStatusDescription} from "@/app/util/CommodityUtil";

interface CommodityEditorProps {
    open: boolean
    commodity: CommodityDto
    onFinish: (values: CommodityDto) => void;
    onCancel: () => void;
}

export default function CommodityEditor(props: CommodityEditorProps) {
    const [form] = Form.useForm();

    const onOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                props.onFinish(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    return (
        <Modal title="Commodity Edit"
               okText={"Save"}
               open={props.open}
               onOk={onOk}
               onCancel={props.onCancel}>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={props.commodity}
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
                        options={ChannelOption}
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
            </Form>
        </Modal>
    )
}