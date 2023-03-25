import { useState, useEffect, useMemo } from 'react';
import { Button, Space, Row, Form, Col, Select, DatePicker } from 'antd';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { PAYMENT_STATUS, NULL_VALUE } from 'config';
import { getExistProps } from 'utils/paging';
import { useChargeParams } from 'features/payment/paymentHooks';

dayjs.extend(utc);

const { RangePicker } = DatePicker;
const { Option } = Select;

const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

const ChargesFilter = ({ isLoading }: { isLoading: boolean }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pickerKey, setPickerKey] = useState(1);
  const [, setSearchParams] = useSearchParams();
  const { status, createdGte, createdLte } = useChargeParams();

  const initialValues = useMemo(() => {
    return { status: status ?? NULL_VALUE, created: createdGte && [dayjs(createdLte), dayjs(createdGte)] };
  }, [createdGte, status, createdLte]);

  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    setPickerKey(pickerKey + 1);

    setSearchParams(
      getExistProps({
        status: values.status,
        'created[gte]': values?.created?.[0]?.utc().format(),
        'created[lte]': values?.created?.[1]?.utc().format(),
      }),
    );
  };

  const onReset = () => {
    setSearchParams();
    form.setFieldsValue({ status: NULL_VALUE, created: undefined });
  };

  const isFormChanged =
    form.getFieldsValue(['status'])?.status === NULL_VALUE && !form.getFieldsValue(['created'])?.created;

  return (
    <Form form={form} onFieldsChange={onFinish} initialValues={initialValues} disabled={isLoading}>
      <Row justify="space-between" gutter={0} style={{ width: '100%', marginLeft: 0, marginRight: 0 }}>
        <Col span={6}>
          <Form.Item name="status" label="Status" style={{ marginBottom: 0 }}>
            <Select>
              <Option value="null" key="null">
                {t('payment.allStatus')}
              </Option>
              <Option value={PAYMENT_STATUS.PENDING} key="1">
                {t('payment.pending')}
              </Option>
              <Option value={PAYMENT_STATUS.SUCCEEDED} key="2">
                {t('payment.succeeded')}
              </Option>
              <Option value={PAYMENT_STATUS.FAILED} key="3">
                {t('payment.failed')}
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="created" label="Date Range" style={{ marginBottom: 0 }}>
            <RangePicker key={pickerKey} presets={rangePresets} showTime />
          </Form.Item>
        </Col>

        <Col span={2} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 0 }}>
          <Space>
            <Button disabled={isFormChanged || isLoading} onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default ChargesFilter;
