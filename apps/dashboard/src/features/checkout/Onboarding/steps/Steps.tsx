import { Button } from 'antd';
import CurrentStep from './CurrentStep';
import Logo from 'components/Common/Logo';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export default function Steps({ style, children, step, setStepIndex, numberOfSteps }: any) {
  const { t } = useTranslation();

  return (
    <Wrapper style={style}>
      <div>
        <Logo />
        <CurrentStep
          title={step.name}
          subtitle={`Step ${step.index + 1} of ${numberOfSteps}`}
          canBack={step.index > 0}
          onBack={() => setStepIndex(step.index - 1)}
        />
      </div>
      <div>{children}</div>
      <div style={{ paddingTop: '28px' }}>
        {step.nextAction ? (
          step.nextAction
        ) : (
          <Button disabled={step.disabled} type="primary" onClick={() => setStepIndex(step.index + 1)}>
            {t('next')}
          </Button>
        )}
      </div>
    </Wrapper>
  );
}
