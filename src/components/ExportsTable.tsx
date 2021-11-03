import React, { useContext, useState } from 'react';
import { Button, Image, Table, Spin, Pagination, /*Popover, Typography,*/ Progress } from 'antd';
import { history } from 'umi';
import { DownloadOutlined /*InfoCircleOutlined*/ } from '@ant-design/icons';
import { DateTime /*Duration*/ } from 'luxon';
// import humanizeDuration from 'humanize-duration';

import { useExports } from '@/services/hooks/export';
import { useVideos } from '@/services/hooks/api';
import { GlobalContext } from '@/ContextWrapper';

interface ExportsTableProps {
  page: number;
  perPage: number;
}

const ExportsTable = ({ page }: ExportsTableProps) => {
  const [perPage, setPerPage] = useState(5);
  const { twitchId } = useContext(GlobalContext);

  const { data, isLoading, isError } = useExports(page, perPage, twitchId);
  const { data: videos, isLoading: isLoadingVideos, isError: isErrorVideos } = useVideos();

  if (isLoading || isLoadingVideos) {
    return <Spin />;
  }

  if (isError || isErrorVideos) {
    return <div>Error</div>;
  }

  const onShowSizeChange = (current: number, n: number) => {
    setPerPage(n);
  };

  const onPageChange = (pageNumber: number) => {
    history.push(`/exports?page=${pageNumber}&perPage=${perPage}`);
  };

  const { exports, totalCount } = data;

  const paginator = (
    <Pagination
      showSizeChanger
      onChange={onPageChange}
      onShowSizeChange={onShowSizeChange}
      pageSize={perPage}
      total={totalCount}
      current={page}
    />
  );

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
    // {
    //   title: 'Export Type',
    //   dataIndex: 'type',
    //   key: 'type',
    //   render: (text: string) => {
    //     // capitalize the first letter
    //     return text.charAt(0).toUpperCase() + text.slice(1);
    //   },
    // },
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
        return <Progress width={50} type="circle" percent={progress} />;
      },
    },
    // {
    //   title: 'Render Time',
    //   dataIndex: 'renderTime',
    //   key: 'renderTime',
    //   render: (millis: number) => {
    //     const humanizedText = humanizeDuration(millis, { round: true, largest: 2 });
    //     const fullDuration = Duration.fromMillis(millis).toFormat('hh:mm:ss.SS');
    //     return (
    //       <Typography.Text>
    //         {humanizedText}{' '}
    //         <Popover content={fullDuration}>
    //           {' '}
    //           <InfoCircleOutlined />{' '}
    //         </Popover>
    //       </Typography.Text>
    //     );
    //   },
    // },
    // {
    //   title: 'Start Time',
    //   dataIndex: 'startDate',
    //   key: 'startDate',
    //   render: (start: Date) => {
    //     return DateTime.fromISO(start.toLocaleString()).toLocaleString(DateTime.DATETIME_SHORT);
    //   },
    // },
    {
      // title: 'Finish Time',
      title: 'Exported At',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (end: any) => {
        if (end === null) {
          return '-';
        }
        return DateTime.fromISO(end.toLocaleString()).toLocaleString(DateTime.DATETIME_SHORT);
      },
    },
    {
      title: 'Download',
      dataIndex: 'url',
      key: 'url',
      render: (url: any) => {
        if (url === null) {
          return null;
        }

        return (
          <Button href={url}>
            <DownloadOutlined />
          </Button>
        );
      },
    },
  ];

  const dataSource = exports.map((exportItem: any) => {
    const video = videos.find((videoItem: any) => videoItem.id === exportItem.videoId);
    // format the twitch thumbnail url
    const vod_thumbnail_url = video?.thumbnail_url
      ? video.thumbnail_url.replace('%{width}', '1280').replace('%{height}', '720')
      : 'https://apppillargg-misc-assets.s3.amazonaws.com/logomark.svg';

    // get the render time.
    const start = DateTime.fromISO(exportItem.startDate);
    const end = DateTime.fromISO(exportItem.endDate);

    const renderTime = end.diff(start, ['milliseconds']).toObject();

    const title = video?.title && video?.url ? <a href={video.url}>{video.title}</a> : 'Video';

    const url = exportItem.url;

    return {
      ...exportItem,
      url,
      endDate: exportItem.isDone ? exportItem.endDate : null,
      thumbnail_url: exportItem.thumbnail_url || vod_thumbnail_url,
      title,
      streamedAt: video?.created_at,
      progress: exportItem.progress,
      renderTime: renderTime.milliseconds || 0,
      type: exportItem.uploadType,
    };
  });

  // @ts-ignore This is acceptable, ant design hasn't updated their types yet
  return <Table columns={columns} dataSource={dataSource} pagination={paginator} />;
};

export default ExportsTable;
