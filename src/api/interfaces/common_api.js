/**
 *   通用模块   放置 通用的 接口
 */


import fetch from '../fetch';

import domainURL from '../urls';

import postFile from '../postFile';

//  带有进度条的上传过程
export function uploadFile(params, context) {
	return postFile({
		url: domainURL.uploadFile,
		method: 'post',
		params: params
	}, context);
}

// 获取session
export function getSessionUser(context) {
	return fetch({
		url: domainURL.getSessionUser,
		method: 'get',
		params: ''
	}, context);
}

// 获取分区列表
export function getAreaList(params, context) {
	return fetch({
		url: domainURL.getAreaList,
		method: 'post',
		params: params
	}, context);
}

// 保存附件（文件信息入库）
export function saveOrUpFiles(params, context) {
	return fetch({
		url: domainURL.saveOrUpFiles,
		method: 'post',
		params: params
	}, context);
}

// 获取附件（查询附件列表）
export function getDseUploadFileList(params, context) {
	return fetch({
		url: domainURL.getDseUploadFileList,
		method: 'post',
		params: params
	}, context);
}

// 根据业务主键删除附件（针对已经入库的附件）
export function deleteFilesByFileBiz(params, context) {
	return fetch({
		url: domainURL.deleteFilesByFileBiz,
		method: 'post',
		params
	}, context);
}

// 根据附件ID 删除附件
export function deleteFileById(params, context) {
	return fetch({
		url: domainURL.deleteFileById,
		method: 'post',
		params,
	}, context);
}

// 获取文件路径前缀
export function getFilePathUrl(params, context) {
	return fetch({
		url: domainURL.getFilePathUrl,
		method: 'post',
		params: params
	}, context);
}

// 获取图片路径前缀
export function getFilePathUrl_img(params, context) {
	return fetch({
		url: domainURL.getFilePathUrl_img,
		method: 'post',
		params: params
	}, context);
}
