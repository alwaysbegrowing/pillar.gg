import { DownOutlined, ExportOutlined, MailOutlined, YoutubeOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useUser } from '@/services/hooks/api';
import { Button, Menu, Dropdown, Popconfirm, message } from 'antd';
import { useIntl } from 'umi';
import { isDebugMode, showSuccessNotification } from '@/utils/utils';
import { sendClips, sendHubspotEvent } from '@/services/send';

const ExportWrapper = ({ children, onConfirm, title, okText, cancelText }: any) => {
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <Popconfirm
      title={title}
      onConfirm={confirm}
      okButtonProps={{ loading }}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  );
};

const startExport = async (
  videoId: string,
  clips: any,
  formatMessage: any,
  uploadToYoutube = false,
) => {
  const successMessage = formatMessage({ id: 'pages.editor.combineClips.successMessage' });

  const success = await sendClips(videoId, clips, uploadToYoutube);
  if (success) {
    return showSuccessNotification(successMessage);
  }
  return message.error(
    formatMessage({
      id: 'pages.editor.combineClips.error',
    }),
  );
};

const startYoutubeExport = async (
  twitch_id: number,
  videoId: string,
  clips: any,
  formatMessage: any,
) => {
  const resp = await fetch(`/api/youtube/isAuthValid?state=${twitch_id}`);
  if (resp.status === 401) {
    window.open(`/api/youtube/callback?state=${twitch_id}`, '_blank');
  }
  if (resp.status === 200) {
    startExport(videoId, clips, formatMessage, true);
  }
};

const ExportButton = ({ clips, videoId }: any) => {
  const { formatMessage } = useIntl();
  const { data } = useUser();

  const title = (
    <div>
      <div>
        {formatMessage({
          id: 'pages.editor.exportConfirmFile1',
        })}
      </div>
      <div>
        {formatMessage(
          {
            id: 'pages.editor.exportConfirmFile2',
          },
          { email: data?.email },
        )}
      </div>
      <div>
        {formatMessage({
          id: 'pages.editor.exportConfirmFile3',
        })}
      </div>
    </div>
  );
  const okText = formatMessage({ id: 'pages.editor.exportOkText' });
  const cancelText = formatMessage({
    id: 'pages.editor.exportCancelText',
  });

  const handleConfirmYouTube = async () => {
    if (data?.id) {
      sendHubspotEvent(data?.id, 'EXPORT_CLIP_EVENT', videoId);
    }
    await startYoutubeExport(data.id, videoId, clips, formatMessage);
  };

  const handleConfirmExport = async () => {
    if (data?.id) {
      sendHubspotEvent(data?.id, 'EXPORT_CLIP_EVENT', videoId);
    }
    await startExport(videoId, clips, formatMessage);
  };

  const menu = (
    <Menu>
      {isDebugMode() && (
        <Menu.Item key="youtube" icon={<YoutubeOutlined />}>
          <ExportWrapper
            onConfirm={handleConfirmYouTube}
            title={title}
            okText={okText}
            cancelText={cancelText}
          >
            Export to Youtube
          </ExportWrapper>
        </Menu.Item>
      )}
      <Menu.Item key="email" icon={<MailOutlined />}>
        <ExportWrapper
          onConfirm={handleConfirmExport}
          title={title}
          okText={okText}
          cancelText={cancelText}
        >
          Export to Email
        </ExportWrapper>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button type="default" icon={<ExportOutlined />}>
        Export Compilation <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ExportButton;
