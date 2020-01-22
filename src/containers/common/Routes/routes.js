import OrganizationPopup from 'components/OrganizationPopup';
import AdminApp from 'containers/admin/App';
import GuideApp from 'containers/guide/App';
import PortalApp from 'containers/portal/App';
import Preview from 'containers/portal/Preview';
import PortalSingleModeApp from 'containers/portal/SingleModeApp';
import StoreApp from 'containers/store/App';

import { basicPath } from '../constants';

const routes = [
  {
    key: 0,
    path: '/',
    component: PortalApp,
    exact: true,
  },
  {
    key: 1,
    path: '/preview/page/:pageID',
    component: Preview,
    exact: true,
  },
  {
    key: 2,
    path: `/${basicPath.PAGE}/:PAGE_ID`,
    component: PortalApp,
    exact: true,
  },
  {
    key: 3,
    path: `/${basicPath.APPS}/:PAGE_ID`,
    component: PortalApp,
    exact: false,
  },
  {
    key: 4,
    path: `/${basicPath.SINGLE}/:PAGE_ID`,
    component: PortalSingleModeApp,
    exact: false,
  },
  {
    key: 5,
    path: '/portal/settings',
    component: PortalApp,
    exact: false,
  },
  {
    key: 6,
    path: '/',
    component: PortalApp,
    exact: false,
  },
  {
    key: 7,
    path: '/store',
    component: StoreApp,
    exact: false,
  },
  {
    key: 8,
    path: '/portal/store',
    component: PortalApp,
    exact: false,
  },
  {
    key: 9,
    path: '/portal/card',
    component: PortalApp,
    exact: false,
  },
  {
    key: 10,
    path: '/admin',
    component: AdminApp,
    exact: false,
  },
  {
    key: 11,
    path: '/guide',
    component: GuideApp,
    exact: false,
  },
  {
    key: 12,
    path: '/popup/organization/:lang/:deptId/:userId',
    component: OrganizationPopup,
    exact: true,
  },
  {
    key: 13,
    path: '/popup/organization/:lang/:deptId',
    component: OrganizationPopup,
    exact: true,
  },
  {
    key: 13,
    path: '/error',
    component: PortalApp,
    exact: false,
  },
];

export default routes;
