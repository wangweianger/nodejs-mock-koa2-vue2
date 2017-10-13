// 其他配置

fis.media('qa').match('dist/test/**', {
	deploy: fis.plugin('http-push', {
		receiver: 'http://dev-upload.morning-star.cn/receiver',
		to: '../../html/wangwei', // 注意这个是指的是测试机器的路径，而非本地机器
		data: {
			base: 'dist/test'
		}
	})
});