<template>
	<el-form-item label="图片" prop="files" class="uploadWraper">
		<el-upload
			style="margin-top: 16px;"
			name="files"
			list-type="picture-card"
			multiple
			:disabled="disabled"
			:with-credentials="true"
			:action="upload.action"
			:data="data"
			:file-list="fileList"
			:on-success="_onHandlePictureSuccess"
			:on-preview="_onHandlePictureCardPreview"
			:on-remove="_onHandlePictureCardRemove"
		>
			<i class="el-icon-plus"></i>
		</el-upload>
		<!-- 禁用 -->
		<template v-if="disabled">
			<div class="mask" @click="_onHandleMask">&nbsp;</div>
		</template>
		<!-- 上传 -->
		<el-dialog :visible.sync="upload.visible" size="tiny"><img width="100%" :src="upload.imageUrl" alt="" /></el-dialog>
	</el-form-item>
</template>

<script>
import URLS from '../../api/urls';

export default {
	props: {
		disabled: {
			type: Boolean,
			default() {
				return true;
			}
		},
		data: {
			type: Object,
			default() {
				return { fileFirst: '' };
			}
		},
		fileList: {
			type: Array,
			default() {
				return [];
			}
		},
		files: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			upload: {
				action: URLS.uploadFiles,
				visible: false,
				imageUrl: ''
			},
			isNotDelay: true
		};
	},
	methods: {
		// 上传图片成功后返回
		_onHandlePictureSuccess(file) {
			const that = this;

			const { status, data } = file;
			if (status) {
				const [f] = Array.isArray(data) && data[0] ? data : [{}];

				// 追加图片
				// that.files.push(f);
				that.$emit('onHandlePictureSuccess', f);
			}
		},
		// 上传图片成功后预览
		_onHandlePictureCardPreview(file, fileList) {
			const that = this;

			const { url } = file;

			that.upload = {
				...that.upload,
				imageUrl: url,
				visible: true
			};
		},
		// 上传图片成功后删除
		_onHandlePictureCardRemove(file) {
			const that = this;
			
			that.$emit('onHandlePictureCardRemove', file);
			// const { response = {} } = file;
			// const { data = [] } = response;
			// const [{ filePath }] = Array.isArray(data) && data[0] ? data : [{}];

			// const files = that.files.filter((item = {}) => {
			// 	if (item.filePath === filePath) return false;
			// 	return true;
			// });
			// that.upload = {
			// 	...that.upload,
			// 	imageUrl: '',
			// 	visible: false
			// };
			// that.$emit('onHandlePictureCardRemove', files);
		},
		_onHandleMask() {
			const that = this;

			if (that.isNotDelay) {
				that.isNotDelay = false;

				const clearsettimeout = setTimeout(() => {
					that.isNotDelay = true;

					clearTimeout(clearsettimeout);
				}, 3000);

				that.$message.warning('先保存，再上传！');
			}
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.uploadWraper {
	width: 100% !important;

	.mask {
		position: absolute;
		top: 15px;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.1);
	}
}
</style>
