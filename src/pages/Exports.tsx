import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ExportsTable from '@/components/ExportsTable';
import { isDebugMode } from '@/utils/utils';
import SelectUser from '@/components/SelectUser';

// get page and perPage from
// query params
const params = new URLSearchParams(window.location.search);

const Exports = () => {
  const page = params.get('page') ? parseInt(params.get('page') as string) : 1;
  const perPage = params.get('perPage') ? parseInt(params.get('perPage') as string) : 5;

  return (
    <PageContainer extra={isDebugMode() ? <SelectUser /> : null}>
      <ExportsTable page={page} perPage={perPage} />
    </PageContainer>
  );
};

export default Exports;
