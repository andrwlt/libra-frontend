import { ReactNode, useState } from 'react';
import { Button } from 'antd';
import CurrentStep from './CurrentStep';
import Logo from '../Logo';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

interface StepItem {
  name: string;
  component: ReactNode;
  nextAction?: ReactNode;
  disabled?: boolean;
}

interface StepsProps {
  steps?: StepItem[];
  onNext?: Function;
  onBack?: Function;
  style?: any;
}

export default function Steps({ steps = [], onNext = () => {}, onBack = () => {}, style }: StepsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      onBack && onBack();
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
      onNext && onNext();
    }
  };

  const currentStep = steps[currentIndex] || {};

  return (
    <Wrapper style={style}>
      <div>
        <Logo />
        <CurrentStep
          title={currentStep.name}
          subtitle={`Step ${currentIndex + 1} of ${steps.length}`}
          canBack={currentIndex > 0}
          onBack={handleBack}
        />
      </div>
      <div>{currentStep.component}</div>
      <div style={{ paddingTop: '28px' }}>
        {currentStep.nextAction ? (
          currentStep.nextAction
        ) : (
          <Button disabled={currentStep.disabled} type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </Wrapper>
  );
}
