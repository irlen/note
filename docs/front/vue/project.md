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
