import { createRouter, createWebHistory } from 'vue-router';

import AllFile from '../views/AllFile.vue'
import BaseData from'../views/BaseData.vue'
import ClientInfo from '../views/ClientInfo.vue'
import ExcepTion from '../views/ExcepTion.vue';
import FlowAnalyzer from '../views/FlowAnalyzer.vue'
import FtpData from '../views/FtpData.vue'
import FtpFile from '../views/FtpFile.vue'
import IpMap from '../views/IpMap.vue'
import MailData from '../views/MailData.vue'
import MailFile from '../views/MailFile.vue'
//import MailParseData from '../views/MailParseData.vue'
import Protoanalyzer from '../views/Protoanalyzer.vue'
import SenData from '../views/SenData.vue'
import TelnetData from '../views/TelnetData.vue'
import WebData from '../views/WebData.vue'
import WebFile from '../views/WebFile.vue'
import Upload from '../views/Upload.vue';
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Upload,
  },
  {
    path: '/basedata',
    name: 'BaseData',
    component: BaseData
  },
  {
    path: '/protoanalyzer',
    name: 'Protoanalyzer',
    component: Protoanalyzer
  },
  {
    path: '/allfile',
    name: 'AllFile',
    component: AllFile
  },
  {
    path: '/clientinfo',
    name: 'ClientInfo',
    component: ClientInfo
  },
  {
    path: '/exception',
    name: 'ExcepTion',
    component: ExcepTion
  },
  {
    path: '/flowanalyzer',
    name: 'FlowAnalyzer',
    component: FlowAnalyzer
  },
  {
    path: '/ftpdata',
    name: 'FtpData',
    component: FtpData
  },
  {
    path: '/ftpfile',
    name: 'FtpFile',
    component: FtpFile
  },
  {
    path: '/ipmap',
    name: 'IpMap',
    component: IpMap
  },
  {
    path: '/maildata',
    name: 'MailData',
    component: MailData
  },
  {
    path: '/mailfile',
    name: 'MailFile',
    component: MailFile
  },
  // {
  //   path: '/mailparsedata',
  //   name: 'MailParseData',
  //   component: MailParseData
  // },
  {
    path: '/sendata',
    name: 'SenData',
    component: SenData
  },
  {
    path: '/telnetdata',
    name: 'TelnetData',
    component: TelnetData
  },
  {
    path: '/webdata',
    name: 'WebData',
    component: WebData
  },
  {
    path: '/webfile',
    name: 'WebFile',
    component: WebFile
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

