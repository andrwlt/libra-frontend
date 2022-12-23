import { Modal } from "antd";
import PaymentDetail from 'components/PaymentDetail';
import ConnectAccount from 'components/ConnectAccount';
import { useAccount } from "contexts/account";
import { useEffect, useState } from "react";
import { Currency } from "types";

interface PaymentModalProps {
  opened: boolean;
  email?: string;
  currency: Currency;
  orderAmount: number;
}

enum PaymentStep {
  ConnectAccount,
  Pay,
}

export default function PaymentModal({
  opened,
  orderAmount,
  currency,
}: PaymentModalProps) {
  const { account } = useAccount();
  const [step, setStep] = useState<PaymentStep>(PaymentStep.ConnectAccount);

  useEffect(() => {
    if (!account) {
      setStep(PaymentStep.ConnectAccount);
    } else {
      setStep(PaymentStep.Pay);
    }
  }, [account])

  console.log(step);

  return (
    <Modal open={opened} footer={false} title={false} closable={false}>
      {
        step === PaymentStep.ConnectAccount && <ConnectAccount/>
      }
      {
        step === PaymentStep.Pay && <PaymentDetail orderAmount={orderAmount} currency={currency}/>
      }
    </Modal>
  )
}