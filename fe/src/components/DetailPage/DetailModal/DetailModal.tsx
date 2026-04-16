import { Modal, Form, Input, Select } from 'antd';
import type { DetailFormData, DetailModalProps } from '../../../types/types';

const DetailModal: React.FC<DetailModalProps> = ({
  open,
  onOk,
  onCancel,
  componentTypes,
  statuses,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formData: DetailFormData = {
        name: values.name,
        description: values.description,
        type: values.type,
        status: values.status,
        origin_country: values.origin_country || '',
        source: values.source || '',
        image_url: values.image_url || '',
      };

      onOk(formData);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title='Add New Detail'
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Create'
      cancelText='Cancel'
      width={600}
    >
      <Form form={form} layout='vertical' name='component_form'>
        <Form.Item
          name='name'
          label='Detail Name'
          rules={[{ required: true, message: 'Please enter component name' }]}
        >
          <Input placeholder='e.g., Arduino Nano' />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name='type'
          label='Detail Type'
          rules={[{ required: true, message: 'Please select component type' }]}
        >
          <Select
            options={componentTypes.map((type) => ({
              label: type.name,
              value: type.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name='status'
          label='Status'
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select
            options={statuses.map((status) => ({
              label: status.name,
              value: status.id,
            }))}
          />
        </Form.Item>

        <Form.Item name='origin_country' label='Origin Country'>
          <Input />
        </Form.Item>

        <Form.Item name='source' label='Source'>
          <Input />
        </Form.Item>

        <Form.Item name='image_url' label='Image URL'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailModal;