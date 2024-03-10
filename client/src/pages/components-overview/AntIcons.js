import { styled } from '@mui/material/styles';

import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';

const IFrameWrapper = styled('iframe')(() => ({
  height: 'calc(100vh - 210px)',
  border: 'none'
}));

const AntIcons = () => (
  <ComponentSkeleton>
    <MainCard title="Ant Icons">
      <IFrameWrapper title="Ant Icon" width="100%" src="https://ant.design/components/icon/" />
    </MainCard>
  </ComponentSkeleton>
);

export default AntIcons;
