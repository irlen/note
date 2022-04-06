# vue工程
### vue项目打包部署到apache
针对vue-cli4版本项目
1.在vue.config.js中加入
configureWebpack: config=>{
  if(process.env.NODE_ENV === 'production'){
    assetsPublicPath: '/项目名haha/'
  }
}

2.router中的配置
Router({
  //********加上这一行**********
  base: '/项目名haha/'
})

3.打包丢到服务器的haha文件夹下，把所有的请求全部转发到http://www.xxx.com/haha/index.html上

4.打包后的文件夹中（与index.html同级）新建文件.htaccess(windows需要用命令行来建)
文件内容
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /haha/
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /haha/index.html [L]
</IfModule>
或者
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
	RewriteCond %{ENV:REDIRECT_STATUS} ^$
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]

</IfModule>




### vite,vue3.0项目打包到apache
//如果apache中的根目录为/m


1.router.js中配置
const router = createRouter({
	history: createWebHistory('/m/'),
	routes,
})
2. vite.config.js (配置base为目录地址’/m/’)
import vue from '@vitejs/plugin-vue'
export default({
	// 起个别名，在引用资源时，可以用‘@/资源路径’直接访问

	plugins: [
		vue(),
	],
	base: '/m/',
})     
3. 修改Apache中httpd.conf文件，开启rewrite_module功能:    
LoadModule rewrite_module libexec/apache2/mod_rewrite.so，去掉前面的#，打开注释。

找到 AllowOverride None 的那行，把它改成 AllowOverride All，来使 .htaccess 文件生效。

在apache的www/m目录下创建.htaccess文件，内容为
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /m/index.html [L]
</IfModule>
最后将打包文件放到根目录
