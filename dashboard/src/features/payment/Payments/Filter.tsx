import { Button, Space, Row, Form, Col, Select, DatePicker } from 'antd';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Dayjs } from 'dayjs';

dayjs.extend(utc);

const { RangePicker } = DatePicker;

const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

const ChargesFilter = () => {
  const [form] = Form.useForm();
  let [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get('status');
  const createdGte = searchParams.get('created[gte]');
  const createdLte = searchParams.get('created[lte]');

  const initialValues = {
    status,
    created: createdGte && [dayjs(createdLte), dayjs(createdGte)],
  };

  const onFinish = (values: any) => {
    console.log('onFinish');
    setSearchParams({
      status: values.status,
      'created[gte]': values.created[0]?.utc().format(),
      'created[lte]': values.created[1]?.utc().format(),
    });
  };

  const onReset = () => setSearchParams();

  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      <Row justify="space-between" gutter={48} style={{ width: '100%', marginLeft: 0, marginRight: 0 }}>
        <Col span={6}>
          <Form.Item name="status" label="Status" style={{ marginBottom: 0 }}>
            <Select>
              {['succeeded', 'pending', 'failed'].map((status) => (
                <Select.Option value={status} key={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="created" label="Date Range" style={{ marginBottom: 0 }}>
            <RangePicker presets={rangePresets} showTime />
          </Form.Item>
        </Col>

        <Col span={5} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 0 }}>
          <Space>
            <Button onClick={onReset}>Reset</Button>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default ChargesFilter;
