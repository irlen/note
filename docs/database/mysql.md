# mysql
### 原生sql语句

### 对数据库的操作

创建一个数据库； create database mydb;
查看所有数据库： show databases;
创建一个数据库并设置字符编码： create database mydb character set gbk;
查看数据库编码： show create database mydb;
删除一个数据库： drop database mydb;
使用一个数据库： use mydb;
查看当前正在操作的库； select database();



### 对数据表的操作
创建数据表；
create table 表名（
	字段名 类型（长度） 约束，
	字段名 类型（长度） 约束，
	字段名 类型（长度） 约束，
）

例如: create table user(
		uid int(32) primary key auto_increment,
		uname varchar(32),
		upassword varchar(32)
	)

查看数据表：show tables;

查看表结构： desc user;

删除表： drop table user;

修改表(添加一列)： alter table 表名 add 字段名 类型（长度） 约束;
修改列的类型（长度）以及约束： alter table 表名 modify 要修改的字段名 类型（长度） 约束；
修改表的列名： alter table 表名 change 旧列名 新列名 类型（长度） 约束；
删除表的列： alter table 表名 drop 列名;

修改表名： rename table 旧表名 to 新表名;
修改表的字符集：alter table 表名 character set 编码;

****数据操作
插入数据：
insert into 表名（列名1，列名2，列名3...） values(值1，值2，值3...);
或者insert into 表名 values(值1，值2，值3...);
插入数据时出现中文乱码问题： set names gbk;


修改数据：
update 表名 set 字段名=值，字段名=值，字段名=值...
它会将该列的所有记录都更改；
update 表名 set 字段名=值，字段名=值，字段名=值...where I条件（字段名=值）；


删除数据：
delete from 表名 where 条件（字段名=值）；
删除后主键ID不会重置；
delete from 表名;删除表内所有数据；


查询数据：
1,通表查询
select * from 表名；
查询表内所有数据；
select 字段1，字段2 from 表名；
查询表内这两个字段；
select * from 表名 as 别名：
查询表内所有数据使用别名；
select 字段 as p from 表名；
查询表内某个字段使用别名；
select distinct(字段) from 表名；
查询出去掉重复（依据该字段）的数据
select 字段1,字段2+10 from 表名；
查询出的数据将字段2加上10进行显示，数据库中的数据并不加10；
2,带条件查询，具体到某一条或者几条数据
select * from 表名 where 字段1=haha;
查询出字段1=haha的所有数据
select * from 表名 where 字段1>100;
查询出字段1大于100的所有数据；
select * from 表名 where 字段1 like 'haha';
查询出字段1中含有字符haha的所有数据；
select * from 表名 where id in(1,2,4);
查询出id为1，2，4的数据；
select * from 表名 where 字段1 like 'haha' and id=1;
查询出id为1并且字段1中包含字符haha的数据；
select * from 表名 where id=1 or id=3;
查询出id为1或者3的数据；
3,查询排序
select * from 表名 order by 字段1 asc;
查询出所有数据按照字段1的升序进行排列；
select * from 表名 order by 字段1 desc;
查询出所有数据按照字段1的降序进行排列；
select * from 表名 where 字段1 like "haha" order by 字段2 asc;
查询出字段1中包含字符"haha"的所有数据并按照字段2按照升序进行排列；


聚合函数：
select sum(字段1) from 表名；
获取所有数据字段1的总和；
select avg(字段1) from 表名；
获取所有数据字段1的平均；
select count(*) from 表名；
获取所有数据条数；


分组操作；
添加分类id字段 alter table 表名 add cid varchar(32);
初始化cid字段 update 表名 set cid="1";
按条件设置分类字段cid:  update 表名 set cid="2" where id in(3,4,5);
select cid,count(*) from 表名 group by cid;
按照cid分组，并统计组内商品的个数；


4.6 查询总结
select  一般在的后面的内容都是要查询的字段
from  要查询到表
where
group by
having  分组后带有条件只能使用having
order by 它必须放到最后面
