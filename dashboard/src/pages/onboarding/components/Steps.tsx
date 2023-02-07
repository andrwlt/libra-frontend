import { ReactNode, useState } from 'react';
import { Button, Typography, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Logo from './Logo';
import styled from 'styled-components';

const { Title } = Typography;

interface CurrentStepProps {
  title?: string;
  subtitle?: string;
  canBack?: boolean;
  onBack?: Function;
}

const CurrentStep = ({ title, subtitle, canBack = true, onBack }: CurrentStepProps) => {
  const [backButtonHovered, setBackButtonHovered] = useState(false);

  const handleBack = () => {
    onBack && onBack();
  };

  return (
    <div style={{ position: 'relative' }}>
      {canBack && (
        <div
          style={{ position: 'absolute', padding: '8px', top: '8px', left: '-24px' }}
          onMouseEnter={() => {
            setBackButtonHovered(true);
          }}
          onMouseDown={() => {
            setBackButtonHovered(false);
          }}
          onClick={handleBack}
        >
          <ArrowLeftOutlined></ArrowLeftOutlined>
        </div>
      )}
      {backButtonHovered ? (
        <Title level={4}>Back</Title>
      ) : (
        <>
          <Title level={4}>{title}</Title>
          <Title level={5} type="secondary">
            {subtitle}
          </Title>
        </>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface StepItem {
  name: string;
  component: ReactNode;
  action?: string;
}

interface StepsProps {
  steps?: StepItem[];
  onNext?: Function;
  onBack?: Function;
}

export default function Steps({ steps = [], onNext = () => {}, onBack = () => {} }: StepsProps) {
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
    <Wrapper>
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
      <div>
        <Button type="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </Wrapper>
  );
}
