#Blog-OS

####这是一个基于
Node.js平台 + 
express框架 + 
mongoDb数据库的多人博客系统/社交网络
<hr>
####bugs fixed && add modules

2013.6.14 修正了标签显示不正确问题

####bugs

2013.6.15 搜索关键词未过滤会导致应用错误崩溃。尚未解决，方案：在路由中添加过滤再传递给search

2013.6.14 单篇文章路径与指定用户的指定标签路径冲突，默认会调用前一项handle而忽略后面的handle，从而导致页面访问错误。 暂时解决方案：取消用户指定标签功能。

2013.6.14 发布文章时，标题和标签的末尾出现空格会导致单篇文章页面访问出错。 尚未解决，方案： 在路由中对传输的数据做预处理保证满足规格（自动将末尾的空格去掉）
<hr>
####关于UI优化

未来会使用前端框架Bootstrap重构页面。由于该项目当前仅仅是个例子，所以并没有对UI做任何修饰。
<hr>
####最终功能描述：
+ 多用户
+ 实时（RealTime）
+ 个人控制
 - 编辑个人信息
 - 添加头像:头像引自gravatar，可到gravatar上选定头像然后将邮箱填写正确 
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
+ 注册：在注册时最好填写关联gravatar的邮箱以确保头像的正确引用！
<hr>

####当前实现：

+ 多用户
+ 标签
+ 分页
+ markdown
+ 归档
+ 发布文章
+ 留言（评论）
+ pv统计
+ 文章搜索
<hr>

####更新日期： 

+ 2013.6.9
+ 2013.6.14
+ 2013.6.15
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
  
####或者直接使用我已經做好的这个例子

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
