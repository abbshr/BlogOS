#Blog-OS

####这是一个基于
Node.js平台 + 
JavaScript语言 + 
MongoDb数据库的多人博客系统/社交网络
<hr>

####目前项目已部署到appfog云服务上，地址：http://blog-os.tk

<hr>

####bugs fixed && update

2013.6.14 修正了标签显示不正确问题

2013.6.16 修正了头像显示失败问题

2013.6.19 修正了标签未过滤、标题未过滤、注册信息未过滤问题

2013.6.23 重写路由routes模块，方便以后管理；添加删除文章功能

2013.6.24 在appfog托管成功~

2013.6.25 添加管理员后台（Root）功能，重写User和Post模型，新增Admin模型；修正搜索功能：根据关键词搜索与指定用户、标签、标题相关的文章

2013.6.26 创建前端JavaScript脚本，用来初始化应用（当前包含放缩图片至标准、内容预览）和获取后期应用对象，#注：该文件当前并未引入应用，原因是未作优化与debug

2013.6.27 添加文章修改功能；修正文章发布空标题出错问题

2013.6.30 修正数据库连接信息问题：“Please ensure that you set the default write concern for the database by setting =
= one of the options =”

2013.7.4 修正文章修改时原始标题和标签内容溢出容器

2013.7.25 修正Root功能中的一些错误、添加监控、新增应用体的数据模型AppInfo、修正数据库复数链接导致应用暂停问题、应用数据库初始化、文章检索特殊符号正则过滤不严格问题、控制分页的回调函数逻辑错误问题

2013.7.26 添加个人信息浏览及设置功能，修正User模型中一个查询数据库的错误用法find

2013.7.27 重新设计单篇po的链接构成，防止再次出现非法字符

2013.7.29 全面检查，修正一些隐蔽的错误以及添加非法URL过滤，完成后台功能与后台Bugs修复，对大部分页面的session检测逻辑进行修改

2013.9.2 更新了routes、public/javascripts和views。新增对**标签** 和 **SEARCH**中的特殊字符的支持。

2013.9.3 修正了tags显示的bugs。

####bugs（history）

2013.9.3 tags显示出错，过滤不严，如果全为逗号或空格+逗号则会出现严重错误。 已解决。

2013.7.29 发布/修改POST时如果文章标题全是空格会发布成功，将导致文章访问出问题。 已解决。

2013.7.29 部分非法URL未经过滤，会导致应用崩溃。已解决。

2013.7.27 每篇post的标题中如果包含？，由于链接包含标题，因此会出现？这将导致req.params无法正确辨识链接中的title从而查询出错。方案：对post的链接构成进行重新整合，避免出现非法字符。 ……已解决。

2013.7.26 User模型中的查询语法使用出错，导致用户/管理员页面获取查询信息为undefined。 已解决

2013.7.25 Root进行网站流量监控、数据监控时发生应用崩溃，appinfo数据模型无法正常工作，Router中部分路由函数逻辑出错，post数据模型中的几个函数由于未考虑扩展而导致出错，正则表达式检索文章是过滤不严出错，分页出错。已解决

2013.7.24 数据库链接被多次开启导致应用暂停。已解决，方案：将主应用中的检测数据库部分删除。

2013.6.27 文章标题为空时未作处理。已解决。

2013.6.25 关键词搜素不完整。已解决，方案：在Post模型中修改patterns

2013.6.15 搜索关键词未过滤会导致应用错误崩溃。已解决，方案：在路由中添加过滤再传递给search

2013.6.14 单篇文章路径与指定用户的指定标签路径冲突，默认会调用前一项handle而忽略后面的handle，从而导致页面访问错误。 暂时解决方案：取消用户指定标签功能。

2013.6.14 发布文章时，标题和标签的末尾出现空格会导致单篇文章页面访问出错。 已解决，方案： 在路由中对传输的数据做预处理保证满足规格（自动将末尾的空格去掉）
<hr>

####关于UI优化

未来会使用前端框架Bootstrap重构页面。由于该项目当前仅仅是个例子，所以并没有对UI做任何修饰。
<hr>

####最终功能描述：
+ 多用户
+ 实时（RealTime） $
+ 个人控制
 - 编辑个人信息 
 - 添加头像:头像引自gravatar，可到gravatar上选定头像然后将邮箱填写正确 
 - pv统计
 - 管理自己发布的文章（搜索、删除、修改）
 - 接收系统/用户消息 $
+ 标签
+ 分页
+ markdown发布文章
+ 归档
+ markdown留言
+ markdown评论
+ 可视化文本编辑器 $
+ 文章检索
+ 注册：在注册时最好填写关联gravatar的邮箱以确保头像的正确引用！
+ 系统管理员（数据库可视化操作 + 网站监控）
<hr>

####当前实现：

+ 多用户
+ 标签
+ 分页
+ markdown
+ 归档
+ 发布文章
+ 留言（评论）
+ 个人控制
+ pv统计
+ 文章搜索
+ 用户头像
+ 文章删除
+ 文章修改
+ 系统管理员后台（Root）
<hr>

####更新日期： 

+ 2013.6.09
+ 2013.6.14
+ 2013.6.15
+ 2013.6.16
+ 2013.6.19
+ 2013.6.23
+ 2013.6.25
+ 2013.6.26
+ 2013.6.27
+ 2013.6.30
+ 2013.7.04
+ 2013.7.25
+ 2013.7.26
+ 2013.7.27
+ 2013.7.29
+ 2013.9.02
+ 2013.9.03
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
    mongod --dbpath "/home/username/myblog/datebase" 
</pre>
+ 启动应用
<pre>
    cd blogos
    sudo node app.js
</pre>
