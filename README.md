#Blog-OS
<hr>
####这是一个基于
Node.js平台 + 
express框架 + 
mongoDb数据库的多人博客系统/社交网络
<hr>
####功能描述：
+ 多用户
+ 实时（RealTime）
+ 个人控制
 - 编辑个人信息
 - 添加头像
 - pv统计
 - 管理自己发布的文章
+ 标签
+ 分页
+ markdown发布文章
+ 归档
+ markdown留言
+ markdown评论
+ 可视化文本编辑器
+ 文章检索
+ 管理员后台

<hr>
更新日期： 2013.6.9
<hr>

####你可以选择Quick Start参照例子自己创建blogos：

+ 生成一个目录
<pre>
    mkdir myblog 
</pre>
+ 安装express模块（在此之前你需要安装Node.js）
<pre>
    npm install -g express
</pre>    
+ 建立express应用框架
<pre>
    express -e ejs blogos
</pre>    
+ 更新依赖模块
<pre>
    cd blog&&npm install
</pre>  
  
####或者直接使用这个例子

+ 进入mongodb/bin，开启mongoDb数据库
<pre>
    cd mongodb/bin
    mongod -dbpath "/home/username/myblog/datebase" 
</pre>
+ 启动应用
<pre>
    cd myblog/blogos
    node app.js
</pre>
