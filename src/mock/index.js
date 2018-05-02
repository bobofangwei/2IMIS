import Mock from 'mockjs';
import MessageDetailApi from './messageDetail.js';
import BasicInforApi from './basicInfo.js';
import UserApi from './user.js';
import DayFormApi from './dayForm.js';
import VisualizedApi from './static.js';

Mock.mock(/\/api\/message\/messageDetail/, 'post', MessageDetailApi.getMessageDetail);
Mock.mock(/\/api\/message\/productList/, 'get', MessageDetailApi.getProductList);
/* 下面这些其实是有真实的线上接口的 */
Mock.mock(/\/api\/BaseController\/products/, 'get', BasicInforApi.getProductMap);
Mock.mock(/\/api\/BaseController\/provinces/, 'get', BasicInforApi.getProvinceMap);

Mock.mock(/\/api\/BaseController\/login/, 'post', UserApi.login);
Mock.mock(/\/api\/BaseController\/getUserInfo/, 'get', UserApi.getUserInfo);
Mock.mock(/\/api\/BaseController\/logout/, 'get', UserApi.logout);

Mock.mock(/\/api\/ReportFormsController\/getReportFormsByRegion/, 'post', DayFormApi.getReportFormsByRegion);
Mock.mock(/\/api\/ReportFormsController\/getReportFormsByProduct/, 'post', DayFormApi.getReportFormsByProduct);
Mock.mock(/\/api\/ReportFormsController\/getMonthReportFormsByRegion/, 'post', DayFormApi.getReportFormsByRegion);
Mock.mock(/\/api\/ReportFormsController\/getMonthReportFormsByProduct/, 'post', DayFormApi.getReportFormsByProduct);

Mock.mock(/\/api\/ReportFormsController\/visualizedProduct/, 'post', VisualizedApi.visualizedProduct);
export default Mock;
