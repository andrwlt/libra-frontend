import { useState, useEffect, useMemo } from 'react';
import { Button, Space, Row, Form, Col, Select, DatePicker } from 'antd';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { PAYMENT_STATUS, NULL_VALUE } from 'config';
import { getExistProps } from 'utils/paging';
import { useChargeParams, CHARGES_PARAMS } from 'features/payment/paymentHooks';
import { LOCALE_WORKSPACE } from 'app/i18n';

const { STATUS, CREATED_GTE, CREATED_LTE } = CHARGES_PARAMS;

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
  const { t } = useTranslation(LOCALE_WORKSPACE.PAYMENT);
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
        [STATUS]: values.status,
        [CREATED_GTE]: values?.created?.[0]?.utc().format(),
        [CREATED_LTE]: values?.created?.[1]?.utc().format(),
      }),
    );
  };

  const onReset = () => {
    setSearchParams();
    form.setFieldsValue({ status: NULL_VALUE, created: undefined });
  };

  const isFormChanged =
    form.getFieldsValue([STATUS])?.status === NULL_VALUE && !form.getFieldsValue(['created'])?.created;

  return (
    <Form form={form} onFieldsChange={onFinish} initialValues={initialValues} disabled={isLoading} autoComplete="off">
      <Row justify="space-between" gutter={0} style={{ width: '100%', marginLeft: 0, marginRight: 0, paddingLeft: 14 }}>
        <Col span={6}>
          <Form.Item name="status" label="Status" style={{ marginBottom: 0 }}>
            <Select>
              <Option value="null" key="null">
                {t('allStatus')}
              </Option>
              <Option value={PAYMENT_STATUS.PENDING} key="1">
                {t('pending')}
              </Option>
              <Option value={PAYMENT_STATUS.SUCCEEDED} key="2">
                {t('succeeded')}
              </Option>
              <Option value={PAYMENT_STATUS.FAILED} key="3">
                {t('failed')}
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
