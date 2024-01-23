

const plugin = {
			
			//模仿jquery  的 extend()函数
			extend:function(json,prop){
					function F(){
						
					}  	
				  
					if(typeof json == "function"){
						F.prototype = json.prototype;
						for(let i in prop){
							F.prototype[i] = prop[i];
						}
					}
				  
					if(typeof json == "object"){
						for(let i in json){
							F.prototype[i] = json[i];
						}
					}
					return new F();
			 },
			/**
			 * 对象拓展函数,如果为数组，数组为对象数组才有效
			 * @param {Boolean} deep 是否深拷贝，
			 * @param {Object||Array} target 目标对象或者数组
			 * @param {Object||Array} options 要并集的对象或者数组(即后面的对象覆盖前面的对象)
			 * */
			 _extend:function(deep, target, options) {
					let _this = this;
					for (name in options) {
						copy = options[name];
						if (deep && copy instanceof window.Array) {
							target[name] = _this.extend(deep, [], copy);
						} else if (deep && copy instanceof window.Object) {
							target[name] = _this.extend(deep, {}, copy);
						} else {
							target[name] = options[name];
						}
					}
					return target;
			 },
			/**
			 * 浏览器地址指定携带的参数参数，返回指定的键值
			 * @param {String} name 要查询的地址参数的键
			 * @return {String} 
			 * */
			getQueryString: function(name) {
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
				let r = window.location.search.substr(1).match(reg);
				if (r != null) {
					return window.decodeURIComponent(r[2]);
				}
				return null;
			},
			/**
			 * 获取地址栏所有参数，返回json数据格式
			 * @return {Object} 
			 **/
			oGetParam: function() {
				let search = location.search.replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分//			
				if (!search) {
					return {};
				}
				let searchStr = search[0];
				let searchHash = searchStr.split('&');

				let ret = {};
				for (let i = 0, len = searchHash.length; i < len; i++) { //这里可以调用each方法
					let pair = searchHash[i];
					if ((pair = pair.split('='))[0]) {
						let key = decodeURIComponent(pair.shift());
						let value = pair.length > 1 ? pair.join('=') : pair[0];

						if (value != undefined) {
							value = decodeURIComponent(value);
						}
						if (key in ret) {
							if (ret[key].constructor != window.Array) {
								ret[key] = [ret[key]];
							}
							ret[key].push(value);
						} else {
							ret[key] = value;
						}
					}
				}
				return ret;
			},
			//父页面和当前页面刷新加载
			pageReLoad: function() {
				if(window.parent){
					r(window.parent);
				}
				else{
					window.location.reload();
				}
				
				function r(w){
					if(w.self == w.top){
						window.clearTimeout(window.rTimer);
						w.location.reload();
					}
					else{
						window.rTimer = window.setTimeout(function(){
							r(w.parent);
						},10);
						
					}
				}
			},
			/**
			 * 当前页面和父页面跳转到其他页面
			 * @param {String} Url Url指的是要跳转的路劲页面，如index.html
			 * */
			toNewPage: function(Url) {
				if(window.parent){
					r(window.parent);
				}
				else{
					window.location.href = Url;
				}
				
				function r(w){
					if(w.self == w.top){
						window.clearTimeout(window.rTimer);
						w.location.href = Url;
					}
					else{
						window.rTimer = window.setTimeout(function(){
							r(w.parent);
						},10);
						
					}
				}					
			},
			/**
			 * 判断是否移动端，
			 * @@return {Boolean} true为移动端
			 * */
			isMoblie: function() {
				let sUserAgent = navigator.userAgent.toLowerCase();
				let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				let bIsMidp = sUserAgent.match(/midp/i) == "midp";
				let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				let bIsAndroid = sUserAgent.match(/android/i) == "android";
				let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { //移动端
					return true;
				} else {
					return false;
				}
			},
			/**
			 * 判断值是否为空，回调函数
			 * @param {String} tmp 要判断的值
			 * @@return {Boolean}
			 * */
			isNull: function(tmp) {
				if (!tmp && typeof(tmp) != "undefined" && tmp != 0) { //null
					return true;
				} else {
					return false;
				}
			},
			/**
			 * 返回浏览器的类型和版本
			 * @return {Object}
			 * */
			getExplorerInfo: function() {
				let explorer = window.navigator.userAgent.toLowerCase();
				let explorerData = {
					msie:{
						rule:/msie ([\d.]+)/,
						type: "IE",
					},
					firefox:{
						rule:/firefox\/([\d.]+)/,
						type: "Firefox",
					},
					chrome:{
						rule:/chrome\/([\d.]+)/,
						type: "Chrome",
					},
					safari:{
						rule:/version\/([\d.]+)/,
						type: "Safari",
					},
					opera:{
						rule:/opera.([\d.]+)/,
						type: "Opera",
					}
				};
				let result = null;
				for(let key in explorerData){
					if(explorer.indexOf(key) >= 0){
						let ver = explorer.match( explorerData[key]['rule'] )[1];
						explorerData[key]['version'] = ver;
						result = explorerData[key];
						break;
					}
				}
				return result;
				
			},
			/**
			 * 获取两个GPS经纬度之间的距离
			 * @param {Number} lat1 第一点的纬度
			 * @param {Number} lng1 第一点的经度
			 * @param {Number} lat2 第二点的纬度
			 * @param {Number} lng2 第二点的经度
			 * @returns {Number}
			 */
			getDistance: function(lat1, lng1, lat2, lng2) {
				function toRad(d) {
					let PI = Math.PI;
					return d * PI / 180.0;
				}
				let dis = 0;
				let radLat1 = toRad(lat1);
				let radLat2 = toRad(lat2);
				let deltaLat = radLat1 - radLat2;
				let deltaLng = toRad(lng1) - toRad(lng2);
				let _dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) *
					Math.pow(Math.sin(deltaLng / 2), 2)));

				return Math.ceil(_dis * 6378137);
			},
			/**
			 * 含有规律的字符串数据转化为数组；（以字符串中的某个字段截取生成数组）
			 * @param {String} str 指的是大字符串
			 * @param {String} chart 指的是大字符串中的某个子字符串
			 * @param {Array}
			 * */
			stringToArray: function(str, chart) {
				let arrPerssion = [];
				if (str.indexOf(chart) >= 0) {
					let tempArray = str.split(chart);
					let returnArr = new window.Array();
					let i, len = tempArray.length;
					for (i = 0; i < len; i++) {
						returnArr.push(tempArray[i]);
					}

					return returnArr;
				} else {
					arrPerssion.push(str);
					return arrPerssion;
				}
			},
			/**
			 * 判断某字符串是否含有某个子字符串，如有，打印其第一次或者最后一次的索引
			 * @param {String} stringText 指的是整个字符串变量，
			 * @param {String} littleStr 指的是整个字符串变量中可能存在的字段,
			 * @param {Boolean} isFrist true，则是返回第一次出现的索引
			 * @return {Number}
			 * */
			hasStr: function(stringText, littleStr, isFrist) {
				let str = stringText;
				let str2 = littleStr;
				let d = str.length - str.indexOf(str2);
				if (d > str.length) {
					return -1;
				} else {
					return isFrist ? str.indexOf(str2) : str.lastIndexOf(str2);
					// if (isFrist && isFrist == 0) {
					// 	return str.indexOf(str2)
					// } else if (isFrist && isFrist == 1) {
					// 	return str.lastIndexOf(str2);
					// }

				}
			},
			/**
			 * 序列化表单的字符串转化为对象
			 * @param {String} serializedParams 序列化表单的字符串。序列化的form数据，通过$("form").serialize()获取的，如：name=xhb&pwd=123
			 * @return {Object}
			 * */
			serializeToObj: function(serializedParams) {
				let obj = {};

				function evalThem(str) {
					let strAry = new window.Array();
					strAry = str.split("=");
					//使用decodeURIComponent解析uri 组件编码
					for (let i = 0; i < strAry.length; i++) {
						strAry[i] = decodeURIComponent(strAry[i]);
					}
					let attributeName = strAry[0];
					let attributeValue = strAry[1].trim();
					//如果值中包含"="符号，需要合并值
					if (strAry.length > 2) {
						for (let i = 2; i < strAry.length; i++) {
							attributeValue += "=" + strAry[i].trim();
						}
					}
					if (!attributeValue) {
						return;
					}
					let attriNames = attributeName.split("."),
						curObj = obj;
					for (let i = 0; i < (attriNames.length - 1); i++) {
						curObj[attriNames[i]] ? "" : (curObj[attriNames[i]] = {});
						curObj = curObj[attriNames[i]];
					}
					//使用赋值方式obj[attributeName] = attributeValue.trim();替换
					//eval("obj."+attributeName+"=\""+attributeValue.trim()+"\";");
					//解决值attributeValue中包含单引号、双引号时无法处理的问题
					curObj[attriNames[i]] = attributeValue.trim();
				};
				let properties = serializedParams.split("&");
				for (let i = 0; i < properties.length; i++) {
					//处理每一个键值对
					evalThem(properties[i]);
				};
				return obj;
			},
			/**
			 * 对象转化为键值对拼接形式
			 * @@param {Object} item 
			 * @@return {String}
			 */
			objToKeyValue:function(item){
				let params = '?';
				  if (item) {
				    for (let key in item) {
				      params += key + '=' + item[key] + '&';
				    }
				  } else {
				    return '';
				  }
				  return params.slice(0, params.length - 1);  
			},
			//数组排序
			arrSort: function(arr) {
				return arr.sort(function(a, b) { //排序
					return a < b ? -1 : 1;
				});
			},
			//数组去重
			delRepetition: function(arr) {				
				let _this = this;
				let objArrList = ['object','array'];
				let arr2 = arr.map(function(item,i){						
					return (  objArrList.includes( _this.getDataType(item) ) ? JSON.stringify(item) : item);
				})
				let arr3 = [...new Set( arr2 )];
				return arr3.map(function(item,i){
					if(typeof item == "string" && item.length >= 2){
						if( (item[0] == "[" && item[item.length-1] == "]") || (item[0] == "{" && item[item.length-1] == "}") ){
							return JSON.parse(item);
						}
						else{
							return item;
						}
					}
					return item;
				});
				
			},
			//数组扁平化（二维数组一维处理）
			flattening: function(arr) {
				let flattened = window.Array.prototype.concat.apply([], arr);
				return flattened;
			},
			/**
			 * 统计数组中所有的值出现的次数,并以对象的形式返回
			 * @param {Array} arr 要统计的数组
			 * @return {Object}
			 * */
			countif: function(arr) {
				return arr.reduce(function(prev, next) {
					//				console.log(prev); //obj，其属性为数组的每一个值，属性值为对应属性在数组中出现的次数
					//				console.log(next); //数组的每一个值
					prev[next] = (prev[next] + 1) || 1;
					return prev;
				}, {});
			},

			/**
			 * 数组对象，将数组中具有相同值的对象 取出组成新的数组，返回新数组
			 * @param {Array} arr 数组对象
			 * @param {String} str 数组对象中相同值的属性字符串
			 * @return {Array}
			 * */
			getSameVal: function(arr, str) {
				let _arr = [],
					_t = [],
					// 临时的变量
					_tmp;

				// 按照特定的参数将数组排序将具有相同值得排在一起
				arr = arr.sort(function(a, b) {
					let s = a[str],
						t = b[str];

					return s < t ? -1 : 1;
				});

				if (arr.length) {
					_tmp = arr[0][str];
				}
				// console.log( arr );
				// 将相同类别的对象添加到统一个数组
				for (let i in arr) {
					if (arr[i][str] === _tmp) {
						_t.push(arr[i]);
					} else {
						_tmp = arr[i][str];
						_arr.push(_t);
						_t = [arr[i]];
					}
				}
				// 将最后的内容推出新数组
				_arr.push(_t);
				if(_arr[_arr.length-1][0]['name'] == '') _arr.splice(_arr.length-1,1);
				return _arr;
			},
			keyupTimer:null,
			/**
			 * 延迟加载器
			 * @param {Function} fn 回调函数
			 * @param {Number} wait 时间（毫秒）
			 * */
			debounce: function(fn, wait) { //fn指的是函数，wait指的是时间数值（秒）
				//设定默认的延迟时间
				wait = wait || 500;
				//清除定时器
				this.keyupTimer && clearTimeout(this.keyupTimer);
				//定时器执行
				this.keyupTimer = setTimeout(fn, wait);
			},
			/**
			 * 随机生成n个大写字母 ,返回数组
			 * @param {Number} n 字母个数
			 * @return {Array}
			 * */
			getCapital: function(n) {
				let result = [];
				for (let i = 0; i < n; i++) {
					let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
					//大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
					result.push(String.fromCharCode(65 + ranNum));
				}
				return result;

			},
			/**
			 * 随机生成范围数字：min最小数字，max最大数字（打印数字为最小到最大的范围）
			 * @param {Number} min 最小值
			 * @param {Number} max 最大值
			 * @return {Number}
			 * */
			randNum: function(min, max) {
				let num = Math.floor(Math.random() * (max - min) + min);
				return num;
			},

			/**
			 * 获取鼠标位置
			 * @param {Event} event 事件参数标示，必传event
			 * @return {Object}
			 * */
			getMousePos: function(event) {
				let e = event || window.event;
				let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				let x = e.pageX || e.clientX + scrollX;
				let y = e.pageY || e.clientY + scrollY;
				return {
					'x': x,
					'y': y
				};
			},
			/**
			 * 
			 * 获取当前静态所有时间
			 * @param {String} oTime 时间格式参数
			 *  'y-m-d' ==> 年月日
				 'm-d' ==> 年月
				 'm-d' ==> 月日
				 'h-m-s' ==> 时分秒
				 'h-m' ==> 时分
				 'm-s' ==> 分秒
				 'w' ==>星期
				 'ZW' ==>中文年月日时分秒
				 '' ==>年月日 时分秒
			 * */
			getOnTime: function(oTime) {
				//获取当前具体时间
				let oDate = new Date();
				let nYear = oDate.getFullYear();
				let nMonth = oDate.getMonth() * 1 + 1;
				if (nMonth < 10) nMonth = "0" + nMonth;
				let nDate = oDate.getDate();
				if (nDate < 10) nDate = "0" + nDate;
				let nHours = oDate.getHours();
				let nMinutes = oDate.getMinutes();
				let nSeconds = oDate.getSeconds();

				(nHours < 10) && (nHours = "0" + nHours);
				(nMinutes < 10) && (nMinutes = "0" + nMinutes);
				(nSeconds < 10) && (nSeconds = "0" + nSeconds);

				switch (true) {
					case (oTime === 'y-m-d'):
						return nYear + "-" + nMonth + "-" + nDate;
						break;
					case (oTime === 'y-m'):
						return nYear + "-" + nMonth;
						break;
					case (oTime === 'm-d'):
						return nMonth + "-" + nDate;
						break;
					case (oTime === 'h-m-s'):
						return nHours + ":" + nMinutes + ":" + nSeconds;
						break;
					case (oTime === 'm-s'):
						return nMinutes + ":" + nSeconds;
						break;
					case (oTime === 'h-m'):
						return nHours + ":" + nMinutes;
						break;
					case (oTime === 'y'):
						return nYear;
						break;
					case (oTime === 'd'):
						return nDate;
						break;
					case (oTime === 'w'):
						return "今天是星期" + "日一二三四五六".charAt(new Date().getDay());
						break;
					case (oTime === 'ZW'):
						return nYear + "年" + nMonth + "月" + nDate + "日  " + nHours + ":" + nMinutes + ":" + nSeconds;
						break;
					default:
						return nYear + "-" + nMonth + "-" + nDate + " " + nHours + ":" + nMinutes + ":" + nSeconds;
				}
			},

			/**
			 * yyyy-mm-dd hh:mm:ss转换为时间戳
			 * @param {String} s yyyy-mm-dd hh:mm:ss时间格式
			 * @return {Number}
			 * */
			backDateNum: function(s) {
				if (s) {
					let date = new Date(s.replace(/-/g, '/'));
					return Date.parse(date) / 1000;
				}
				return Math.ceil( new Date().getTime()/1000 );
			},
			/**
			 * 标准时间返回 y-m-d h:m:s格式
			 * @param {Object} date 当前时间对象
			 * @return {String}
			 * */
			formatDateTime: function(date) {
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				let second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},

			//获取当前时间的时间戳
			getCurrTimestamp: function() {
				let _this = this;
				let sTime = _this.formatDateTime(new Date());
				return _this.backDateNum(sTime);
			},
			/**
			 * 时间戳转换格式
			 * @param {Number} timestamp3 时间戳
			 * @param {String} sFormat 要转换的数据格式,不传为：'yyyy-MM-dd h:m:s'
				 sFormat格式字符串:
				'yyyy-MM-dd h:m:s'年月日时分秒
				'yyyy-MM-dd'
				'yyyy-MM'
			 	'h:m'
			 	'yyyy'
			 	.....
			 */
			timestampToTime: function(timestamp3, sFormat) {
				function addZero(n) {
					return (n <= 9 ? ("0" + n) : n);
				}
				let newDate = new Date();
				newDate.setTime(timestamp3 * 1000);
				Date.prototype.format = function(format) {
					let date = {
						"M+": addZero(this.getMonth() + 1),
						"d+": addZero(this.getDate()),
						"h+": addZero(this.getHours()),
						"m+": addZero(this.getMinutes()),
						"s+": addZero(this.getSeconds()),
						"q+": Math.floor((this.getMonth() + 3) / 3),
						"S+": this.getMilliseconds()
					};
					if (/(y+)/i.test(format)) {
						format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
					}
					for (let k in date) {
						if (new RegExp("(" + k + ")").test(format)) {
							format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
								date[k] : ("00" + date[k]).substr(("" + date[k]).length));
						}
					}

					return format;
				}
				return newDate.format(sFormat || 'yyyy-MM-dd h:m:s');
			},
			/**
			 * 根据年月日时间计算星期几
			 * @param {String} sDate 年月日时间，有可能是yyyy-mm-dd格式，也有可能是yyyy/mm/dd格式
			 * @return {String} 返回星期几
			 * */
			getWeeDay: function(sDate) {
				let weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				if (sDate.indexOf("/") > -1) { //yyyy/mm/dd格式
					let myDate = new Date(Date.parse(sDate));
					return weekDay[myDate.getDay()];
				} else if (sDate.indexOf("-") > -1) { //yyyy-mm-dd格式
					let myDate = new Date(Date.parse(sDate.replace(/-/g, '/')));
					return weekDay[myDate.getDay()];
				} else {
					alert("日期格式不对");
				}
			},
			incrementInitDate: 0, //增量初始时间戳
			incrementTimer: null, //增量定时器变量
			decrementInitDate: 0, //减量初始时间戳
			decrementTimer: null, //减量定时器变量
			dd_currTime: null, //增量减量对象
			/**
			 * 增量时间（顺时钟）
			 * @param {Number} nIncrement 增量（指某一刻平均递增的秒数）
			 * @param {Number} nSpeed 增速 （指平均多少ms执行一次函数的增速）
			 * @param {Function} callback 回调函数，参数为递增的时间对象
			 * @param {String} sInitDate 初始时间（包含年月日时分秒 yyyy-mm-ss hh:mm:ss格式）(可选)
			 * */
			incrementTime: function(nIncrement, nSpeed, callback, sInitDate) {
				let _this = this;
				if (sInitDate == undefined || !sInitDate) { //加载本地时间
					_this.incrementInitDate = _this.getCurrTimestamp(); //初始化增量时间，转化时间戳
				} else {
					_this.incrementInitDate = _this.backDateNum(sInitDate); //初始化增量时间，转化时间戳
				}
				clearTimeout(_this.incrementTimer);
				_this.incrementTimer = setInterval(function() {
					_this.incrementInitDate += nIncrement;
					_this.dd_currTime = _this.timestampToTime(_this.incrementInitDate, "yyyy-MM-dd h:m:s");
					_this.nIndex = _this.dd_currTime.indexOf(" ");

					_this.oDate = {
						cTime: _this.dd_currTime.slice(_this.nIndex + 1, _this.dd_currTime.length), //计算时分秒
						cDate: _this.dd_currTime.slice(0, _this.nIndex), //计算年月日
						cWeek: _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)) //计算周几
					}
					callback(_this.oDate);
					//					console.log(JSON.stringify(_this.oDate));
					_this.cTime = _this.dd_currTime.slice(_this.nIndex, _this.dd_currTime.length); //计算时分秒
					_this.cDate = _this.dd_currTime.slice(0, _this.nIndex); //计算年月日
					_this.cWeek = _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)); //计算周几
				}, nSpeed);
			},
			//清除增减量定时器,num大于0，清除增量定时器，否则清除减量
			clearTimerForCrement:function(num){
				let _this = this;
				clearTimeout( num > 0 ? _this.incrementTimer : _this.decrementTimer );
			},
			/**
			 * 减量时间（逆时钟）
			 * @param {Number} nDecrement 减量（指某一刻平均递减的秒数）
			 * @param {Number} nSpeed 减速 （指平均多少ms执行一次函数的减速）
			 * @param {Function} callback 回调函数，参数为递增的时间对象
			 * @param {String} sInitDate 初始时间（包含年月日时分秒 yyyy-mm-ss hh:mm:ss格式）(可选)
			 * */
			decrementTime: function(nDecrement, nSpeed, callback, sInitDate) {
				let _this = this;
				if (sInitDate == undefined || !sInitDate) { //加载本地时间
					_this.decrementInitDate = _this.getCurrTimestamp(); //初始化增量时间，转化时间戳
				} else {
					_this.decrementInitDate = _this.backDateNum(sInitDate); //初始化增量时间，转化时间戳
				}
				clearTimeout(_this.decrementTimer);
				_this.decrementTimer = setInterval(function() {
					_this.decrementInitDate -= nDecrement;
					_this.dd_currTime = _this.timestampToTime(_this.decrementInitDate, "yyyy-MM-dd h:m:s");
					_this.nIndex = _this.dd_currTime.indexOf(" ");

					_this.oDate = {
						cTime: _this.dd_currTime.slice(_this.nIndex + 1, _this.dd_currTime.length), //计算时分秒
						cDate: _this.dd_currTime.slice(0, _this.nIndex), //计算年月日
						cWeek: _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)) //计算周几
					}
					callback(_this.oDate);
					//					console.log(JSON.stringify(_this.oDate));
					_this.cTime = _this.dd_currTime.slice(_this.nIndex, _this.dd_currTime.length); //计算时分秒
					_this.cDate = _this.dd_currTime.slice(0, _this.nIndex); //计算年月日
					_this.cWeek = _this.getWeeDay(_this.dd_currTime.slice(0, _this.nIndex)); //计算周几
				}, nSpeed);
			},
			/**
			 * 秒数转化为时分秒时间格式
			 * @param {Number} ts 秒数
			 * @return {String}
			 * */
			secondToStr: function(ts) {
				/**
				 * zeroize值和长度（默认值是2）。
				 * @param {Object} v
				 * @param {Number} l
				 * @return {String} 
				 */
				function ultZeroize(v, l) {
					let z = "";
					l = l || 2;
					v = window.String(v);
					for (let i = 0; i < l - v.length; i++) {
						z += "0";
					}
					return z + v;
				};


				if (window.isNaN(ts)) {
					return "--:--:--";
				}
				let h = parseInt(ts / 3600);
				let m = parseInt((ts % 3600) / 60);
				let s = parseInt(ts % 60);
				return (ultZeroize(h) + ":" + ultZeroize(m) + ":" + ultZeroize(s));
			},
			/**
			 * 检测浏览器是否支持svg
			 * @return {Boolean}
			 * */
			isSupportSVG: function() {
				let SVG_NS = 'http://www.w3.org/2000/svg';
				return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
			},
			/**
			 * 检测浏览器是否支持canvas
			 * @return {Boolean}
			 * */
			isSupportCanvas: function() {
				if (document.createElement('canvas').getContext) {
					return true;
				} else {
					return false;
				}
			},

			/**
			 * 十进制转换为各种进制字符（2到32进制）
			 * @param {String} str 要转换其他进制的十进制字符串
			 * @param {Number} num 十进制要转换的进制数（2到32）
			 * @return {String} 
			 * */
			tenToAny: function(str, num) {
				return str.toString(num);
			},

			/**
			 * 其他进制（2到32）数据转换为十进制数据
			 * @param {String} str 其他进制的字符数据
			 * @param {Number} num 要转换为十进制的原进制数（2到32）
			 * @return {String}
			 * */
			AnyToTen: function(str, num) {
				return parseInt(str, num);
			},

			/**
			 * 动态加载外部js文件
			 * @param {String} path 本地路径，注意：末尾不要加“.js”后缀
			 * @param {Function} callback 动态加载js成功的回调函数
			 * */
			_loadJs: function(path, callback) {
				callback = !(typeof(callback) == "undefined") ? callback : function() {};
				let oHead = document.getElementsByTagName('HEAD').item(0);
				let script = document.createElement("script")
				script.type = "text/javascript";
				if (script.readyState) { //IE
					script.onreadystatechange = function() {
						if (script.readyState == "loaded" || script.readyState == "complete") {
							script.onreadystatechange = null;
							callback();
						}
					};
				} else { //Others: Firefox, Safari, Chrome, and Opera
					script.onload = function() {
						callback();
					};
				}
				script.src = path + ".js";
				oHead.appendChild(script);
			},

			/**
			 * 动态加载外部css文件
			 * @param {String} path 本地路径，注意：末尾不要加“.css”后缀
			 * */
			_loadCss: function(path) {
				if (!path || path.length === 0) {
					throw new Error('参数“path”是必需的!');
				}
				let head = document.getElementsByTagName('head')[0];
				let links = document.createElement('link');
				links.href = path + ".css";
				links.rel = 'stylesheet';
				links.type = 'text/css';
				head.appendChild(links);
			},

			/**
			 * 获取对象类型名
			 * @param {Any} object 各种返回类型 ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
			 * @return {String}
			 * */
			_getType: function(object) {
				return window.Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
			},

			/**
			 * 用来判断对象类型
			 * @param {Any} object 需要判断的数据
			 * @param {String} typeStr 预想的类型字符串
			 * @return {Boolean}
			 * */
			_isType: function(object, typeStr) {
				return _this._getType(object) == typeStr;
			},

			/**
			 * 动态加载js文件,批量加载js,css文件，path可以是数组格式或用逗号隔开的字符串	
			 * @param {String||Array} path path可以是数组格式或用逗号隔开的字符串,指的是需要加载的js或者css组，如["jquery","layer"]
			 * @param {String} fileType 指定要动态加载的统一的类型，js或者css
			 * */
			_import: function(path, fileType) {
				let _this = this;
				let loadfun;
				switch (fileType) {
					case "js":
						loadfun = _this._loadJs;
						break;
					case "css":
						loadfun = _this._loadCss;
						break;
					default:
						alert("请检查文件类型");
				}
				//如果path是以逗号隔开的字符串		 
				if (this._is(path, "String")) {
					if (path.indexOf(",") >= 0) {
						path = path.split(",");
					} else {
						path = [path];
					}
				}
				//循环加载文件
				for (let i = 0; i < path.length; i++) {
					loadfun(path[i]);
				}
			},
			/**
			 * 对象数据序列化为带特定字符为分隔符的字符串
			 * @param {Object} obj 需要序列化为带特地字符分割的对象
			 * @param {String} symbol 分隔符字符串
			 * @return {String}
			 * */
			objSerialize: function(obj, symbol) {
				symbol = symbol || "&";
				let str = "";
				for (let each in obj) {
					str += each + "=" + obj[each] + symbol;
				}
				return str.slice(0, str.length - (symbol.length));
			},

			/**
			 * 根据字符串获取其长度，中文汉字为2个长度，中文特殊字符也为2个长度，特殊字符长度有多有少
			 * @param {String} str 要计算长度个数的字符串
			 * @return {Number}
			 * */
			strGetLength: function(str) {

				let realLength = 0;
				for (let i = 0; i < str.length; i++) {
					let	charCode = str.charCodeAt(i);
					if (charCode >= 0 && charCode <= 128)
						realLength += 1;
					else
						realLength += 2;
				}
				return realLength;
			},
			//中文数组排序
			sortChinese: function(arr) { // 参数： 排序的数组
				//			    arr.sort(function (item1, item2) {
				//			      return item1.localeCompare(item2, 'zh-CN');
				//			    })
				if (arr.length > 0) {
					return (arr.sort(function(a, b) {
						return (a + '').localeCompare(b + '')
					}))
				}

			},
			/**
			 * 动态添加外部js和删除原js，js加载完成，执行回调
			 * @param {String} url       script的src的地址,要动态添加的脚本地址
			 * @param {Function} callback  回调函数执行
			 * @param {String} srckey    要删除的原脚本地址（虽然删除，方法还在）
			 * */
			changeScript: function(url, srckey, callback) {

				// 删除之前的script
				let scripts = document.querySelectorAll('script');
				let _iteratorNormalCompletion = true;
				let _didIteratorError = false;
				let _iteratorError = undefined;

				try {
					for (let _iterator = scripts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						let _script = _step.value;

						if (_script.src.includes(srckey)) {
							_script.parentNode.removeChild(_script);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				document.execCommand('Refresh');

				// 重新创建script
				let script = document.createElement("script");
				script.type = "text/javascript";
				script.async = true;
				script.defer = true;
				if (script.readyState) {
					// IE
					script.onreadystatechange = function () {
						if (script.readyState === "loaded" || script.readyState === "complete") {
							script.onreadystatechange = null;
							callback();
						}
					};
				} else {
					// Others
					script.onload = function () {
						callback();
					};
				}
				script.src = url;
				document.getElementsByTagName("head")[0].appendChild(script);
		
			},
			/**
			 * 动态添加js，js加载完毕，执行回调函数
			 * @param {String} url  script的src的地址,要动态添加的脚本地址
			 * @param {Function} callback  回调函数执行
			 * */
			addScript: function(url, callback) {
				// 创建script
				const script = document.createElement("script");
				script.type = "text/javascript";
				script.async = true;
				script.defer = true;
				if (script.readyState) { // IE
					script.onreadystatechange = function() {
						if (script.readyState === "loaded" || script.readyState === "complete") {
							script.onreadystatechange = null;
							callback();
						}
					};
				} else { // Others
					script.onload = function() {
						callback();
					};
				}
				script.src = url;
				document.getElementsByTagName("head")[0].appendChild(script);
			},
			/**
			 * 以几分钟为间隔，获取两个时间范围内的所有时间点，返回数组
			 * @param {String} startDate 开始时间（yyyy-mm-dd hh:mm:ss）
			 * @param {String} endDate 结束时间（yyyy-mm-dd hh:mm:ss）
			 * @param {Number} space 时间间隔（单位分钟），默认间隔30分钟
			 * @param {Boolean} isReverse 时间点是否从结束时间开始计算返回，如true，则倒叙，否则或者不传为正序
			 * @return {Array}
			 * */
			getDateArr: function(startDate, endDate, space, isReverse) {
				let _this = this;
				if (!startDate || !endDate) {
					alert('时间参数缺省');
					return;
				}
				let _startDate = new Date(startDate.replace(/-/g, "/"));
				let _endDate = new Date(endDate.replace(/-/g, "/"));

				if (!space) {
					space = 30 * 60 * 1000;
				} else {
					space = space * 60 * 1000;
				}
				let endTime = _endDate.getTime();
				let startTime = _startDate.getTime();
				let mod = endTime - startTime;

				if (mod <= space) {
					return;
					alert("时间太短");
				}
				let dateArray = [];
			
				if (isReverse) {
					//倒叙插入
					while (mod - space >= space) {
						let d = new Date();
						d.setTime(endTime - space);
						dateArray.push(d);
						mod = mod - space;
						endTime = endTime - space;
					}
				} else {
					//正序插入
					while (mod >= space) {
						let d = new Date();
						d.setTime(startTime + space);
						dateArray.push(d);
						mod = mod - space;
						startTime = startTime + space;
					}
				}
				dateArray.reverse();
				let aRes = [];
				for (let i = dateArray.length - 1; i >= 0; i--) {
					aRes.push(_this.conversionTime(dateArray[i]));
				}
				aRes.unshift( isReverse ? endDate : startDate );
				
				return aRes;
				
			},
			/**
			 * 系统时间格式转化为 yyyy-mm-dd hh-mm-ss时间格式
			 * @param {String} dt 系统时间格式时间
			 * @return {String}
			 * */
			conversionTime: function(dt) {
				return (
					dt.getFullYear() +
					"-" +
					(dt.getMonth() + 1 < 10 ?
						"0" + (dt.getMonth() + 1) :
						dt.getMonth() + 1) +
					"-" +
					(dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()) +
					" " +
					(dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) +
					":" +
					(dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()) +
					":" +
					(dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds())
				);
			},
			/**
			 * 大于0的正整数转化为大写字母
			 * @param {Number} num 大于零的正整数
			 * @return {String}
			 * */
			numToLetter: function(num) {
				let stringName = "";
				if (num > 0) {
					if (num >= 1 && num <= 26) {
						stringName = window.String.fromCharCode(64 + parseInt(num));
					} else {
						while (num > 26) {
							let count = parseInt(num / 26);
							let remainder = num % 26;
							if (remainder == 0) {
								remainder = 26;
								count--;
								stringName = window.String.fromCharCode(64 + parseInt(remainder)) + stringName;
							} else {
								stringName = window.String.fromCharCode(64 + parseInt(remainder)) + stringName;
							}
							num = count;
						}
						stringName = window.String.fromCharCode(64 + parseInt(num)) + stringName;
					}
				}

				return stringName;

			},
			//清除所有缓存
			clearCacheFn: function(callback) {
				let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if (keys) {
					for (let i = keys.length; i--;) {
						document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); //清除当前域名下的,例如：m.kevis.com
						document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString(); //清除当前域名下的，例如 .m.kevis.com
						document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString(); //清除一级域名下的或指定的，例如 .kevis.com
					}
					if (callback) callback();
				}
			},
			/**
			 * 设置cookie
			 * @param {String} name 设置的键
			 * @param {String} value 设置的值
			 * @param {Number} time 设置的过期时间，单位毫秒，如1000，则为1秒
			 * */
			_set_cookie: function(name, value, time) {
				let exp = new Date();
				exp.setTime(exp.getTime() + time * 1);
				document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
			},
			/**
			 * 读取cookie
			 * @param {String} name 设置的键
			 * */
			_get_cookie: function(name) {
				let arr,
					reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if (arr = document.cookie.match(reg)) return decodeURIComponent(arr[2]); 
				else return null;
			},
			/**
			 * 删除cookie
			 * @param {String} name 设置的键
			 * */
			_del_cookie: function(name) {
				let _this = this;
				let exp = new Date();
				exp.setTime(exp.getTime() - 1);
				let cval = _this._get_cookie(name);
				if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
			},
			/**
			 * 获取元素的实际宽高，偏移量和x,y位置
			 * @param {String} selector 元素的选择器，id要带#，class要带.
			 * */
			getDOMTrueData: function(selector) {
				return document.querySelector(selector).getBoundingClientRect();
			},
			/**
			 * 获取昨天时间（返回年月日yyyy-mm-dd格式）
			 * @return {String}
			 * */
			getYesterdayDate: function() {
				let _this = this;
				let today = _this.getOnTime('y-m-d');
				let nYesterday = _this.backDateNum(today) - 86400; //昨天时间戳
				return _this.timestampToTime(nYesterday, "yyyy-MM-dd");
			},
			//阻止事件冒泡
			stopEventBubble: function() {
				//阻止事件冒泡
				window.event ? window.event.cancelBubble = true : e.stopPropagation();
			},
			/**
			 * 获取video视频第一针图片，生成地址
			 * @param {Object} jsObj js元素对象
			 * @param {Function} fn 回调函数，返回参数是img地址
			 * */
			getVideoImg: function(jsObj, fn) {
				let video;
				let scale = 0.8;
				let initialize = function() {
					video = jsObj;
					video.addEventListener('loadeddata', captureImage); // 用于向指定元素添加事件句柄。
				};

				let captureImage = function() {
					let canvas = document.createElement("canvas"); // 创建一个画布
					canvas.width = video.videoWidth * scale;
					canvas.height = video.videoHeight * scale;
					canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); // getContext:设置画布环境；drawImage:画画 
					let imgUrl = canvas.toDataURL("image/png");
					if (fn) fn(imgUrl);

				};

				initialize();
			},
			
			/**
			 * 监听window滚动条滚动到底部的事件
			 * @param {Function} fn 回调函数
			 * */
			window_to_bottom_fn: function(fn) {
				//开启事件监听
				window.addEventListener('scroll', function() {
					let clientHeight = document.documentElement.clientHeight //可视区高度
				
					let scrollHeight = document.documentElement.scrollHeight //文档流高度
				
					let scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 //滚动出去高度
					
					//文档剩余区域的高度
					// 文档高度-可视区高度-滚动出去的高度 = 文档剩余高度
					let surplus = scrollHeight - clientHeight - scrollDistance //尚未滚出来的文档流高度
				
					//注意判断条件,当剩余文档流的高度小于0时
					if(surplus <= 0){
						setTimeout(function() {
							if (fn) fn();
						
						}, 100) //迟疑三秒再加载出来
					}
				}, false);
			},
			window_to_top_fn: function(fn) {
				//开启事件监听
				window.addEventListener('scroll', function() {					
					let scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 //滚动出去高度
			
					if(scrollDistance === 0){
						setTimeout(function() {
							if (fn) fn();
									
						}, 100) //迟疑三秒再加载出来
					}
					
				}, false);
			},
			/**
			 * Date.UTC() 格式的时间转化为中国时区的 “yyyy-mm-dd hh:mm:ss”时间格式
			 * @param {Number} n Date.UTC()之后的时间串
			 * */
			UTC_to_CTime: function(n) {
				let _this = this;
				let t = 28800000;
				let xVal = n;
				let s_utc_time = new Date(xVal);
				let sTime = s_utc_time.toUTCString(); //UTC时间转换为国际GMT时间
				// let resTime = _this.formatDateTime(new Date(sTime));
				let nT = Date.parse(new Date(sTime)) - t; //转化时间戳
				return _this.timestampToTime(nT / 1000, "yyyy-MM-dd h:m:s");
			},
			/**
			 * 根据年月返回该月份的天数
			 * @param {Number} year 年份
			 * @param {Number} month 月份
			 * @return {Number}
			 * */
			getDaysInMonth: function(year, month) {
				month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
				let temp = new Date(year, month, 0);
				return temp.getDate();
			},
			/**
			 * 根据指定年月日，获取该天前几天的天数返回数组
			 * @param {Number} n 要返回的天数
			 * @param {String} sDate 指定时间，“yyyy-mm-dd”格式 ,如果不传该参数，则默认未当前系统日期
			 * */
			getPrevDays: function(n, sDate) {
				let _this = this;
				let nDayC = 24 * 60 * 60; //一天的时间戳数。秒单位
				if (sDate) {
					let nTargetDate = _this.backDateNum(sDate);
				} else {
					let curtime = _this.getOnTime("y-m-d");
					let nTargetDate = _this.backDateNum(curtime);
				}
				let list = [];
				for (let i = 0; i < n; i++) {
					let nRes = nTargetDate - (nDayC * i);
					let sRes = _this.timestampToTime(nRes, "yyyy-MM-dd");
					list.push(sRes);
				}
				return list;
			},
			/**
			 * 根据指定年月日，获取该天后几天的天数返回数组
			 * @param {Number} n 要返回的天数
			 * @param {String} sDate 指定时间，“yyyy-mm-dd”格式 ,如果不传该参数，则默认未当前系统日期
			 * */
			getNextDays: function(n, sDate) {
				let _this = this;
				let nDayC = 24 * 60 * 60; //一天的时间戳数。秒单位
				if (sDate) {
					let nTargetDate = _this.backDateNum(sDate);
				} else {
					let curtime = _this.getOnTime("y-m-d");
					let nTargetDate = _this.backDateNum(curtime);
				}
				let list = [];
				for (let i = 0; i < n; i++) {
					let nRes = nTargetDate + (nDayC * i);
					let sRes = _this.timestampToTime(nRes, "yyyy-MM-dd");
					list.push(sRes);
				}
				return list;
			},
			/**
			 * 根据年月日，返回对应的星期
			 * @param {String} sDate 日期年月日"yyyy-mm-dd"或者"yyyy/mm/dd"
			 * @param {String} sLang 语言版本，cn代表中文星期名称，en代表英文星期名称
			 * */
			getWeekName: function(sDate, sLang) {
				let nWeek = new Date(sDate).getDay();
				switch (nWeek) {
					case 1:
						return (sLang == "en" ? "Mon." : "星期一");
						break;
					case 2:
						return (sLang == "en" ? "Tue." : "星期二");
						break;
					case 3:
						return (sLang == "en" ? "Wed." : "星期三");
						break;
					case 4:
						return (sLang == "en" ? "Thur." : "星期四");
						break;
					case 5:
						return (sLang == "en" ? "Fri." : "星期五");
						break;
					case 6:
						return (sLang == "en" ? "Sat." : "星期六");
						break;
					default:
						return (sLang == "en" ? "Sun." : "星期日");
						break;
				}
			},
			/**
			 * UTC通用标准,以z来标识的时间 ，如2019-04-24T02:30:00.000+0000，转化为“yyyy-mm-dd HH:mm:ss”格式
			 * @param {String} date UTC通用标准时间，如，2019-04-24T02:30:00.000+0000
			 * @return {String}
			 * */
			resolvingDate: function(date) {
				//date是传入的时间
				let d = new Date(date);

				let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
				let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
				let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
				let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
				let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

				let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

				return times;
			},
			/**
			 * 根据各种时间类型增量时间（年月日，年月，年）
			 * @param {String} sType 要增量的时间类型 0，1，2，分别代表“yyyy-mm-dd”,"yyyy-mm","yyyy"格式时间
			 * @param {String} sDate 要增量的时间 可能值：“yyyy-mm-dd”,"yyyy-mm","yyyy"
			 * @param {Boolean} isLimiting 增量时间是否在当前现实时间范围内，如果传参数true，则增量后的时间必须不能大于 new Date()
			 * */
			addAnyTime: function(sType, sDate, isLimiting) {
				let _this = this;
				if (sType == "0") {
					let speed = 1 * 60 * 60 * 24; //秒为单位进制
					let nTime = _this.backDateNum(sDate) + speed; //增量后时间戳
					let cur_date = _this.getOnTime('y-m-d');
					let nCurrDate = _this.backDateNum(cur_date); //当前现实时间戳间
					if (isLimiting && nTime > nCurrDate) { //有限制
						return cur_date;
					}
					let res = _this.timestampToTime(nTime, "yyyy-MM-dd");
					return res;
				} else if (sType == "1") {
					let oMonth = _this.get_string(sDate);
					let cur_date = _this.getOnTime('y-m');
					let oMonth2 = _this.get_string(cur_date); //当前的时间（yyyy-mm）
					if (oMonth.last === 12) {
						oMonth.last = 1;
						oMonth.first++;
					} else {
						oMonth.last++;
					}

					if (isLimiting) {
						if (oMonth2.first < oMonth.first || (oMonth2.first == oMonth.first && oMonth2.last < oMonth.last)) { //有限制
							return cur_date;
						}
					}
					if (oMonth.last < 10) oMonth.last = 0 + "" + oMonth.last;
					let res = oMonth.first + "-" + oMonth.last;
					return res;
				} else if (sType == "2") {
					let currYear = _this.getOnTime('y') * 1;
					let newYear = sDate * 1 + 1;
					return (newYear > currYear ? currYear : newYear);
				}
			},
			/**
			 * 根据各种时间类型减量时间（年月日，年月，年）
			 * @param {String} sType 要减量的时间类型 0，1，2，分别代表“yyyy-mm-dd”,"yyyy-mm","yyyy"格式时间
			 * @param {String} sDate 要减量的时间 可能值：“yyyy-mm-dd”,"yyyy-mm","yyyy"
			 * */
			desAnyTime: function(sType, sDate) {
				let _this = this;
				if (sType == "0") {
					let speed = 1 * 60 * 60 * 24; //秒为单位进制
					let nTime = _this.backDateNum(sDate) - speed; //减量后时间戳					
					let res = _this.timestampToTime(nTime, "yyyy-MM-dd");
					return res;
				} else if (sType == "1") {
					let oMonth = _this.get_string(sDate);
					if (oMonth.last === 1) {
						oMonth.last = 12;
						oMonth.first--;
					} else {
						oMonth.last--;
					}
					if (oMonth.last < 10) oMonth.last = 0 + "" + oMonth.last;
					let res = oMonth.first + "-" + oMonth.last;
					return res;
				} else if (sType == "2") {
					let newYear = sDate * 1 - 1;
					if (newYear < 0) {
						return sDate;
					} else {
						return newYear;
					}

				}
			},
			/**
			 * 截取带有“-”的字符串，分为两段
			 * @param {String} location 带有一个“-”的字符串
			 * @return {Object}
			 * */
			get_string: function(location) {
				let sign = location.indexOf("-");
				let ra_x = location.slice(0, sign) * 1; //x轴数
				let ra_y = location.slice(sign + 1, location.length) * 1; //y轴数
				return {
					first: ra_x,
					last: ra_y
				};
			},
			/**
			 * 截取带有特殊字符的字符串，分为两段
			 * @param {String} location 带有一个特殊字符的字符串
			 * @param {String} str 特殊字符
			 * @return {Object}
			 * */
			get_string2: function(location, str) {
				let sign = location.indexOf(str);
				let ra_x = location.slice(0, sign) * 1; //第一个
				let ra_y = location.slice(sign + 1, location.length) * 1; //第二个
				return {
					first: ra_x,
					last: ra_y
				};
			},
			/**
			 * 数组中的两个元素互换位置
			 * @param {Array} arr 数组
			 * @param {Number} index1 数组元素1的索引
			 * @param {Number} index2 数组元素2的索引
			 * */
			swapArr: function(arr, index1, index2) {
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				return arr;
			},
			//关闭当前页面
			closeCurrPage: function() {
				if (navigator.userAgent.indexOf('MSIE') > 0) { // close IE
					if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
						window.opener = null;
						window.close();
					} else {
						window.open('', '_top');
						window.top.close();
					}
				} else { // close chrome;It is effective when it is only one.
					window.opener = null;
					window.open('', '_self');
					window.close();
				}
			},
			/**
			 * 获取数组元素最大值
			 * @param {Array} arr 一维数组(里面皆是数字)
			 * @return {Number}
			 * */
			max: function(arr) {
				window.Array.prototype.max = function() {
					let max = this[0];
					let len = this.length;
					for (let i = 1; i < len; i++) {
						if (this[i] > max) {
							max = this[i];
						}
					}
					return max;
				}
				return arr.max();
			},
			/**
			 * 获取数组元素最小值
			 * @param {Array} arr 一维数组(里面皆是数字)
			 * @return {Number}
			 * */
			min: function(arr) {
				window.Array.prototype.min = function() {
					let min = this[0];
					let len = this.length;
					for (let i = 1; i < len; i++) {
						if (this[i] < min) {
							min = this[i];
						}
					}
					return min;
				}
				return arr.min();
			},
			//时分秒转时间戳
			time_to_Timestamp: function(time) {
				let s = 0;
				let hour = time.split(':')[0];
				let min = time.split(':')[1];
				let sec = time.split(':')[2];
				s = window.Number(hour * 3600) + window.Number(min * 60) + window.Number(sec);
				return s;
			},
			/**
			 * 时间戳转时分秒
			 * @param {Number} mss 秒时间戳，
			 * */
			Timestamp_to_time: function(mss) {
				mss = mss * 1000;
				let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
				let seconds = (mss % (1000 * 60)) / 1000;
				hours = hours < 10 ? ('0' + hours) : hours;
				minutes = minutes < 10 ? ('0' + minutes) : minutes;
				seconds = seconds < 10 ? ('0' + seconds) : seconds;
				return hours + ":" + minutes + ":" + seconds;
			},
			/**
			 * 判断两个数字区间是否存在重叠交叉
			 * @param {Object} A 区间对象，如{start:10,end:100}
			 * @param {Object} B 区间对象，如{start:100,end:200}
			 * */
			isUnion: function(A, B) {
				let max = [A.start, B.start];
				let min = [A.end, B.end];
				if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
					// alert("区间存在重叠交叉！");
					return true;
				} else {
					return false;
				}
			},
			/**
			 * 数组所有子元素按照索引顺序相加
			 * @param {Array} arr 所有元素都是数字的数组
			 * @return {Number}
			 * */
			arrAddFn: function(arr) {
				function reducer(accumulator, currentValue) {
					return accumulator + currentValue;
				}
				return arr.reduce(reducer);
			},
			/**
			 * 数组所有子元素按照索引顺序相减
			 * @param {Array} arr 所有元素都是数字的数组
			 * @return {Number}
			 * */
			arrDecFn: function(arr) {
				function reducer(accumulator, currentValue) {
					return accumulator - currentValue;
				}
				return arr.reduce(reducer);
			},
			/**
			 * canvas画布转化为base64
			 * @param {Object} canvas 画布DOM节点
			 * @param {String} imgType 转化为bese64图片类型(png,jpg,jpge,gif.....) 
			 * @return {String} 返回base64
			 * */
			canvasToBase64Fn: function(canvas, imgType) {
				image = canvas.toDataURL("image/" + imgType);
				return image;
			},
			/**
			 * 下载base64格式图片到本地
			 * @param {String} content base64图片字符串
			 * @param {String} fileName 下载成图片的名称 
			 * */
			downBase64Img: function(content, fileName) {
				let base64ToBlob = function(code) {
					let parts = code.split(';base64,');
					let contentType = parts[0].split(':')[1];
					let raw = window.atob(parts[1]);
					let rawLength = raw.length;
					let uInt8Array = new Uint8Array(rawLength);
					for (let i = 0; i < rawLength; ++i) {
						uInt8Array[i] = raw.charCodeAt(i);
					}
					return new Blob([uInt8Array], {
						type: contentType
					});
				};
				let aLink = document.createElement('a');
				let blob = base64ToBlob(content); //new Blob([content]);
				let evt = document.createEvent("HTMLEvents");
				evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
				aLink.download = fileName;
				aLink.href = URL.createObjectURL(blob);
				aLink.click();
			},
			/**
			 * 为容器添加文件选择事件, 容器通常是一个按钮
			 * @param {Object} container 点击按钮Dom节点
			 * @param {Function} onselect 选择文件确定之后的回调函数 
			 * @param {Function} oncancel 选择取消之后的回调函数 
			 * @param {Object} fileOption 上传文件文件表单的属性配置，例如multiple，accept等属性
			 */
			addFileSelect:function(container, onselect, oncancel, fileOption){
				container.addEventListener('click', function() {
						container.innerText = "上传中....";
						let input = document.createElement('input');
						input.type = 'file';
						if (fileOption) { //文件配置
							if (fileOption.multiple) {
								input.multiple = "multiple";
							}
							if (fileOption.accept) {
								input.accept = fileOption.accept;
							}
						}
						input.click();
						input.addEventListener("change", function() {
							// console.log("change");
							// console.log(input.files, "change");
							onselect && onselect(input.files);
						});
						container.addEventListener('focus', function() {
							// console.log(input.value); // 大概先于onchange事件100ms执行, 所以一定是空串
				
							let loop_count = 0; // 轮询次数
							// 轮询
							(function loop() {
								// console.log(input.files,"focus");
								if (input.value !== '') {
									// 不需要change事件
									// onselect === null || onselect === void 0 ? void 0 : onselect(input);
								} else if (++loop_count >= 10) {
									// 基于轮询次数的判断
									oncancel === null || oncancel === void 0 ? void 0 : oncancel(input.files);
								} else {
									// 暂时无法判断, 继续轮询
									setTimeout(loop, 20);
								}
				
								;
							})();
						}, {
							once: true
						});
					});
			},
			/**
			 * 删除从0到n个数组中的子元素
			 * @param {Array} arr 数组
			 * @param {Number} n 要删除的数组元素的前n个
			 * @param {Array} 
			 * */
			del_arr_child:function(arr,n){
				let i = arr.length;
				while(i--) {
					// console.log(i + ' = ' + arr[i]);
					if(i < n) {
						arr.splice(i, 1);
					}
				}
				return arr;
			},
			/**
			 * 根据年月日日期，获取该日期在一年中为第几天
			 * @param {String} date 日期 如：2021-12-12
			 * @return {Number}
			 */
			getDaySortByDate:function(date){
				let y, m, d;
				y = date.slice(0,4)*1;
				m = date.slice(5,7)*1;
				d = date.slice(8,10)*1;
				let total = 0;
				let arr = new window.Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
				for (let i = 0; i < m - 1; i++) {
					total = total + arr[i];
				}
				if ((y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) && m > 2) {
					total = total + d + 1;
				} else {
					total = total + d;
				}
				return total;
			},
			/**
			 * 数字超过千位格式化
			 * @param {Number} num 数字
			 * @return {String}
			 * */
			toThNum:function(num){
				
				let result = [ ], counter = 0;
			    num = (num || 0).toString().split('');
				let pointIndex = num.indexOf(".");
				let pointNum = '';
				if(pointIndex >= 0){
					pointNum = num.slice(pointIndex).join('');
					num = num.slice(0,pointIndex);
				}
			    for (let i = num.length - 1; i >= 0; i--) {
			        counter++;
			        result.unshift(num[i]);
			        if (!(counter % 3) && i != 0) { result.unshift(','); }
			    }
			    return result.join('') + pointNum;
			},
			/**
			 * 验证日期合法性
			 * @param {Number} YYYY 年
			 * @param {Number} MM 月
			 * @param {Number} DD 日
			 * @return {Object} 返回的对象 status为true标识合法，false标识不合法，txt是不合法原因
			 */
			checkIsDate:function(YYYY, MM, DD){
				function isRun(year) {
				    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
				        return true;
				    } else {
				        return false;
				    }
				}
				
				
				if (!(MM >= 1 && MM <= 12)) {
					return {
						txt:"月份不对",
						status:false
					};
				}
				switch (MM) {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						if (!(DD >= 1 && DD <= 31)) {
							return {
								txt:"日期不对",
								status:false
							};
						}
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						if (!(DD >= 1 && DD <= 30)) {
							return {
								txt:"日期不对",
								status:false
							};
						}
						break;
					case 2:
						if (isRun(YYYY)) {
							if (!(DD >= 1 && DD <= 29)) {
								return {
									txt:"日期不对",
									status:false
								};
							}
						}else{
							 if (!(DD >= 1 && DD <= 28)) {
								return {
									txt:"日期不对",
									status:false
								};
							}
						}
				}
				return {
					txt:"",
					status:true
				};
			},
			/**
			 * 根据年月“yyyy-mm”，返回对应月份天数
			 * @param {String} sDate yyyy-mm年月
			 * @return {Number}
			 */
			getDayNumByYM:function(sDate){
				function isRun(year) {
				    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
				        return true;
				    } else {
				        return false;
				    }
				}
				let day_31 = [1,3,5,7,8,10,12];
				let day_30 = [4,6,9,11];
				let year = sDate.slice(0,4)*1;
				let month = sDate.slice(5)*1;
				if( day_31.includes(month) ){
					return 31;
				}else if( day_30.includes(month) ){
					return 30;
				}else{
					return isRun(year) ? 29 : 28;
				}
			},
			/**
			 * 根据“yyyy-mm-dd”年月日，或者“yyyy-mm”年月，返回日期月份内的数字数组
			 * @param {String} sDate yyyy-mm年月或者 yyyy-mm-dd年月日
			 * @return {Array || Boolean}
			 */
			getNumListByDate:function(sDate){
				let year = sDate.slice(0,4)*1;
				let currYear = new Date().getFullYear();
				let list = [];
				if(sDate.length === 7 || currYear > year){//年月
				  if(sDate.length === 10){
					sDate = sDate.slice(0,7);
				  }
				  let days = this.getDayNumByYM(sDate);
					for(let i=0;i<days;i++){
						list.push(i+1);
					}
					return list;
				}
				else if(sDate.length === 10){//年月日
					let num = sDate.slice(8)*1;
					for(let i=0;i<num;i++){
						list.push(i+1);
					}
					return list;
				}
				else{
					return false;
				}
			},
			/**
			 * 判断一个点是否在多边形内部
			 * @param {Array} points 多边形坐标集合，二维数组,例如：[[x,y],[x,y],[x,y]]
			 * @param {Array} testPoint 测试点：[x,y]
			 * @return {Boolean} 
			 */
			insidePolygon:function(points, testPoint){
				let x = testPoint[0], y = testPoint[1];  
				let inside = false;  
				for (let i = 0, j = points.length - 1; i < points.length; j = i++) {  
					let xi = points[i][0], yi = points[i][1];  
					let xj = points[j][0], yj = points[j][1];  
		  
					let intersect = ((yi > y) != (yj > y))  
							&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);  
					if (intersect) inside = !inside;  
				}  
				return inside;
			},
			/**
			 * 判断一个点是否在圆内部
			 * @param {Array} point 点坐标：[x,y]
			 * @param {Array} circle 圆点坐标：[x,y]
			 * @param {Number} r 圆半径
			 * @return {Boolean} 
			 */
			pointInsideCircle:function(point, circle, r){
				 if (r===0) return false;  
				let dx = circle[0] - point[0]  
				let dy = circle[1] - point[1]  
				return dx * dx + dy * dy <= r * r; 
			},
			//对象合并
			objExtend:function(obj1,obj2){
			  return window.Object.assign({},obj1,obj2);
			},
			/**
			 * 根据数组对象的某一属性排序，默认正序
			 * @@param {Array} arr 数组对象
			 * @@param {String} prop 数组对象某一要排序的属性
			 * @@param {type} isReverse 值true 为倒序
			 */
			arrSortByObjProp:function(arr,prop,isReverse){
				function compare(property) {
				  return function (a, b) {
				    let value1 = a[property];
				    let value2 = b[property];
					if(isReverse){
						return value2 - value1;
					}
				    return value1 - value2;
				  }
				}
				return arr.sort( compare(prop) );
			},
			//函數柯里化,適合函数中多個參數累计计算
			curriedFn:function(fn) {
			  return function curry(...args1) {
			    if (args1.length >= fn.length) {
			      return fn.call(null, ...args1)
			    } else {
			      return function (...args2) {
			        return curry.apply(null, [...args1, ...args2])
			      }
			    }
			  }
			},
			//HTML转义
			HTMLEncode:function(html) {
			    let temp = document.createElement("div");
			    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
			    return  temp.innerHTML;
			},
			//HTML反转义
			HTMLDecode:function(text) { 
			     let temp = document.createElement("div"); 
			     temp.innerHTML = text; 
				 let output = temp.innerText || temp.textContent; 
			     temp = null; 
			     return output; 
			},
			 /**
			  * 递归处理多层对象进行字符转义
			  * @param {Object || String} _data 要转义字符的对象或者字符串格式数据
			  * @return {Object || String || Boolean} 返回false标识数据没有转化，否则返回已转化后的数据
			  */
			objHTMLEncode:function(_data){
				let _this = this;
			 	let dataType = _this.getDataType(_data);
				let canLoopTypeList = ['object','array'];
			 	if(dataType == "string"){
			 		return _this.HTMLEncode(_data);
			 	}
			 	else if(canLoopTypeList.includes(dataType)){
					let data = JSON.parse( JSON.stringify(_data) );
			 		return doObj(data);
			 	}
			 	else{
					return false;
				}
			 	function doObj(data){
			 		for(let key in data){
			 			if( canLoopTypeList.includes(_this.getDataType(data[key])) ){
			 				doObj(data[key]);
			 			}else if(_this.getDataType(data[key]) == 'string'){
			 				data[key] = _this.HTMLEncode(data[key]);
			 			}
			 		}
			 		return data;
			 	}
			 },
			 /**
			  * 针对所有输入框文本域输入限制尖括号,替换传入字符
			  * @param {String} replaceStr 要替换尖括号的字符，可以传递空字符，默认对应书名号
			  */
			inputPreventXssEvent:function(replaceStr){
				window.onload = function(){
					if(window.$){
						//所有输入框，文本域禁止输入左右尖括号（转左右书名号）
						$("input,textarea").on("input",function(){
							replaceAllInputValForPrevXss(this);
						});
					}else{
						let input = document.getElementsByTagName('input');
						let textarea = document.getElementsByTagName('textarea');
						inputPreventXss(input);
						inputPreventXss(textarea);
					}
				}
				
				
				function replaceAllInputValForPrevXss(_this){
					let tblStr = _this.value;
							
								
					tblStr = tblStr.replace(/</g, '《');
					tblStr = tblStr.replace(/>/g, '》');
					_this.value = tblStr;
				}
				
				//输入限制尖括号
				function inputPreventXss(input){
					for(let i=0;i<input.length;i++){
						if(input[i]){
							input[i].oninput = function(){
								replaceAllInputValForPrevXss(this);
							}
							input[i].onkeyup = function(){
								replaceAllInputValForPrevXss(this);
							}
							
						}
					}
				}

			},
			 /**
			  * 判断数据类型
			  * console.log(this.getDataType(new Set()))  // set
				console.log(this.getDataType(new Map())) // map
				console.log(this.getDataType(function () {})) // function
				console.log(this.getDataType({})) // object
				console.log(this.getDataType([])) // array
				console.log(this.getDataType(undefined)) // undefined
				console.log(this.getDataType(null)) // null
				console.log(this.getDataType(Symbol())) // symbol
				console.log(this.getDataType(12)) // number
				console.log(this.getDataType('')) // string
				console.log(this.getDataType(false)) // boolean
				console.log(this.getDataType(new Date())) // date
				console.log(this.getDataType(new RegExp())) // regexp
				console.log(this.getDataType(NaN)) // number
				console.log(this.getDataType(BigInt(123))) // bigint
				console.log(this.getDataType(new Blob())) //blob
				console.log(this.getDataType(new FormData())) // formdata					
			  */
			getDataType:function(data) {
			   return window.Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
			},
			/**
			 * 数组置顶元素（将数组某个元素排到第一位）
			 * @param {Array} Things 数组
			 * @param {Number} sort 原数组中某个要置顶的元素的索引
			 * @return {Array}
			 */
			arrElementTop:function(Things,sort){				
				Things.map((item,index) => {
					if(index === sort){
						Things.unshift(Things.splice(index , 1)[0]);
					}			  
				});
				
				return Things;
			},
			/**
			 * 四舍五入，window对象下的toFixed不精准，所以自定义四舍五入函数
			 * @param {String || Number} target 要转化的数字
			 * @param {Number} length 保留位数
			 */
			$toFixed(target, length) {
			  let str = target + ''; //将调用该方法的数字转为字符串
			  let dot = str.indexOf("."); //找到小数点的位置
			  let decimal = str.split(".")[1];
			
			  if (dot != -1) {
			    if (decimal.length === length) return str;
			    if (decimal.length <= length) { //小数位少于补零
			      let n = "";
			      for (let i = 0; i < length - decimal.length; i++) {
			        n += "0";
			      }
			      return str + n;
			    } else { //小数位多于做四舍五入
			      if (Number(decimal[length]) >= 5) {
			        let s = parseInt(decimal[length - 1]) + 1;
			        let d = decimal.slice(0, length - 1);
			        decimal = d + s.toString();
			        //decimal = decimal.slice(0,length-1);
			        return str.split(".")[0] + "." + decimal;
			      } else {
			        decimal = decimal.split("").splice(0, length).join("");
			        return str.split(".")[0] + "." + decimal;
			      }
			    }
			  } else { //整数补零
			    let n = "";
			    for (let i = 0; i < length; i++) {
			      n += "0";
			    }
			    return str + "." + n;
			  }
			},
			/**
			 * 根据图片url转为文件对象
			 * @param {String} url	文件地址
			 * @param {String} imageName 文件名
			 * @returns {Promise<unknown>}
			 */
			getImageFileFromUrl(url, imageName) {
				let lastDoot = url.lastIndexOf('.');
				let imgType = url.slice(lastDoot+1);
				return new Promise((resolve, reject) => {
					let blob = null;
					let xhr = new XMLHttpRequest();
					xhr.open("GET", url);
					xhr.setRequestHeader('Accept', 'image/'+imgType);
					xhr.responseType = "blob";
					// 加载时处理
					xhr.onload = () => {
						// 获取返回结果
						blob = xhr.response;
						let imgFile = new File([blob], imageName, { type: 'image/'+imgType });
						// 返回结果
						resolve(imgFile);
					};
					xhr.onerror = (e) => {
						reject(e)
					};
					// 发送
					xhr.send();
				});
			},
			/**
			 * 根据属性值，以及对应map表，判断一致，返回对应item
			 * @param {Array} array 数组链表
			 * @param {String} key 属性
			 * @param {String} val 属性对应值
			 * @returns {Object}
			*/
			getItemByProp(array,key,val){
				let obj = {};
				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					if(element[key] == val){
						obj = element;
						break;
					} 
				}
				return obj;
			},
		}
/*xhb 常用插件库   eeeeeeeeeeeeeeeeeeeeeeeeeeeeee   **/

export default plugin;