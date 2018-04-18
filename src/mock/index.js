import Mock from 'mockjs';
import MessageDetailApi from './messageDetail.js';

Mock.mock(/\/api\/message\/messageDetail/, 'post', MessageDetailApi.getMessageDetail);
Mock.mock(/\/api\/message\/productList/, 'get', MessageDetailApi.getProductList);
export default Mock;
