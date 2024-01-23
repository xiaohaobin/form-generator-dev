const t = {}

t.loading = '加載中...'

t.brand = {}
t.brand.lg = '人人微服務平台'
t.brand.mini = '人人'

t.add = '新增'
t.delete = '刪除'
t.deleteBatch = '刪除'
t.update = '修改'
t.query = '查詢'
t.export = '導出'
t.handle = '操作'
t.confirm = '確定'
t.cancel = '取消'
t.clear = '清除'
t.logout = '退出'
t.manage = '辦理'
t.createDate = '創建時間'
t.updateDate = '更新時間'
t.keyword = '關鍵字：'
t.choose = '請選擇'
t.fileName = '文件名'
t.design = '在線設計'
t.preview = '預覽'
t.upgrade = '陞級'
t.connectServer = '連接的服務器'

t.prompt = {}
t.prompt.title = '提示'
t.prompt.info = '確定進行[{handle}]操作?'
t.prompt.success = '操作成功'
t.prompt.failed = '操作失敗'
t.prompt.deleteBatch = '請選擇刪除項'

t.validate = {}
t.validate.required = '必填項不能為空'
t.validate.format = '{attr}格式錯誤'

t.upload = {}
t.upload.text = '將文件拖到此處，或<em>點擊上傳</em>'
t.upload.tip = '只支持{format}格式文件！ '
t.upload.button = '點擊上傳'

t.datePicker = {}
t.datePicker.range = '至'
t.datePicker.start = '開始日期'
t.datePicker.end = '結束日期'

t.fullscreen = {}
t.fullscreen.prompt = '您的瀏覽器不支持此操作'

t.updatePassword = {}
t.updatePassword.title = '修改密碼'
t.updatePassword.username = '賬號'
t.updatePassword.password = '原密碼'
t.updatePassword.newPassword = '新密碼'
t.updatePassword.confirmPassword = '確認密碼'
t.updatePassword.validate = {}
t.updatePassword.validate.confirmPassword = '確認密碼與新密碼輸入不一致'

t.contentTabs = {}
t.contentTabs.closeCurrent = '關閉當前標籤頁'
t.contentTabs.closeOther = '關閉其它標籤頁'
t.contentTabs.closeAll = '關閉全部標籤頁'

/* 頁面 */
t.notFound = {}
t.notFound.desc = '抱歉！您訪問的頁面<em>失聯</em>啦...'
t.notFound.back = '上一頁'
t.notFound.home = '首頁'

t.login = {}
t.login.title = '登錄'
t.login.username = '用戶名'
t.login.password = '密碼'
t.login.captcha = '驗證碼'
t.login.demo = '在線演示'
t.login.copyright = '人人開源'
t.login.language = '語言'
t.login.reset = '重置'
t.login.loginSucc = '登陆成功'
t.login.enterPassNotice = '請輸入密碼'

t.home = {}
t.home.desc = {}
t.home.desc.title = '項目介紹'
t.home.desc.list = [
  '人人微服務平台，是基於Spring Cloud打造的微服務平台，為企業提供一站式微服務解決方案',
  '基於最新的Spring Cloud Alibaba、Spring Cloud Gateway、Spring Boot、SpringSecurity OAuth2.0、Sentinel、Skywalking、Seata、Nacos、Mybatis、Element開發',
  '代碼風格優雅簡潔、通俗易懂，且符合《阿里巴巴Java開發手冊》規範要求，可作為企業代碼規範',
  '優秀的菜單功能權限，前端可靈活控制頁面及按鈕的展示，後端可對未授權的請求進行攔截',
  '優秀的數據權限管理，只需增加相應註解，無需其他任何代碼，即可實現數據過濾，達到數據權限目的',
  '靈活的角色權限管理，新增角色時，角色權限只能是創建者權限的子集，可有效防止權限越權',
  '靈活的日誌管理，可查看登錄日誌、操作日誌、異常日誌，方便審計及BUG定位',
  '靈活的國際化配置，目前已支持簡體中文、繁體中文、English，如需增加新語言，只需增加新語言[i18n]文件即可',
  '靈活的前端動態路由，新增頁面無需修改路由文件，也可在頁面動態新增tab標籤'
]

/* 模塊 */
t.model = {}
t.model.name = '名稱'
t.model.key = '標識'
t.model.version = '版本'
t.model.createTime = '創建時間'
t.model.lastUpdateTime = '更新時間'
t.model.design = '在線設計'
t.model.deploy = '部署'
t.model.description = '描述'

t.process = {}
t.process.name = '名稱'
t.process.key = '標識'
t.process.deployFile = '部署流程文件'
t.process.id = '流程ID'
t.process.deploymentId = '部署ID'
t.process.version = '版本'
t.process.resourceName = 'XML'
t.process.diagramResourceName = '圖片'
t.process.deploymentTime = '部署時間'
t.process.active = '激活'
t.process.suspend = '掛起'
t.process.convertToModel = '轉換為模型'
t.process.bizRouteSet = '配置業務路由'
t.process.bizRoute = '業務路由'

t.running = {}
t.running.id = '實例ID'
t.running.definitionKey = '定義Key'
t.running.processDefinitionId = '定義ID'
t.running.processDefinitionName = '定義名稱'
t.running.activityId = '當前環節'
t.running.suspended = '是否掛起'
t.running.suspended0 = '否'
t.running.suspended1 = '是'

t.news = {}
t.news.title = '標題'
t.news.pubDate = '發佈時間'
t.news.createDate = '創建時間'
t.news.content = '內容'

t.schedule = {}
t.schedule.beanName = 'bean名稱'
t.schedule.beanNameTips = 'spring bean名稱, 如: testTask'
t.schedule.pauseBatch = '暫停'
t.schedule.resumeBatch = '恢復'
t.schedule.runBatch = '執行'
t.schedule.log = '日誌列表'
t.schedule.params = '參數'
t.schedule.cronExpression = 'cron表達式'
t.schedule.cronExpressionTips = '如: 0 0 12 * * ?'
t.schedule.remark = '備註'
t.schedule.status = '狀態'
t.schedule.status0 = '暫停'
t.schedule.status1 = '正常'
t.schedule.statusLog0 = '失敗'
t.schedule.statusLog1 = '成功'
t.schedule.pause = '暫停'
t.schedule.resume = '恢復'
t.schedule.run = '執行'
t.schedule.jobId = '任務ID'
t.schedule.times = '耗時(單位: 毫秒)'
t.schedule.createDate = '執行時間'

t.mail = {}
t.mail.name = '名稱'
t.mail.config = '郵件配置'
t.mail.subject = '主題'
t.mail.createDate = '創建時間'
t.mail.send = '發送郵件'
t.mail.content = '內容'
t.mail.smtp = 'SMTP'
t.mail.port = '端口號'
t.mail.username = '郵箱賬號'
t.mail.password = '郵箱密碼'
t.mail.mailTo = '收件人'
t.mail.mailCc = '抄送'
t.mail.params = '模板參數'
t.mail.paramsTips = '如：{"code": "123456"}'
t.mail.templateId = '模版ID'
t.mail.status = '狀態'
t.mail.status0 = '發送失敗'
t.mail.status1 = '發送成功'
t.mail.mailFrom = '發送者'
t.mail.createDate = '發送時間'

t.sms = {}
t.sms.mobile = '手機號'
t.sms.status = '狀態'
t.sms.status0 = '發送失敗'
t.sms.status1 = '發送成功'
t.sms.config = '短信配置'
t.sms.send = '發送短信'
t.sms.platform = '平台類型'
t.sms.platform1 = '阿里雲'
t.sms.platform2 = '騰訊雲'
t.sms.params = '參數'
t.sms.paramsTips = '如：{"code": "123456"}'
t.sms.params1 = '參數1'
t.sms.params2 = '參數2'
t.sms.params3 = '參數3'
t.sms.params4 = '參數4'
t.sms.createDate = '發送時間'
t.sms.aliyunAccessKeyId = 'Key'
t.sms.aliyunAccessKeyIdTips = '阿里雲AccessKeyId'
t.sms.aliyunAccessKeySecret = 'Secret'
t.sms.aliyunAccessKeySecretTips = '阿里雲AccessKeySecret'
t.sms.aliyunSignName = '短信簽名'
t.sms.aliyunTemplateCode = '短信模板'
t.sms.aliyunTemplateCodeTips = '短信模板CODE'
t.sms.qcloudAppId = 'AppId'
t.sms.qcloudAppIdTips = '騰訊雲AppId'
t.sms.qcloudAppKey = 'AppKey'
t.sms.qcloudAppKeyTips = '騰訊雲AppKey'
t.sms.qcloudSignName = '短信簽名'
t.sms.qcloudTemplateId = '短信模板'
t.sms.qcloudTemplateIdTips = '短信模板ID'

t.oss = {}
t.oss.config = '雲存儲配置'
t.oss.upload = '上傳文件'
t.oss.url = 'URL地址'
t.oss.createDate = '創建時間'
t.oss.type = '類型'
t.oss.type1 = '七牛'
t.oss.type2 = '阿里雲'
t.oss.type3 = '騰訊雲'
t.oss.type4 = 'FastDFS'
t.oss.type5 = '本地上傳'
t.oss.qiniuDomain = '域名'
t.oss.qiniuDomainTips = '七牛綁定的域名'
t.oss.qiniuPrefix = '路徑前綴'
t.oss.qiniuPrefixTips = '不設置默認為空'
t.oss.qiniuAccessKey = 'AccessKey'
t.oss.qiniuAccessKeyTips = '七牛AccessKey'
t.oss.qiniuSecretKey = 'SecretKey'
t.oss.qiniuSecretKeyTips = '七牛SecretKey'
t.oss.qiniuBucketName = '空間名'
t.oss.qiniuBucketNameTips = '七牛存儲空間名'
t.oss.aliyunDomain = '域名'
t.oss.aliyunDomainTips = '阿里雲綁定的域名，如：http://cdn.renren.io'
t.oss.aliyunPrefix = '路徑前綴'
t.oss.aliyunPrefixTips = '不設置默認為空'
t.oss.aliyunEndPoint = 'EndPoint'
t.oss.aliyunEndPointTips = '阿里雲EndPoint'
t.oss.aliyunAccessKeyId = 'AccessKeyId'
t.oss.aliyunAccessKeyIdTips = '阿里雲AccessKeyId'
t.oss.aliyunAccessKeySecret = 'AccessKeySecret'
t.oss.aliyunAccessKeySecretTips = '阿里雲AccessKeySecret'
t.oss.aliyunBucketName = 'BucketName'
t.oss.aliyunBucketNameTips = '阿里雲BucketName'
t.oss.qcloudDomain = '域名'
t.oss.qcloudDomainTips = '騰訊雲綁定的域名'
t.oss.qcloudPrefix = '路徑前綴'
t.oss.qcloudPrefixTips = '不設置默認為空'
t.oss.qcloudAppId = 'AppId'
t.oss.qcloudAppIdTips = '騰訊雲AppId'
t.oss.qcloudSecretId = 'SecretId'
t.oss.qcloudSecretIdTips = '騰訊雲SecretId'
t.oss.qcloudSecretKey = 'SecretKey'
t.oss.qcloudSecretKeyTips = '騰訊雲SecretKey'
t.oss.qcloudBucketName = 'BucketName'
t.oss.qcloudBucketNameTips = '騰訊雲BucketName'
t.oss.qcloudRegion = '所屬地區'
t.oss.qcloudRegionTips = '請選擇'
t.oss.qcloudRegionBeijing1 = '北京一區（華北）'
t.oss.qcloudRegionBeijing = '北京'
t.oss.qcloudRegionShanghai = '上海（華東）'
t.oss.qcloudRegionGuangzhou = '廣州（華南）'
t.oss.qcloudRegionChengdu = '成都（西南）'
t.oss.qcloudRegionChongqing = '重慶'
t.oss.qcloudRegionSingapore = '新加坡'
t.oss.qcloudRegionHongkong = '香港'
t.oss.qcloudRegionToronto = '多倫多'
t.oss.qcloudRegionFrankfurt = '法蘭克福'
t.oss.localDomain = '域名'
t.oss.localDomainTips = '綁定的域名，如：http://cdn.renren.io'
t.oss.fastdfsDomain = '域名'
t.oss.fastdfsDomainTips = '綁定的域名，如：http://cdn.renren.io'
t.oss.localPrefix = '路徑前綴'
t.oss.localPrefixTips = '不設置默認為空'
t.oss.localPath = '存儲目錄'
t.oss.localPathTips = '如：D:/upload'

t.dept = {}
t.dept.name = '名稱'
t.dept.parentName = '上級部門'
t.dept.sort = '排序'
t.dept.parentNameDefault = '一級部門'
t.dept.chooseerror = '請選擇部門'
t.dept.title = '選擇部門'

t.dict = {}
t.dict.dictName = '字典名稱'
t.dict.dictType = '字典類型'
t.dict.dictLabel = '字典標籤'
t.dict.dictValue = '字典值'
t.dict.sort = '排序'
t.dict.remark = '備註'
t.dict.createDate = '創建時間'

t.logError = {}
t.logError.module = '模塊名稱'
t.logError.requestUri = '請求URI'
t.logError.requestMethod = '請求方式'
t.logError.requestParams = '請求參數'
t.logError.ip = '操作IP'
t.logError.userAgent = '用戶代理'
t.logError.createDate = '創建時間'
t.logError.errorInfo = '異常信息'

t.logLogin = {}
t.logLogin.creatorName = '用戶名'
t.logLogin.status = '狀態'
t.logLogin.status0 = '失敗'
t.logLogin.status1 = '成功'
t.logLogin.status2 = '賬號已鎖定'
t.logLogin.operation = '操作類型'
t.logLogin.operation0 = '登錄'
t.logLogin.operation1 = '退出'
t.logLogin.ip = '操作IP'
t.logLogin.userAgent = 'User-Agent'
t.logLogin.createDate = '創建時間'


t.logOperation = {}
t.logOperation.module = '模塊名稱'
t.logOperation.status = '狀態'
t.logOperation.status0 = '失敗'
t.logOperation.status1 = '成功'
t.logOperation.creatorName = '用戶名'
t.logOperation.operation = '用戶操作'
t.logOperation.requestUri = '請求URI'
t.logOperation.requestMethod = '請求方式'
t.logOperation.requestParams = '請求參數'
t.logOperation.requestTime = '請求時長'
t.logOperation.ip = '操作IP'
t.logOperation.userAgent = 'User-Agent'
t.logOperation.createDate = '創建時間'

t.menu = {}
t.menu.name = '名稱'
t.menu.icon = '圖標'
t.menu.type = '類型'
t.menu.type0 = '菜單'
t.menu.type1 = '按鈕'
t.menu.sort = '排序'
t.menu.url = '路由'
t.menu.permissions = '授權標識'
t.menu.permissionsTips = '如: sys:menu:save'
t.menu.parentName = '上級菜單'
t.menu.parentNameDefault = '一級菜單'
t.menu.resource = '授權資源'
t.menu.resourceUrl = '資源URL'
t.menu.resourceMethod = '請求方式'
t.menu.resourceAddItem = '添加一項'

t.params = {}
t.params.paramCode = '編碼'
t.params.paramValue = '值'
t.params.remark = '備註'

t.role = {}
t.role.name = '名稱'
t.role.remark = '備註'
t.role.createDate = '創建時間'
t.role.menuList = '菜單授權'
t.role.deptList = '數據授權'

t.user = {}
t.user.username = '用戶名'
t.user.deptName = '所屬部門'
t.user.email = '郵箱'
t.user.mobile = '手機號'
t.user.status = '狀態'
t.user.status0 = '停用'
t.user.status1 = '正常'
t.user.createDate = '創建時間'
t.user.password = '密碼'
t.user.confirmPassword = '確認密碼'
t.user.realName = '真實姓名'
t.user.gender = '性別'
t.user.gender0 = '男'
t.user.gender1 = '女'
t.user.gender2 = '保密'
t.user.roleIdList = '角色配置'
t.user.postIdList = '所在崗位'
t.user.validate = {}
t.user.validate.confirmPassword = '確認密碼與密碼輸入不一致'

t.tenant = {}
t.tenant.username = '登錄賬號'
t.tenant.password = '登錄密碼'
t.tenant.tenantCode = '租戶編碼'
t.tenant.tenantName = '租戶名稱'
t.tenant.realName = '真實姓名'
t.tenant.roleIdList = '角色配置'
t.tenant.email = '郵箱'
t.tenant.mobile = '手機號'
t.tenant.status = '狀態'
t.tenant.status0 = '停用'
t.tenant.status1 = '正常'
t.tenant.remark = '備註'
t.tenant.createDate = '創建時間'
t.tenant.switch = '切換租戶'
t.tenant.select = '請選擇租戶'
t.tenant.current = '當前租戶'
t.tenant.validate = {}
t.tenant.validate.number = '必須為正整數'

t.region = {}
t.region.id = '區域標識'
t.region.name = '區域名稱'
t.region.type = '區域類型'
t.region.sort = '排序'
t.region.updateDate = '更新時間'
t.region.province = '省份直轄市'
t.region.city = '地市'
t.region.county = '區縣'
t.region.parentName = '上級區域'
t.region.select = '選擇區域'

t.correction = {}
t.correction.post = '申請崗位'
t.correction.entryDate = '入職日期'
t.correction.correctionDate = '轉正日期'
t.correction.workContent = '工作內容'
t.correction.achievement = '工作成績'

t.process.comment = '審核意見'
t.process.completeTask = '同意'
t.process.rejectTask = '駁回'
t.process.doBackRollback = '回退'
t.process.terminationTask = '終止'
t.process.entrustTask = '委託'
t.process.createInstance = '發起流程'
t.process.instanceId = '流程實例ID'
t.process.taskId = '任務ID'
t.process.days = '天數'
t.process.businessKey = '業務KEY'
t.process.processDefinitionName = '流程名稱'
t.process.ended = '流程進度'
t.process.ended0 = '已完成'
t.process.ended1 = '未完成'
t.process.startTime = '開始時間'
t.process.endTime = '結束時間'
t.process.activityName = '當前環節'
t.process.createTime = '創建時間'
t.process.assignee = '處理人'
t.process.viewFlowImage = '查看流程圖'
t.process.detail = '详情'
t.process.flowImage = '流程圖'
t.process.processDefinitionVersion = '流程版本'
t.process.startUserId = '發起人'
t.process.taskName = '當前環節'
t.process.owner = '任務所有人'
t.process.claim = '簽收'
t.process.routeError = '請先配置業務表單路由信息'
t.process.entrustError = '請選擇委託人'
t.process.formURLError = '請設置保存表單的URL'
t.process.keyError = '請設置流程KEY'
t.process.formNameError = '請設置表單名稱'
t.process.businessKeyError = '業務KEY為空，無法啟動流程'
t.process.notExistError = '沒有查詢到流程，請先設計流程'
t.process.circulation = '流轉詳情'

t.task = {}
t.task.businessKeyError = '業務KEY為空，無法處理任務'
t.task.detailError = '業務KEY為空，無法查看處理詳情'
t.task.startTime = '任務開始時間'
t.task.endTime = '任務結束時間'
t.task.durationInSeconds = '任務時長 (秒)'

t.oss.type6 = 'MinIO'
t.oss.minioEndPoint = 'EndPoint'
t.oss.minioEndPointTips = 'MinIO EndPoint'
t.oss.minioAccessKey = 'AccessKey'
t.oss.minioAccessKeyTips = 'AccessKey'
t.oss.minioSecretKey = 'SecretKey'
t.oss.minioSecretKeyTips = 'SecretKey'
t.oss.minioBucketName = 'BucketName'
t.oss.minioBucketNameTips = 'BucketName'
t.oss.minioPrefix = '路徑前綴'
t.oss.minioPrefixTips = '不設置默認為空'

t.sms.platform3 = '七牛'
t.sms.qiniuAccessKey = 'AccessKey'
t.sms.qiniuAccessKeyTips = 'AccessKey'
t.sms.qiniuSecretKey = 'SecretKey'
t.sms.qiniuSecretKeyTips = 'SecretKey'
t.sms.qiniuTemplateId = '短信模板'
t.sms.qiniuTemplateIdTips = '短信模板ID'
t.sms.smsCode = '短信編碼'
t.sms.remark = '備註'

t.notice = {}
t.notice.title = '標題'
t.notice.type = '類型'
t.notice.senderName = '發送者'
t.notice.senderDate = '發送時間'
t.notice.status = '狀態'
t.notice.status0 = '草稿'
t.notice.status1 = '已發'
t.notice.view = '查看'
t.notice.view1 = '通知管理 - 查看'
t.notice.view2 = '我的通知 - 查看'
t.notice.readStatus = '閱讀狀態'
t.notice.readStatus0 = '未讀'
t.notice.readStatus1 = '已讀'
t.notice.content = '內容'
t.notice.receiverType = '接收者'
t.notice.receiverType0 = '全部'
t.notice.receiverType1 = '部門'
t.notice.selectDept = '選擇部門'
t.notice.draft = '保存草稿'
t.notice.release = '發布通知'
t.notice.close = '關閉'
t.notice.receiverName = '接收者'
t.notice.readDate = '閱讀時間'


//js插件动态字段
t.utils = {}
t.utils.online = '在线'
t.utils.offline = '离线'
t.utils.fault = '故障'
t.utils.brokenChain = '断链'
t.utils.onlineMeter = '上网电表'
t.utils.no_4g = '无4G模块'
t.utils.isDel = '确定删除？'
t.utils.timeNotNull = '时间不可以为空'
t.utils.endTimeMax = '结束时间必须大于开始时间'
t.utils.checkedNotice = '请勾选对应数据才能操作'
t.utils.checkedTimeNotice = '请选择时间才能操作'
t.utils.requestError = '请求失败，请检查请求参数或服务器问题'
t.utils.requestOverTime = '请求超时，请稍后再试'
t.utils.systemInfo = '系统信息'
t.utils.productInfo = '产品信息'
t.utils.communicationInfo = '通讯信息'
t.utils.netInfo = '网络信息'
t.utils.deviceList = '设备列表'
t.utils.productIM = '产品维护'
t.utils.systemSetting = '系统设置'
t.utils.systemIM = '系统维护'
t.utils.softUpload = '软件升级'
t.utils.infoSearch = '信息查询'
t.utils.alarmInfo = '告警信息'
t.utils.optionInfo = '操作信息'
t.utils.dataExport = '数据导出'
t.utils.communicationParam = '通讯参数'
t.utils.wiredCommunication = '有线通信'
t.utils.wirelessCommunication = '无线通信'
t.utils.server = '服务器'
t.utils.powerRegulation = '功率调节'
t.utils.withPowerRegulation = '有功率调节'
t.utils.noPowerRegulation = '无功率调节'
t.utils.deviceManage = '设备监控'
t.utils.inverter = '逆变器'
t.utils.ammeter = '电表'
t.utils.detector = '环境监测仪'
t.utils.PID = 'PID设备'

//common文件夹中的组件页面字段
t.common = {}
t.common.NO = '序号'
t.common.percentage = '百分比'
t.common.add = '添加'
t.common.submit = '提交'
t.common.addDRM = '添加DRM'
t.common.DISetting = 'DI设置'
t.common.notNull = '不能为空'
t.common.noData = '暂无数据'
t.common.devType = '设备类型'
t.common.selectDevType = '请选择设备类型'
t.common.DevModel = '设备机型'
t.common.selectDevModel = '请选择设备机型'
t.common.gridMode = '并网模式'
t.common.startTime = '开始时间'
t.common.endTime = '结束时间'
t.common.charingMode = '充电模式'
t.common.makedEable = '使能'
t.common.selectStartTime = '选择开始时间'
t.common.selectEndTime = '选择结束时间'
t.common.eable = '启用'
t.common.disable = '禁用'
t.common.addData = '添加数据'
t.common.invConnectGrid = '逆变器并网'
t.common.storageConnectGrid = '储能机并网'
t.common.invAndStorageConnectGrid = '逆变器+储能机并网'
t.common.batteryPriority = '电池优先'
t.common.gridPriority = '电网优先'
t.common.loadPriority = '负载优先'
t.common.pass = '通道'
t.common.port = '端口'
t.common.type = '类型'
t.common.addr = '地址'
t.common.startAddr = '开始地址'
t.common.addrNum = '地址个数'
t.common.sn = '序列号'
t.common.devAddr = '设备地址'
t.common.systemAddr = '系统地址'
t.common.date = '日期'
t.common.selectDate = '选择日期'
t.common.notCompBySame = '同类型不可以比较'
t.common.atLeastOne = '至少选择一个'
t.common.export = '导出'
t.common.save = '存盘'
t.common.signalName = '信号名称'
t.common.value = '值'

//deviceManage文件夹中的组件页面字段
t.deviceManage = {}
t.deviceManage.runningInfo = '运行信息'
t.deviceManage.historyInfo = '历史信息'
t.deviceManage.table = '表格'
t.deviceManage.chart = '曲线'
t.deviceManage.devMI = '设备维护'

//productIM文件夹中的组件页面字段
t.productIM = {}
t.productIM.Arrangement = '排序方式'
t.productIM.positiveSequence = '正序'
t.productIM.reverseOrder = '倒序'
t.productIM.alertId = '告警ID'
t.productIM.gTime = '产生时间'
t.productIM.alertReason = '告警原因'
t.productIM.optionTime = '操作时间'
t.productIM.OperationS = '操作源'
t.productIM.uploadType = '升级方式'
t.productIM.uploadFile = '升级文件'
t.productIM.selectFile = '请选择文件'
t.productIM.webUploadFile = '上传文件'
t.productIM.devName = '设备名称'
t.productIM.devStatus = '设备状态'
t.productIM.currVer = '当前版本'
t.productIM.targerVer = '目标版本'
t.productIM.uploadProgress = '升级进度'
t.productIM.RemoteUpgrade = '远程升级'
t.productIM.noFeil = '暂无文件'
t.productIM.checkCode = '校验码'
t.productIM.systemTime = '系统时间'
t.productIM.connectNetType = '联网方式'
//20221117添加
t.productIM.systemReset = '系统复位'
t.productIM.systemInit = '恢复出厂设置'
t.productIM.clearSystemData = '清除系统数据'
t.productIM.passwordReset = '密码重置'
t.productIM.oldPassword = '旧密码'
t.productIM.newPassword = '新密码'
t.productIM.checkPassword = '确认新密码'
t.productIM.pleaseEnterNP = '请输入新密码'
t.productIM.pleaseEnterOP = '请输入旧密码'
t.productIM.newOldPassNotSame = '新旧密码不可一致'
t.productIM.pleaseEnterNPOnce = '请再次输入密码'
t.productIM.passNotSame = '两次输入密码不一致'
t.productIM.passIsSame = '新旧密码不可一致'
t.productIM.confirmOptionWillReset = '该操作会导致系统重启，请确认？'
t.productIM.confirmResetPass = '确定是否修改密码？'


//systemInfo文件夹中的组件页面字段
t.systemInfo = {}
t.systemInfo.baudRate = '波特率'
t.systemInfo.protocol = '通讯协议'
t.systemInfo.wirelessNetwork = '无线网络'
t.systemInfo.sim = 'SIM卡号'
t.systemInfo.status_4g = '4G模块状态'
t.systemInfo.ipAddr = 'IP地址'
t.systemInfo.signalStrength = '信号强度'
t.systemInfo.NetworkOperators = '网络运营商'
t.systemInfo.wiredNetwork = '有线网络'
t.systemInfo.subnetMask = '子网掩码'
t.systemInfo.defaultGateway = '默认网关'
t.systemInfo.dns = 'DNS服务器'
t.systemInfo.mac = 'MAC地址'
t.systemInfo.softVer = '软件版本'
t.systemInfo.hardVer = '硬件版本'
t.systemInfo.regDevice = '注册设备'
t.systemInfo.stopBit = '停止位'
t.systemInfo.dataBit = '数据位'
t.systemInfo.mainSubMode = '主从模式'

//systemSetting文件夹中的组件页面字段
t.systemSetting = {}
t.systemSetting.protocolType = '协议类型'
t.systemSetting.DRMList = 'DRM列表'
t.systemSetting.GRT_net_manage = 'Growatt网管'
t.systemSetting.isOpen = '是否开启'
t.systemSetting.uploadCycle = '上传周期'
t.systemSetting.other_net_manage = '第三方网管'
t.systemSetting.connectEabled = '连接使能'
t.systemSetting.clintIpNum = '客户端IP个数'
t.systemSetting.clint = '客戶端'
t.systemSetting.addrMode = '地址模式'
t.systemSetting.LoggerAddr = 'Logger地址'
t.systemSetting.checkFunction = '校验方式'
t.systemSetting.comAddr = '公共地址'
t.systemSetting.clientNum = '客户端个数'
t.systemSetting.yaoxin = '遥信默认分段区间'
t.systemSetting.yaoce = '遥测默认分段区间'
t.systemSetting.minute = '分钟'
t.systemSetting.wiredCom = '有线通讯'
t.systemSetting.helpPS = '帮助说明'
t.systemSetting.portPSTxt= '端口:电表接入数据的COM口编号'
t.systemSetting.wirelessCom = '无线通讯'
t.systemSetting.c_4g = '4G 通讯'
t.systemSetting.netMode = '网络模式'
t.systemSetting.APNMode = 'APN模式'
t.systemSetting.chooseMode = '选择模式'
t.systemSetting.normalMode = '正常模式'
t.systemSetting.DI_ygtj = 'DI有功调节'
t.systemSetting.xglbw = '限功率并网'
t.systemSetting.energyManagement = '能量管理'
t.systemSetting.formSetting = '表单设置'
t.systemSetting.kzcs = '扩展参数'
t.systemSetting.maxGridPower = '最大馈送电网功率'
t.systemSetting.jgltjzq = '降功率调节周期'
t.systemSetting.sglyz = '升功率阈值'
t.systemSetting.fnlsxs = '防逆流失效时'
t.systemSetting.sxbhglxz = '失效保护功率限制'
t.systemSetting.sxsj = '失效时间'
t.systemSetting.timeSetting = '时间设置'
t.systemSetting.meterType = '电表类型'
t.systemSetting.meterAddr = '电表地址'
t.systemSetting.inputRange = '输入范围'

t.systemSetting.regulationMode = '调节模式'
t.systemSetting.minimumPhaseRegulation = '最低相调节'
t.systemSetting.IndividuallyAdjustableForEachPhase = '每相单独调节'
//20221121 比较长的字段
t.longTxt = {}
//CAN说明
t.longTxt.CAN_helpNotice_1 = '端口：光伏设备接入的COM口号'
t.longTxt.CAN_helpNotice_2 = '波特率：根据设备的波特率选择'
t.longTxt.CAN_helpNotice_3 = '协议类型：支持Modbus-RTU协议'

//有线通讯说明
t.longTxt.wiredC_helpNotice_1 = 'DHCP：关闭之后，ShineMaster-X采用固定IP访问网络'
t.longTxt.wiredC_helpNotice_2 = '设置成功之后，重启采集器生效'

//无线通讯说明
t.longTxt.wirelessC_helpNotice_1 = '网络模式：选择是否启用4G网络'
t.longTxt.wirelessC_helpNotice_2 = 'APN模式：若选择手动输入，需要输入APN名称，用户名和密码可选填'
t.longTxt.wirelessC_helpNotice_3 = '设置成功之后，重启采集器生效'

//RS458说明
t.longTxt.RS485_helpNotice_1 = '端口：光伏设备接入的COM口号'
t.longTxt.RS485_helpNotice_2 = '波特率：根据设备的波特率选择，默认9600'
t.longTxt.RS485_helpNotice_3 = '检验码：默认为无校验'
t.longTxt.RS485_helpNotice_4 = '停止位：默认1位'
t.longTxt.RS485_helpNotice_5 = '数据位：默认8位'
t.longTxt.RS485_helpNotice_6 = '协议类型：支持Modbus-RTU协议'
t.longTxt.RS485_helpNotice_7 = '主模式：采集器作为主机'
t.longTxt.RS485_helpNotice_8 = '从模式，采集器作为从机'

//服务器页面说明
t.longTxt.server_helpNotice_1 = '开启：使能连接服务器'
t.longTxt.server_helpNotice_2 = '关闭：取消连接服务武器'
t.longTxt.server_helpNotice_3 = '端口：网络端口'
t.longTxt.server_helpNotice_4 = '服务器：根据连接的服务器域名填写'
t.longTxt.server_helpNotice_5 = '上传周期：数据上传到服务器的间隔时间'
t.longTxt.server_helpNotice_6 = '设置成功后，重启机器生效'

//20230411添加
t.utils.boxTransformer = 'Box Transformer'
t.utils.SYN = 'SYN设备'
t.utils.batteryCabinet = '电池柜'
t.utils.meterConfig = '电表配置'
t.utils.energyStorageSystem = '储能系统'
t.utils.modeSetting = '模式设置'
t.utils.demandManagement = '需量管理'

t.systemSetting.feedPower = '馈电功率'
t.systemSetting.gridPower = '电网取电功率'
t.systemSetting.isEnable = '是否启用'
t.systemSetting.noEnable = '不启用'
t.systemSetting.dateType = '日期类型'
t.systemSetting.globalSettings = '全局设置'
t.systemSetting.hasSetDayAndMonth = '已设置的特殊日和季度'
t.systemSetting.undecided = '未定'
t.systemSetting.noMakedEable = '非使能'
t.systemSetting.specialDay_month = '特殊日-月份'
t.systemSetting.specialDay_day = '特殊日-日期'
t.systemSetting.month = '月份'
t.systemSetting.chooseMonth = '选择月份'
t.systemSetting.startMonth = '开始月份'
t.systemSetting.endMonth = '结束月份'
t.systemSetting.isMakedEable = '是否使能'
t.systemSetting.setting = '设置'
t.systemSetting.mode = '模式'
t.systemSetting.weekendOrWeek = '周末或者全周'
t.systemSetting.specialDay = '特殊日'
t.systemSetting.quarter = '季度'
t.systemSetting.fullYear = '全年'
t.systemSetting.PPvEnergyStorage = '纯光伏储能'
t.systemSetting.ergyStorageIdleGridPriority = '储能闲置电网优先'
t.systemSetting.OneButtonBatteryModeByNoEnable = '不使能一键电池模式'
t.systemSetting.weekend = '周末'
t.systemSetting.week = '全周'
t.systemSetting.mustMonthAndDay = '月份日期必须完整'
t.systemSetting.dataExistsCannotSet  = '该日期已存在，不能重复设置'
t.systemSetting.quarterSelectRepeatCross  = '该季度的范围月份，与其他季度的范围月份重叠交叉'
t.systemSetting.mustTimeComplete = '时间必须选择完整'
t.systemSetting.dateAndTimeCannotRepeatCross = '日期或者时间不可以重叠交叉'
t.systemSetting.AntiBackflowPower = '防逆流功率'
t.systemSetting.AntiBackflowPowerNotice = 'Kw（正值：馈电到电网；-：向电网取电）'

t.common.batteryCabinetDetails = '电池柜详情'
t.common.batteryDetails = '电芯详情'
t.common.batteryAndCabinetDetails = '电池柜/电芯详情'
t.common.battery = '电芯'

t.utils.wifiCommunication = 'WiFi通讯'
t.utils.regulatoryManagement = '调节管理'
t.systemSetting.includesModels = '该模式包含机型'
t.systemSetting.modeSelect = '模式选择'

//20230920
t.deviceManage.PowerOn = '开机'
t.deviceManage.ShutDown = '关机'

t.deviceManage.upgradeErrTxt_129 = '设置数据不合法'
t.deviceManage.upgradeErrTxt_130 = '操作不被允许'
t.deviceManage.upgradeErrTxt_131 = '不支持该项参数'
t.deviceManage.upgradeErrTxt_132 = '访问FTP失败'
t.deviceManage.upgradeErrTxt_133 = '获取固件失败'
t.deviceManage.upgradeErrTxt_134 = '固件非法'
t.deviceManage.upgradeErrTxt_135 = '设备不允许'
t.deviceManage.upgradeErrTxt_136 = '烧录超时'
t.deviceManage.upgradeErrTxt_137 = '烧录失败'
t.deviceManage.upgradeErrTxt_201 = 'CRC校验失败'
t.deviceManage.upgradeErrTxt_202 = '文件固定信息校验失败'
t.deviceManage.upgradeErrTxt_203 = '停止通讯失败'
t.deviceManage.upgradeErrTxt_204 = '文件校验失败'
t.deviceManage.upgradeErrTxt_205 = '据手失败'
t.deviceManage.upgradeErrTxt_206 = '擦除MCU Fash失败'
t.deviceManage.upgradeErrTxt_207 = '发送地址失败'
t.deviceManage.upgradeErrTxt_208 = '更新MCU Flash失败'
t.deviceManage.upgradeErrTxt_209 = '发送结束标志失败'
t.deviceManage.upgradeErrTxt_210 = '等待超时'

t.utils.DIAndDOSetting = 'DI、DO setting'
t.utils.plantRelationship = '电站关系'

//20230927
t.systemSetting.noDataAndAddRootNotice = '暂无数据节点数据，请添加根节点'
t.systemSetting.currSelectNodeProp = '当前选中节点属性'
t.systemSetting.nodeTypeBelongsTo = '所属节点类型'
t.systemSetting.nodeName = '节点名称'
t.systemSetting.addNode = '添加节点'
t.systemSetting.nodeType = '节点类型'
t.systemSetting.willAddMeter = '要添加的电表'
t.systemSetting.NonMeterDevicesToAdd = '要添加的非电表设备'
t.systemSetting.showMore = '查看更多'
t.systemSetting.selectMeterNotice = '请选择电表'
t.systemSetting.transformer = '变压器'
t.systemSetting.isNothingData = '没有更多数据啦'
t.systemSetting.selectDeviceNotice = '请选择设备'
t.systemSetting.NonMeterDev = '非电表设备'
t.systemSetting.meterType_1 = '负载侧电表'
t.systemSetting.meterType_2 = '光伏侧电表'
t.systemSetting.meterType_3 = '储能侧电表'
t.systemSetting.meterType_4 = 'AC低压侧电表'
t.systemSetting.meterType_5 = '高压侧电表'
t.systemSetting.chooseDevAboutDataTitle = '选择设备数据相关'
t.systemSetting.plantRelationshipTree = '电站关系结构树'
t.systemSetting.addRootNode = '添加根节点'
t.systemSetting.save = '保存'

//20231008
t.deviceManage.deviceOpenAndClose = '设备开关机'
t.deviceManage.registerSetting = '寄存器设置'
t.deviceManage.deviceSetting = '设备设置'
t.deviceManage.pleaseSetRegisterVal = '请设置寄存器值'
t.deviceManage.registerReading = '寄存器读取'
t.deviceManage.readData = '读取数据'
t.deviceManage.registerAddr = '寄存器地址'
t.deviceManage.deviceUpgrade = '设备升级'
t.deviceManage.willUpgradeDeviceInfo = '要升级的设备信息'
t.deviceManage.devicetypeCode = '设备类型编码'
t.deviceManage.dtcType = 'DTC类型'
t.deviceManage.deviceStatusCode = '设备状态码'
t.deviceManage.clickAndUpgredeFile = '点击上传固件并升级'
t.deviceManage.hasUpgradeFiles = '已上传文件'
t.deviceManage.upgradeProgressList = '升级进度表'
t.deviceManage.upgradeStatus = '升级状态'
t.deviceManage.upgradeFailReason = '升级失败原因'
t.deviceManage.area = '{n}区域'
t.deviceManage.Only_10_devices_can_upgraded = '一次最多只能升级10台设备'
t.deviceManage.reUploadByFailNotice = '上传失败，请重新上传'

t.systemSetting.SelectHighAndLowLevels = '选择高低电平'
t.systemSetting.TriggerFunction = '触发功能'
t.systemSetting.update = '更新'
t.systemSetting.ActiveHighLevel = '高电平有效'
t.systemSetting.ActiveLowLevel = '低电平有效'
t.systemSetting.allPassOpen = '所有通道-开机'
t.systemSetting.allPassClose = '所有通道-关机'

t.productIM.ActionItems = '操作项目'
t.productIM.rejectExportNotice = '服务器拒绝导出日志，请稍后再尝试'
t.productIM.reExportByNoActionNotice = '未触发导出,请重新操作'
t.productIM.exportLoaddingTxt = '导出文件中，请耐心等待....'
t.productIM.exportTimeoutNotice = '导出超时，请稍后再试'
t.deviceManage.registerVal = '寄存器值'

t.systemSetting.meterCT = '电表CT';
t.systemSetting.workDay = '工作日'

//20231115
t.utils.MasterSlaveNetworkCommunication = '主从网络通讯'

//20231121
t.systemSetting.paramConfig = '参数配置'
t.systemSetting.PleaseSelectNetworkMode = '请选择网络模式'
t.systemSetting.buildingMode = '建立模式'
t.systemSetting.PleaseSelectBuildingMode = '请选择建立模式'
t.systemSetting.ConnectServerIP = '连接服务端IP'
t.systemSetting.canonicalIPNotice = '请输入规范的IP地址'
t.systemSetting.PleaseSelectClientNum = '请选择客户端数量'
t.systemSetting.clients = '客户端'
t.systemSetting.communicationStatus = '通讯状态'
t.systemSetting.localMachine ='本机'
t.systemSetting.remote = '远端'
t.systemSetting.abnormal = '异常'
t.systemSetting.server_unlimited = '服务端(不受限)'
t.systemSetting.server_limited = '服务端(受限)'

t.deviceManage.ThirdPartyMeterRegistrationConfiguration = '第三方电表寄存器配置'
t.deviceManage.ProfileName = '配置文件名称'
t.deviceManage.PleaseEnterTheProfileName = '请输入配置文件名称'
t.deviceManage.PleaseSelectDevAddrNotice = '请选择设备地址'
t.deviceManage.ClickAddRegisterSegment = '点击添加寄存器段'
t.deviceManage.ClickDelRegisterSegment = '点击删除寄存器段'
t.common.endAddr = '结束地址'
t.deviceManage.ReadRegisterFunctionCode = '读寄存器功能码'
t.deviceManage.PleaseSelectArea = '请选择区域'
t.deviceManage.RegisterName = '寄存器名称'
t.deviceManage.PleaseEnterTheRegisterName = '请输入寄存器名称'
t.deviceManage.bindRegisterNum = '关联的寄存器数'
t.deviceManage.PleaseSelectBindRegisterNum = '请选择关联寄存器数目'
t.deviceManage.Magnification_multiple = '倍率/倍数'
t.deviceManage.PleaseEnterMagnification_multiple = '请输入倍率/倍数'
t.deviceManage.dataType = '数据类型'
t.deviceManage.PleaseSelectDataType = '请选择数据类型'
t.deviceManage.unit = '单位'
t.deviceManage.PleaseSelectUnit = '请选择单位'
t.deviceManage.Endianness = '字节序'
t.deviceManage.PleaseSelectEndianness = '请选择字节序'
t.deviceManage.delPrevRow = '删除上一行'
t.deviceManage.addOneRow = '添加一行'
t.deviceManage.ProfileNameNotice = '字符串必须为英文和数字组成，首字符必须字母'
t.deviceManage.ReadHoldingRegister_03H = '读保持寄存器03H'
t.deviceManage.ReadInputRegister_04H = '读输入寄存器04H'
t.deviceManage.floatingPointNumber = '浮点数'
t.deviceManage.integer = '整数'
t.deviceManage.registerSegment = '寄存器段'
t.deviceManage.AllDeleted = '已全部删除了'
t.deviceManage.AlreadyAddedMaximum = '已添加到最大数量了'
t.deviceManage.StartMustLessEnd = '开始地址必须小于或等于结束地址'
t.deviceManage.overlappingIntersectionInterval = '重叠交叉区间为：'
t.deviceManage.RegisterIsUnionNotice = '该寄存器段的起始地址与其他寄存器段发生重叠交叉。'
t.deviceManage.Reminder = '温馨提醒'
t.deviceManage.haveNotBeenFilledNotice = '有部分参数还没填写选择'
t.deviceManage.exportConfigFile = '导入配置文件'
t.systemSetting.setSuccNotice1 = '设置成功之后，重启采集器生效'
t.productIM.UpgradeNotice = '升级中，请勿操作...'
t.systemSetting.standbyMode = '待机状态'

// 20231218 +
t.deviceManage.exportConfig = '导出配置'
t.deviceManage.noMatchText = '无数据匹配'
t.deviceManage.mailingAddress = '通讯地址'
t.deviceManage.noRegisterSegmentNotice = '该设备地址还没有设置寄存器段数据'
t.deviceManage.noRegisterNotice = '该设备地址还没有设置寄存器数据'
t.deviceManage.noUnit = '无单位'
t.deviceManage.addRegisterSegment = '添加寄存器段'

//20231223 +
t.systemSetting.conjunctionAdjustment = '合相调节'

//20231227 +
t.deviceManage.batchDeletion = '批量删除'
t.deviceManage.switchDevAddrNotice = '切换设备地址会重新获取新地址下寄存器段的数据, 是否继续?'
t.deviceManage.SwitchCanceled = '已取消切换'
t.deviceManage.dataHasChangedNotice = '数据发生改变，请进行保存'
t.deviceManage.verifyRegisterNameNotice = '只能输入数字字母，空格，“.”和“-”'
t.deviceManage.verifyRegisterNameNotice2 = '寄存器名称长度必须在字节为1~127的范围内'
t.deviceManage.checkboxNotice = '请先勾选表格行内寄存器复选框，才能操作'

export default t