# README

## 管理 makefile 文件 以命令行方式管理

### 安装
```
npm install manage_make -g
```

### Makefile 文件用于引用makefile文件
#### 本项目makefile文件所在位置
https://github.com/barragepPlayer/make
#### include username/file
```
include barragepPlayer/cw.mk

```
### makefile 格式如下
```
#Start the dev AryaServer
# ruby on rails
Arya.start:
	@cd ~/topDMC/Arya-API/ && rails s
.PHONY: Arya.start

#Start the dev cw-apiServer
#node
cw.start:
	@cd ~/topDMC/cw-api/ && npm run debug
.PHONY: cw.start
```
### \# 代表注释，Arya.start 是target，@cd ~/topDMC/Arya-API/ && rails s  是系统要执行的启动项目命令

### example
```
⇒  mmake help

Arya.start:		Start the dev AryaServer
cw.start:		Start the dev cw-apiServer

⇒  mmake help cw.start

cw.start:

Start the dev cw-apiServer
node

mmake cw.start

> cw-api@1.0.0 debug /Users/JJW/topDMC/cw-api
> DEBUG=app* NODE_ENV=development ./node_modules/.bin/pm2-dev server.js


[PM2] Streaming realtime logs for [all] processes


⇒  mmake update
正在更新.....
更新完成：cw.mk
```
