import React from 'react';
import { Table, Spin } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

import { useExports } from '@/services/hooks/export';
import { useVideos } from '@/services/hooks/api';

interface ExportsTableProps {
  page: number;
  perPage: number;
}

const ExportsTable = ({ page, perPage }: ExportsTableProps) => {
  const { data: exports, isLoading, isError } = useExports(page, perPage);
  const { data: videos, isLoading: isLoadingVideos, isError: isErrorVideos } = useVideos();

  if (isLoading || isLoadingVideos) {
    return <Spin />;
  }

  if (isError || isErrorVideos) {
    return <div>Error</div>;
  }

  const columns = [
    {
      title: 'Stream Title',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => {
        return text;
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (text: string) => {
        if (text === 'Done.') {
          return (
            <div>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              Done
            </div>
          );
        }
        return (
          <div>
            <Spin />
            {text}
          </div>
        );
      },
    },
    {
      title: 'Render Start',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text: string) => {
        return text;
      },
    },
    {
      title: 'Render End',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text: string) => {
        return text;
      },
    },
    {
      title: 'Download',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => <a href={text}>Download</a>,
    },
  ];

  const data = exports.map((exportItem: any) => {
    const video = videos.find((videoItem: any) => videoItem.id === exportItem.videoId);
    return {
      ...exportItem,
      name: video?.title || 'Video',
      progress: exportItem.progress,
    };
  });

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: perPage,
        current: page,
        total: exports.length,
      }}
    />
  );
};

export default ExportsTable;
