import React, { useContext } from 'react';
import { Button, Col, Image, Table, Row, Spin } from 'antd';
import { history } from 'umi';
import {
  // DoubleRightOutlined,
  DownloadOutlined,
  DoubleLeftOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { DateTime } from 'luxon';

import { useExports } from '@/services/hooks/export';
import { useVideos } from '@/services/hooks/api';
import { GlobalContext } from '@/ContextWrapper';

interface ExportsPaginatorProps {
  page: number;
  perPage: number;
  items: number;
}

const ExportsPaginator = ({ page, perPage, items }: ExportsPaginatorProps) => {
  const toStart = () => {
    history.push(`/exports?page=1&perPage=${perPage}`);
  };

  const incrementPage = () => {
    const newPage = page + 1;
    history.push(`/exports?page=${newPage}&perPage=${perPage}`);
  };

  const decrementPage = () => {
    const newPage = page - 1;
    history.push(`/exports?page=${newPage}&perPage=${perPage}`);
  };

  const leftDisabled = page === 1;
  const rightDisabled = items < perPage;

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button disabled={leftDisabled} onClick={toStart}>
            <DoubleLeftOutlined />
          </Button>
        </Col>
        <Col>
          <Button disabled={leftDisabled} onClick={decrementPage}>
            <LeftOutlined />
          </Button>
        </Col>
        <Col>
          <Button disabled={rightDisabled} onClick={incrementPage}>
            <RightOutlined />
          </Button>
        </Col>
        {/* Need to find a way to make a to end button work */}
        {/* <Col>
          <Button disabled={rightDisabled} onClick={incrementPage}>
            <DoubleRightOutlined />
          </Button>
        </Col> */}
      </Row>
    </React.Fragment>
  );
};

interface ExportsTableProps {
  page: number;
  perPage: number;
}

const ExportsTable = ({ page, perPage }: ExportsTableProps) => {
  const { twitchId } = useContext(GlobalContext);

  const { data, isLoading, isError } = useExports(page, perPage, twitchId);
  const { data: videos, isLoading: isLoadingVideos, isError: isErrorVideos } = useVideos();

  if (isLoading || isLoadingVideos) {
    return <Spin />;
  }

  if (isError || isErrorVideos) {
    return <div>Error</div>;
  }

  const { exports /*, totalCount*/ } = data;

  // const numPages = Math.ceil(totalCount / perPage);

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

  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={dataSource} pagination={{ position: [] }} />
        </Col>
      </Row>
      <Row style={{ marginTop: '1rem' }} justify="end">
        <Col>
          <ExportsPaginator items={exports.length} page={page} perPage={perPage} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ExportsTable;
