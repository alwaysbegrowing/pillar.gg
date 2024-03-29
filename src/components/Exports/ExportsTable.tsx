import React, { useContext, useState } from 'react';
import { Button, Image, Table, Progress, ConfigProvider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { DateTime } from 'luxon';
import { useExports } from '@/services/hooks/export';
import { useVideos } from '@/services/hooks/api';
import { GlobalContext } from '@/ContextWrapper';
import LoginInvitation from '@/components/Login/LoginInvitation';
import ExportInvitation from '@/components/Exports/ExportInvitation';
import {
  DatePickerFilterButton,
  DatePickerFilterDropdown,
} from '@/components/Exports/ExportDatePickerDropdown';
import RadioFilterPopover from '@/components/Exports/ExportRadioDropdown';
import type { FilterDropdownProps } from 'antd/es/table/interface';

const ExportsTable = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const [exportDatePickerIsOpen, setExportDatePickerIsOpen] = useState(false);
  const [exportStartDate, setExportStartDate] = useState((Date.now() - 31557600000) / 1000);
  const [exportEndDate, setExportEndDate] = useState(Date.now() / 1000);
  const [exportDateSort, setExportDateSort] = useState(1);
  const [exportPlatform, setExportPlatform] = useState('');

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail_url',
      key: 'thumbnail_url',
      render: (thumbnail_url: string) => (
        <Image src={thumbnail_url} alt="thumbnail" height="84px" />
      ),
    },
    {
      title: 'Stream Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Platform',
      dataIndex: 'uploadType',
      key: 'uploadType',
      render: (text: string) => {
        if (text === 'clips') {
          return 'Desktop';
        }
        // capitalize first letter
        return text.charAt(0).toUpperCase() + text.slice(1);
      },
      filters: [
        {
          text: 'All',
          value: '',
        },
        {
          text: 'Desktop',
          value: 'clips',
        },
        {
          text: 'Mobile',
          value: 'mobile',
        },
      ],
      filterDropdown: (props: FilterDropdownProps) => {
        return (
          <RadioFilterPopover {...props} value={exportPlatform} setValue={setExportPlatform} />
        );
      },
    },
    {
      title: 'Stream Date',
      dataIndex: 'streamedAt',
      key: 'streamedAt',
      render: (streamedAt: string) => {
        return streamedAt
          ? DateTime.fromISO(streamedAt).toLocaleString(DateTime.DATETIME_SHORT)
          : '-';
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => {
        if (progress === -1) {
          return <Progress width={50} type="circle" percent={0} status="exception" />;
        }
        return <Progress width={50} type="circle" percent={progress || 10} />;
      },
    },
    {
      title: 'Exported At',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (end: any) => {
        if (end === null) {
          return '-';
        }
        return DateTime.fromISO(end.toLocaleString()).toLocaleString(DateTime.DATETIME_SHORT);
      },
      sorter: (a: any, b: any, sortOrder: any) => {
        if (sortOrder === 'descend') {
          setExportDateSort(-1);
        } else {
          setExportDateSort(1);
        }
      },
      defaultSortOrder: exportDateSort === 1 ? 'ascend' : 'descend',
      sortDirections: ['descend', 'ascend', 'descend'],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      filterIcon: (filtered: boolean) => {
        return (
          <DatePickerFilterButton
            isOpen={exportDatePickerIsOpen}
            setIsOpen={setExportDatePickerIsOpen}
            content={
              <DatePickerFilterDropdown
                startDateValue={exportStartDate}
                setStartDateValue={setExportStartDate}
                endDateValue={exportEndDate}
                setEndDateValue={setExportEndDate}
                isOpen={exportDatePickerIsOpen}
                setIsOpen={setExportDatePickerIsOpen}
              />
            }
          />
        );
      },
      // this is so that the real modal is not rendered
      filterDropdown: <div />,
    },
    {
      title: 'Download',
      dataIndex: 'url',
      key: 'url',
      render: (url: any) => {
        if (!url) {
          return <Button loading disabled />;
        }
        return (
          <Button href={url}>
            <DownloadOutlined />
          </Button>
        );
      },
    },
  ];

  const exportFilter = {
    startDate: exportStartDate,
    endDate: exportEndDate,
    dateSort: exportDateSort,
    platform: exportPlatform,
  };

  console.log({ exportFilter });

  const { twitchId } = useContext(GlobalContext);

  const { data, isLoading, isError } = useExports(
    pagination.current,
    pagination.pageSize,
    twitchId,
    exportFilter,
  );

  // this pre-caches the next page
  useExports(pagination.current + 1, pagination.pageSize, twitchId, exportFilter);

  const { data: videos, isLoading: isLoadingVideos, isError: isErrorVideos } = useVideos();

  if (isLoading || isLoadingVideos) {
    return <Table loading={true} columns={columns} dataSource={[]} pagination={pagination} />;
  }

  if (isErrorVideos?.status === 401 || isErrorVideos?.status === 404) {
    return <LoginInvitation />;
  }

  if (isError || isErrorVideos) {
    return <div>Error</div>;
  }

  const { exports, totalCount } = data;

  const paginator = {
    ...pagination,
    total: totalCount,
    showTotal: (total: number, range: number) => `${range[0]}-${range[1]} of ${total} items`,
    onChange: (page: number, pageSize: number) => {
      setPagination({
        current: page,
        pageSize,
      });
    },
  };

  const dataSource = exports.map((exportItem: any) => {
    const video = videos.find((videoItem: any) => videoItem.id === exportItem.videoId);
    // format the twitch thumbnail url
    const vod_thumbnail_url = video?.thumbnail_url
      ? video.thumbnail_url.replace('%{width}', '1280').replace('%{height}', '720')
      : 'https://apppillargg-misc-assets.s3.amazonaws.com/logomark.svg';

    const title = video?.title && video?.url ? <a href={video.url}>{video.title}</a> : 'Video';

    return {
      ...exportItem,
      endDate: exportItem.isDone ? exportItem.endDate : null,
      thumbnail_url: exportItem.thumbnail_url || vod_thumbnail_url,
      title,
      streamedAt: video?.created_at,
    };
  });

  return (
    <ConfigProvider renderEmpty={() => <ExportInvitation />}>
      <Table
        columns={columns}
        dataSource={dataSource}
        // @ts-ignore
        pagination={paginator}
      />
    </ConfigProvider>
  );
};

export default ExportsTable;
