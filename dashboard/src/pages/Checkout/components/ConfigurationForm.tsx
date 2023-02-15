import { Typography, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Checkout as CheckoutType } from 'types';
import BrandingForm from './BrandingForm';
import ProductForm from './ProductForm';
import AfterPaymentForm from './AfterPaymentForm';
import { toSmallestUnit, formatBalance } from 'utils/format/balance';

interface ConfigurationFormProps {
  checkout: CheckoutType;
  onChange: any;
}

const ConfigurationForm = ({ checkout, onChange = () => {} }: ConfigurationFormProps) => {
  const handleBrandingChange = (value: any) => {
    onChange({
      ...checkout,
      branding: {
        ...checkout.branding,
        ...value,
      },
    });
  };

  const handleProductChange = (values: any) => {
    const asset = values.asset === undefined ? checkout.asset : values.asset;
    delete values.asset;

    let price = checkout.item.price;
    if (values.price !== undefined) {
      if (values.price === null) {
        price = 0;
      } else {
        price = toSmallestUnit(values.price, asset);
      }
    };
    // Convert price if asset changed
    if (asset !== checkout.asset) {
      price = toSmallestUnit(formatBalance(price, checkout.asset), asset);
    }

    onChange({
      ...checkout,
      asset,
      item: {
        ...checkout.item,
        ...values,
        price,
      },
    });
  };

  const handleAfterPaymentChange = (value: any) => {
    onChange({
      ...checkout,
      afterPayment: value,
    });
  };

  const items: TabsProps['items'] = [
    {
      key: 'product',
      label: `Product`,
      children: (
        <ProductForm
          initialValues={{
            ...checkout.item,
            price: formatBalance(checkout.item.price, checkout.asset) || null,
            asset: checkout.asset
          }}
          onValuesChange={handleProductChange}
        />
      ),
    },
    {
      key: 'branding',
      label: 'Branding',
      children: <BrandingForm initialValues={checkout.branding} onValuesChange={handleBrandingChange} />,
    },
    {
      key: 'afterPayment',
      label: `After Payment`,
      children: <AfterPaymentForm initialValues={checkout.afterPayment} onValuesChange={handleAfterPaymentChange} />,
    },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <Typography.Title level={4}>New checkout</Typography.Title>

      <Tabs items={items}></Tabs>
    </div>
  );
};

export default ConfigurationForm;
