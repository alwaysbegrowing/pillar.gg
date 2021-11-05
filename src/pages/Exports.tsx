import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ExportsTable from '@/components/Exports/ExportsTable';
import { isDebugMode } from '@/utils/utils';
import SelectUser from '@/components/SelectUser';

const Exports = () => {
  return (
    <PageContainer extra={isDebugMode() ? <SelectUser /> : null}>
      <ExportsTable />
    </PageContainer>
  );
};

export default Exports;
