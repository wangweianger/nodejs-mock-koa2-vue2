/*
 Navicat Premium Data Transfer

 Source Server         : 测试数据库
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : mock_zane_cms

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 10/19/2017 12:33:29 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `mock_api`
-- ----------------------------
DROP TABLE IF EXISTS `mock_api`;
CREATE TABLE `mock_api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL COMMENT '接口标题',
  `apiUrl` varchar(200) NOT NULL COMMENT '接口请求地址',
  `projectName` varchar(50) DEFAULT NULL COMMENT '项目英文名',
  `projectId` int(11) DEFAULT '0' COMMENT '所属项目的ID',
  `type` varchar(10) NOT NULL DEFAULT 'POST' COMMENT 'http请求方式 GET  POST',
  `twoCatalogId` int(11) DEFAULT '0' COMMENT '二级目录',
  `threeCatalogId` int(11) DEFAULT '0' COMMENT '三级目录',
  `sort` int(11) DEFAULT '1' COMMENT '排序：越大就越在前面',
  `request` text COMMENT '请求json参数',
  `requestjson` text COMMENT '请求表格json',
  `response` text COMMENT '返回json参数',
  `briefDesc` varchar(200) DEFAULT NULL COMMENT '简要描述',
  `text` text COMMENT 'api接口详情',
  `html` text COMMENT '页面html内容',
  `restype` tinyint(1) DEFAULT '1' COMMENT '默认为返回值为JSON，JSON:1  HTML:2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mock_api`
-- ----------------------------
BEGIN;
INSERT INTO `mock_api` VALUES ('8', '获取用户列表', 'api/getUserList/getList', 'SCM', '2', 'POST', '0', '0', '1', '{\"desc\":\"成功\",\"data\":{\"totalNum\":\"1\",\"pageNo\":\"1\",\"pageSize\":\"20\"}}', '[{\"requestEnName\":\"desc\",\"requestCnName\":\"\",\"isRequired\":\"false\",\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"成功\"},{\"requestEnName\":\"data\",\"requestCnName\":\"\",\"isRequired\":\"false\",\"explain\":\"\",\"type\":\"object\",\"defaultVal\":\"{\"totalNum\":\"1\",\"pageNo\":\"1\",\"pageSize\":\"20\"}\",\"isSlide\":\"true\",\"childList\":[{\"requestEnName\":\"totalNum\",\"requestCnName\":\"\",\"isRequired\":\"false\",\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"1\"},{\"requestEnName\":\"pageNo\",\"requestCnName\":\"\",\"isRequired\":\"false\",\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"1\"},{\"requestEnName\":\"pageSize\",\"requestCnName\":\"\",\"isRequired\":\"false\",\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"20\"}]}]', '{\"code\":\"1000\",\"desc\":\"成功\",\"tid\":\"d88d1ccc-8df8-4785-be68-d955ed3a413d\",\"data\":{\"totalNum\":\"1\",\"record\":[{\"storeCode\":\"000001\",\"storeName\":\"南山店\",\"manager\":\"obama\",\"email\":\"123@qq.com\",\"tel\":\"18779885555\",\"level\":\"0\",\"model\":\"0\",\"stockModel\":\"0\",\"address\":\"深圳市南山区\",\"status\":\"OPEN\",\"isFree\":\"0\"}],\"pageNo\":\"1\",\"pageSize\":\"20\"}}', '获取用户列表信息', '', '', '1'), ('9', '获取用户列表', 'api/getlist', 'OMS', '1', 'POST', '10', '0', '1', '{\"name\":\"wangwe\",\"type\":[{\"name\":\"wangwei\",\"age\":11}]}', '[{\"requestEnName\":\"name\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"wangwe\"},{\"requestEnName\":\"type\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"array(object)\",\"isSlide\":true,\"childList\":[{\"requestEnName\":0,\"requestCnName\":\"数组索引0\",\"isRequired\":false,\"explain\":\"\",\"type\":\"object\",\"isSlide\":true,\"childList\":[{\"requestEnName\":\"name\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"wangwei\"},{\"requestEnName\":\"age\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"string\",\"defaultVal\":11}],\"defaultVal\":\"{}\"}],\"defaultVal\":\"[{},{},...]\"}]', '{\"code\":1000,\"data\":{\"orderAddress\":{\"buyerRemark\":\"\",\"cityCode\":\"\",\"cityName\":\"\",\"consignee\":\"罗博荟\",\"detailAddress\":\"南山科技园\",\"districtCode\":\"\",\"districtName\":\"\",\"idCard\":\"43062119891218043X\",\"orderId\":0,\"orderNo\":\"SO1609021141181700000\",\"outOrderNo\":\"outOrderNo60\",\"phone\":\"13113029827\",\"provinceCode\":\"\",\"provinceName\":\"\",\"sellerRemark\":\"\",\"streetAddress\":\"南山科技园\",\"zipCode\":\"\",\"zoneId\":\"518100\"},\"orderInfo\":\"{}\",\"orderPackage\":{\"buyerAccount\":\"test001\",\"buyerRemark\":\"\",\"createTime\":\"2016-09-0211:41:21\",\"deleteFlag\":0,\"deliveryType\":\"BONDED\",\"discountFee\":4,\"freezeFlag\":0,\"goodsFee\":400,\"logisticsCompany\":\"\",\"logisticsFee\":21,\"logisticsOrderNo\":\"\",\"logisticsStatus\":\"\",\"mark\":\"\",\"omsPackageCode\":\"PA1609021141201700004\",\"omsPackageId\":49,\"orderNo\":\"SO1609021141181700000\",\"orderType\":\"B2C\",\"packageRemark\":\"\",\"packageStatus\":\"\",\"partnerId\":\"12345656\",\"payNo\":\"SP1609081108061080000\",\"payTime\":\"2016-09-0211:41:22\",\"payType\":\"ALIPAY\",\"performStatus\":\"\",\"saleServiceFlag\":0,\"secondPayFlag\":0,\"secondPayStatus\":\"\",\"sellerId\":\"248\",\"sellerRemark\":\"\",\"shippedTime\":\"{}\",\"signTime\":\"{}\",\"signType\":\"\",\"sourceStatus\":\"1\",\"taxation\":0,\"totalFee\":396,\"tradeNo\":\"\",\"updateTime\":\"{}\",\"warehouseCode\":\"GZNS\"},\"orderTrack\":[{\"createTime\":\"2016-09-0720:35:42\",\"modifyTime\":\"2016-09-0720:35:42\",\"omsPackageTrackId\":38,\"omsPackageTrackRemark\":\"推送广州国检成功\",\"omsPackageTrackStatus\":\"PUSHING_PAYPLATFORM\",\"omsPackageTrackTime\":\"2016-09-0720:35:42\",\"omsPackageTrackType\":\"OMS_TRACK\",\"packageCode\":\"PA1609021141201700004\"}],\"packageItemList\":[{\"amount\":2,\"buySkuId\":0,\"omsPackageCode\":\"PA1609021141201700004\",\"omsPackageItemId\":53,\"productDiscountFee\":4,\"productId\":0,\"productName\":\"测试商品1\",\"productPrice\":200,\"stock\":0,\"taxation\":125,\"totalFee\":400,\"upc\":\"\"}],\"sysOperList\":[{\"createTime\":\"2016-09-0520:44:43\",\"currentStatus\":\"AUDIT\",\"id\":165,\"modifyStatus\":\"PUSHING_WAREHOUSE\",\"operType\":\"S\",\"operator\":\"system_user\",\"packageCode\":\"PA1609021141201700004\",\"packageId\":62,\"remark\":\"推单操作触发\"}],\"userOperList\":[{\"createTime\":\"2016-09-0510:13:27\",\"currentStatus\":\"SUBMITTED\",\"id\":137,\"modifyStatus\":\"SUBMITTED\",\"operType\":\"U\",\"operator\":\"\",\"packageCode\":\"PA1609021141201700004\",\"packageId\":47,\"remark\":\"BLUE\"}]},\"desc\":\"成功\",\"tid\":\"aa052f52-d7a1-425d-8504-da39853aef2a\"}', '获取用户列表详情', '\n    \n**简要描述：**\n\n- 用户注册接口\n\n**请求URL：** \n- ` http://xx.com/api/user/register `\n  \n**请求方式：**\n- POST \n\n**参数：** \n\n|参数名|必选|类型|说明|\n|:----    |:---|:----- |-----   |\n|username |是  |string |用户名   |\n|password |是  |string | 密码    |\n|name     |否  |string | 昵称    |\n\n **返回示例**\n\n``` \n  {\n    \"error_code\": 0,\n    \"data\": {\n      \"uid\": \"1\",\n      \"username\": \"12154545\",\n      \"name\": \"吴系挂\",\n      \"groupid\": 2 ,\n      \"reg_time\": \"1436864169\",\n      \"last_login_time\": \"0\",\n    }\n  }\n```\n\n **返回参数说明** \n\n|参数名|类型|说明|\n|:-----  |:-----|-----                           |\n|groupid |int   |用户组id，1：超级管理员；2：普通用户  |\n\n **备注** \n\n- 更多返回错误代码请看首页的错误代码描述\n\n\n', '<p><strong>简要描述：</strong></p>\n<ul>\n<li>用户注册接口</li>\n</ul>\n<p><strong>请求URL：</strong></p>\n<ul>\n<li><code>http://xx.com/api/user/register</code></li>\n</ul>\n<p><strong>请求方式：</strong></p>\n<ul>\n<li>POST</li>\n</ul>\n<p><strong>参数：</strong></p>\n<table>\n<thead>\n<tr>\n<th style=\"text-align:left\">参数名</th>\n<th style=\"text-align:left\">必选</th>\n<th style=\"text-align:left\">类型</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:left\">username</td>\n<td style=\"text-align:left\">是</td>\n<td style=\"text-align:left\">string</td>\n<td>用户名</td>\n</tr>\n<tr>\n<td style=\"text-align:left\">password</td>\n<td style=\"text-align:left\">是</td>\n<td style=\"text-align:left\">string</td>\n<td>密码</td>\n</tr>\n<tr>\n<td style=\"text-align:left\">name</td>\n<td style=\"text-align:left\">否</td>\n<td style=\"text-align:left\">string</td>\n<td>昵称</td>\n</tr>\n</tbody>\n</table>\n<p><strong>返回示例</strong></p>\n<pre class=\"hljs\"><code class=\"\">  {\n    &quot;error_code&quot;: 0,\n    &quot;data&quot;: {\n      &quot;uid&quot;: &quot;1&quot;,\n      &quot;username&quot;: &quot;12154545&quot;,\n      &quot;name&quot;: &quot;吴系挂&quot;,\n      &quot;groupid&quot;: 2 ,\n      &quot;reg_time&quot;: &quot;1436864169&quot;,\n      &quot;last_login_time&quot;: &quot;0&quot;,\n    }\n  }\n</code></pre>\n<p><strong>返回参数说明</strong></p>\n<table>\n<thead>\n<tr>\n<th style=\"text-align:left\">参数名</th>\n<th style=\"text-align:left\">类型</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:left\">groupid</td>\n<td style=\"text-align:left\">int</td>\n<td>用户组id，1：超级管理员；2：普通用户</td>\n</tr>\n</tbody>\n</table>\n<p><strong>备注</strong></p>\n<ul>\n<li>更多返回错误代码请看首页的错误代码描述</li>\n</ul>\n', '1'), ('10', '获得订单列表', 'api/getOrderList', 'OMS', '1', 'POST', '10', '0', '1', '{\"code\":1000,\"desc\":\"成功\",\"tid\":\"263a65ea-b79c-456b-ab98-70213a00296e\"}', '[{\"requestEnName\":\"code\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"string\",\"defaultVal\":1000},{\"requestEnName\":\"desc\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"成功\"},{\"requestEnName\":\"tid\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"263a65ea-b79c-456b-ab98-70213a00296e\"}]', '{\"code\":1000,\"desc\":\"成功\",\"tid\":\"263a65ea-b79c-456b-ab98-70213a00296e\",\"data\":{\"storeCode\":\"01\",\"storeName\":\"wangwei\",\"companyCode\":\"daojia\",\"tel\":\"8855234\",\"address\":\"深圳市南山区\"}}', null, null, null, '1'), ('12', '获得xml信息', 'xml', 'OMS', '1', 'POST', '0', '0', '1', '{\"\":\"\"}', '[{\"requestEnName\":\"\",\"requestCnName\":\"\",\"isRequired\":false,\"explain\":\"\",\"type\":\"string\",\"defaultVal\":\"\"}]', '<xml class=\"age\">\n    wangwei\n    <p>age:20</p>\n</xml>', 'xml', null, null, '2');
COMMIT;

-- ----------------------------
--  Table structure for `mock_catalog`
-- ----------------------------
DROP TABLE IF EXISTS `mock_catalog`;
CREATE TABLE `mock_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '目录名称',
  `parentId` int(11) DEFAULT '0' COMMENT '父ID',
  `projectId` int(11) DEFAULT '0' COMMENT '对应的项目ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mock_catalog`
-- ----------------------------
BEGIN;
INSERT INTO `mock_catalog` VALUES ('10', '订单离别2', '0', '1'), ('18', '目录一', '0', '2'), ('19', '目录二', '0', '2'), ('21', '一级目录', '0', '7'), ('22', '二级目录', '21', '7');
COMMIT;

-- ----------------------------
--  Table structure for `mock_nav`
-- ----------------------------
DROP TABLE IF EXISTS `mock_nav`;
CREATE TABLE `mock_nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '导航title',
  `type` tinyint(1) unsigned zerofill DEFAULT '1' COMMENT '展示类型： 1-接口页面  2-一级类目 3-二级类目',
  `apiId` int(11) DEFAULT NULL COMMENT '类型为1时对应的内容id',
  `parentId` int(11) DEFAULT '0' COMMENT '类型为2,3时对应的父分类ID',
  `projectId` int(11) NOT NULL COMMENT '所属项目ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `mock_project`
-- ----------------------------
DROP TABLE IF EXISTS `mock_project`;
CREATE TABLE `mock_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectEnName` varchar(30) DEFAULT NULL COMMENT '项目英文名称',
  `projectName` varchar(30) NOT NULL DEFAULT '' COMMENT '项目名称',
  `projectDescribe` varchar(200) DEFAULT '' COMMENT '项目描述',
  `isDetele` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除项目   0：未删除  1：已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mock_project`
-- ----------------------------
BEGIN;
INSERT INTO `mock_project` VALUES ('1', 'OMS', 'OMS订单系统', 'oms订单的', '0'), ('2', 'SCM', 'SCM供应链系统', '这是我个人的项目', '0'), ('7', 'xiangmu', '新项目', '我的项目', '0');
COMMIT;

-- ----------------------------
--  Table structure for `mock_temp`
-- ----------------------------
DROP TABLE IF EXISTS `mock_temp`;
CREATE TABLE `mock_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tempName` varchar(30) DEFAULT '' COMMENT '模板名称',
  `tempVal` text COMMENT '模板内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mock_temp`
-- ----------------------------
BEGIN;
INSERT INTO `mock_temp` VALUES ('1', '插入API接口模版', '\n    \n**简要描述：** \n\n- 用户注册接口\n\n**请求URL：** \n- ` http://xx.com/api/user/register `\n  \n**请求方式：**\n- POST \n\n**参数：** \n\n|参数名|必选|类型|说明|\n|:----    |:---|:----- |-----   |\n|username |是  |string |用户名   |\n|password |是  |string | 密码    |\n|name     |否  |string | 昵称    |\n\n **返回示例**\n\n``` \n  {\n    \"error_code\": 0,\n    \"data\": {\n      \"uid\": \"1\",\n      \"username\": \"12154545\",\n      \"name\": \"吴系挂\",\n      \"groupid\": 2 ,\n      \"reg_time\": \"1436864169\",\n      \"last_login_time\": \"0\",\n    }\n  }\n```\n\n **返回参数说明** \n\n|参数名|类型|说明|\n|:-----  |:-----|-----                           |\n|groupid |int   |用户组id，1：超级管理员；2：普通用户  |\n\n **备注** \n\n- 更多返回错误代码请看首页的错误代码描述\n\n\n'), ('3', '插入数据字典模版', '-  用户表，储存用户信息\n\n|参数名|必选|类型|说明|\n|:----    |:---|:----- |-----   |\n|uid	  |int(10)     |否	|	 |	           |\n|username |varchar(20) |否	|    |	 用户名	|\n|password |varchar(50) |否   |    |	 密码		 |\n|name     |varchar(15) |是   |    |    昵称     |\n|reg_time |int(11)     |否   | 0  |   注册时间  |\n\n\n\n\n');
COMMIT;

-- ----------------------------
--  Table structure for `mock_user`
-- ----------------------------
DROP TABLE IF EXISTS `mock_user`;
CREATE TABLE `mock_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(20) NOT NULL DEFAULT '' COMMENT '用户密码',
  `secret` varchar(50) NOT NULL COMMENT '用户登录密钥',
  `type` varchar(10) DEFAULT 'user' COMMENT '用户级别： admin 管理员  user:用户',
  `projectIds` varchar(1000) DEFAULT '' COMMENT '用户所拥有的系统列表',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mock_user`
-- ----------------------------
BEGIN;
INSERT INTO `mock_user` VALUES ('1', 'wangwei', '123456', '6080CD35D6BE19196B1506EF8B17E654', 'admin', ''), ('2', 'wangweianger', '11', 'E0B2A0B517437B2D4EAF31BAA7C7118F', 'user', '1,2'), ('3', 'zane', '123456', '32D9E2A0331BC8A6F4AAF942046A13DD', 'admin', '1,2,7,0');
COMMIT;

-- ----------------------------
--  Table structure for `mock_user_project`
-- ----------------------------
DROP TABLE IF EXISTS `mock_user_project`;
CREATE TABLE `mock_user_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL COMMENT '用户ID',
  `parjectIds` int(11) DEFAULT NULL COMMENT '项目ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
