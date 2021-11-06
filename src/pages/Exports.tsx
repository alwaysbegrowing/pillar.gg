import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ExportsTable from '@/components/ExportsTable';
import { isDebugMode } from '@/utils/utils';
import SelectUser from '@/components/SelectUser';
import SelectMod from '@/components/SelectMod';

const Exports = () => {
  return (
    <PageContainer extra={isDebugMode() ? <SelectUser /> : <SelectMod />}>
      <ExportsTable />
    </PageContainer>
  );
};

export default Exports;
