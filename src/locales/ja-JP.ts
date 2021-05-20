import component from './ja-JP/component';
import globalHeader from './ja-JP/globalHeader';
import menu from './ja-JP/menu';
import pwa from './ja-JP/pwa';
import pages from './ja-JP/pages';

export default {
  'navBar.lang': '言語',
  'layout.user.link.help': '助けて',
  'layout.user.link.privacy': 'プライバシー',
  'layout.user.link.terms': '条項',
  'app.preview.down.block': 'このページをローカルプロジェクトにダウンロードします',
  'app..link.fetch-blocks': 'すべてのブロックを取得',
  'app.welcome.link.block-list': ' 「ブロック」開発に基づいた標準のページをすばやく作成する',
  ...globalHeader,
  ...menu,
  ...pwa,
  ...component,
  ...pages,
};
