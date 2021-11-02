import React, { useContext, useState } from 'react';
import { Button, Image, Table, Spin, Pagination } from 'antd';
import { history } from 'umi';
import { DownloadOutlined } from '@ant-design/icons';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { DateTime } from 'luxon';

import { useExports } from '@/services/hooks/export';
import { useVideos } from '@/services/hooks/api';
import { GlobalContext } from '@/ContextWrapper';

interface ExportsTableProps {
  page: number;
  perPage: number;
}

const ExportsTable = ({ page }: ExportsTableProps) => {
  const [perPage, setPerPage] = useState(10);
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
            <React.Fragment>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              Done
            </React.Fragment>
          );
        }
        return (
          <React.Fragment>
            <Spin />
            {text}
          </React.Fragment>
        );
      },
    },
    {
      title: 'Render Start',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (start: Date) => {
        const fancyDate = DateTime.fromISO(start.toLocaleString());
        return fancyDate.toLocaleString(DateTime.DATETIME_SHORT);
      },
    },
    {
      title: 'Render End',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (end: Date) => {
        const fancyDate = DateTime.fromISO(end.toLocaleString());
        return fancyDate.toLocaleString(DateTime.DATETIME_SHORT);
      },
    },
    {
      title: 'Download',
      dataIndex: 'url',
      key: 'url',
      render: (url: any) => {
        if (url === null) {
          return (
            <Button disabled loading>
              Download
            </Button>
          );
        }

        return (
          <Button href={url}>
            <DownloadOutlined />
            Download
          </Button>
        );
      },
    },
  ];

  const dataSource = exports.map((exportItem: any) => {
    const video = videos.find((videoItem: any) => videoItem.id === exportItem.videoId);
    // format the twitch thumbnail url
    let thumbnail_url = 'https://apppillargg-misc-assets.s3.amazonaws.com/logomark.svg';
    if (video?.thumbnail_url) {
      thumbnail_url = video.thumbnail_url.replace('%{width}', '150').replace('%{height}', '84');
    }
    return {
      ...exportItem,
      thumbnail_url,
      name: video?.title || 'Video',
      progress: exportItem.progress,
    };
  });

  // @ts-ignore This is acceptable, ant design hasn't updated their types yet
  return <Table columns={columns} dataSource={dataSource} pagination={paginator} />;
};

export default ExportsTable;
