/**
 * Native H5 交互JS。
 * @since 2016-5-23
 */

;(function(window,undefined){
    function newApp() {
        var App = {
                callbacks: {}
            },
            slice = Array.prototype.slice;
        /**
         * 常量定义
         */
        var ua = navigator.userAgent.toUpperCase();
        // 当前环境是否为Android平台
        App.IS_ANDROID = ua.indexOf('ANDROID') != -1;
        // 当前环境是否为IOS平台
        App.IS_IOS = ua.indexOf('IPHONE OS') != -1;
        // 当前环境是否为WP平台
        App.IS_WP = ua.indexOf('WINDOWS') != -1 && ua.indexOf('PHONE') != -1;

        App.IS_YZT = /One Account (IOS|Android)/ig.test(ua);

        App.callbacks.__leftAction__ = function() {
            var haveLeftAction = typeof App.callbacks.leftAction === 'function',
                args = slice.call(arguments);
            if(haveLeftAction) {
                setTimeout(function() {
                    App.callbacks.leftAction.apply(App.callbacks, args);
                },0);
                if(App.IS_ANDROID) {
                    App.call(['called']);
                } else if(App.IS_IOS) {
                    return true;
                }
            }
        };


        //=======================Native 相关================================

        var callindex = 0,
            isFunc = function(name) { return typeof name === 'function';},
            isObj = function(name) { return typeof name === 'object';};
        /**
         * 调用一个Native方法
         * @param {String} name 方法名称
         */
        App.call = function(name) {
            // 获取传递给Native方法的参数
            var args = slice.call(arguments, 1);
            var successCallback = '' , errorCallback = '' , item = null ,returnArg;
            var methodName = name[name.length-1];
            if (App.IS_YZT) {


                if(App.IS_ANDROID) {
                    if(window.HostApp){
                        var newArguments = [];
                        for(var i=0;i<args.length;i++){
                            if(isFunc(args[i])){
                                var callbackName = methodName+'Callback'+callindex ;
                                window[callbackName] = args[i] ;
                                newArguments.push(callbackName);
                                callindex++ ;
                            }else if(isObj(args[i])){
                                newArguments.push( JSON.stringify( args[i] ) ) ;
                            }else{
                                newArguments.push(args[i]) ;
                            }
                        }

                        // 之所以要重新调用，是因为Android 初始化HostApp可能晚于JS调用。
                        try{
                            HostApp[methodName].apply(window.HostApp,newArguments);
                        }catch(e){
                            // TODO 这里应该走Mock functions
                            var params = slice.call(arguments, 0);
                            setTimeout(function(){
                                App['call'].apply(window.App,params);
                            },300);
                        }
                    }else{
                        var params = slice.call(arguments, 0);
                        setTimeout(function(){
                            App['call'].apply(window.App,params);
                        },1000);
                    }

                } else if(App.IS_IOS) {
                    var tempArgument = [];
                    for(var i=0;i<args.length;i++ ){
                        if(isFunc(args[i])){
                            var callbackName = methodName+'Callback'+callindex ;
                            window[callbackName] = args[i] ;
                            tempArgument.push(callbackName);
                            callindex++ ;
                        }else{
                            args[i] && tempArgument.push(args[i]);
                        }

                    }
                    callindex++;
                    var iframe = document.createElement('iframe');
                    var _src = 'callnative://'+methodName+'/'+ (tempArgument && tempArgument.length ? encodeURIComponent(JSON.stringify(tempArgument)) + '/' + callindex : '');
                    console.log(_src);
                    iframe.src = _src;
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                    iframe.parentNode.removeChild(iframe);
                    iframe= null;
                } else {
                    // WP 用户不支持。 Mock functions, 模拟H5 容器
                    console.warn('Tips: No available environment WP');
                    // Mock functions, 模拟H5 容器
                    for (var i =0; i < args.length; i++) {
                        if(isFunc(args[i])) {
                            args[i]({});
                            return;
                        }
                    }
                }

            } else {
                // console.warn('Tips: No available environment, NO YZT');
                // Mock functions, 模拟H5 容器
                for (var i =0; i < args.length; i++) {
                    if(isFunc(args[i])) {
                        args[i]({});
                        return;
                    }
                }
            }
        }

        return App;
    }

    function oldApp() {
        var callIndex = 0,
            isIOSNative = navigator.userAgent.indexOf("One Account IOS") > -1,
            isAndroidNative = navigator.userAgent.indexOf("One Account Android") > -1,
            App = {};
        App.isIOS = isIOSNative;
        App.isAndroid = isAndroidNative;
        App.isNative = isIOSNative || isAndroidNative;
        App.isHighVersion =  window.isChangeSkin ? 'true' !== window.isChangeSkin : false;
        App.nativeCallbacks = {};
        App.call = (function() {
            function processArguments(methodName) {
                var args = Array.prototype.slice.call(arguments, 1),
                    callback = '',
                    item = null;
                //遍历
                for (var i = 0, len = args.length; i < len; i++) {
                    item = args[i];
                    if (typeof item === "undefined") {
                        item = '';
                    } else if (typeof(item) == 'function') {
                        // 如果参数是一个Function类型, 则将Function存储到window对象, 并将函数名传递给Native
                        callback = methodName + '_Callback' + (callIndex++);
                        window[callback] = item;
                        item = callback;
                    } else if (typeof item === 'object') {
                        item = JSON.stringify(item);
                    }
                    args[i] = encodeURI(item);
                }
                return args;
            }
            var call;
            if (isIOSNative) {
                call = function call(methodName) {
                    var args = processArguments.apply(this, arguments);
                    if (args.length) {
                        args = '/' + args.join('||');
                    } else {
                        args = '/';
                    }
                    // IOS通过location.href调用Native方法, _call变量存储一个随机数确保每次调用时URL不一致
                    ++callIndex;
                    var iframe = document.createElement("iframe");
                    iframe.style.display = 'none';
                    iframe.src = 'native://' + methodName + args + '||' + callIndex;
                    console.log(iframe.src);
                    document.body.appendChild(iframe);
                    document.body.removeChild(iframe);
                    iframe = null;
                }
            } else if (isAndroidNative) {
                call = function call(methodName) {
                    var args = processArguments.apply(this, arguments);
                    try {
                        for (var i = 0, len = args.length; i < len; i++) {
                            args[i] = '\'' + args[i] + '\'';
                        }
                        eval('window.android.' + methodName + '(' + args.join(',') + ')');
                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                call = function() {};
            }
            return call;
        }());
        return App;
    }
    window.App = newApp();
    var oldApp = oldApp();
    window.App.nativeCallbacks = oldApp.nativeCallbacks;
    window.App.isHighVersion = oldApp.isHighVersion;
    window.App.isNative = oldApp.isNative;
    window.App.oldVersion = oldApp;
}(window));


(function(WIN, undefined) {
    var nativeCallback = {};
    var App = WIN.App;
    var isIOS = App.IS_IOS,
        isAndroid = App.IS_ANDROID;
    var SUCCESS = 'success', ERROR = 'error';
    var YztApp = function () {
        var agentMatch, appVerison;
        agentMatch = window.navigator.userAgent.match(/Toa\/(.+?);/);
        appVerison = agentMatch ? agentMatch[1] : '';

        this._menus = [];
        this._setShareData();
        this._setShareIsAvailable(true);

        this.isOldVersion = appVerison < '4.2.0';
    };

    function getType(obj) {
        return Object.prototype.toString.call(obj);
    }

    function formatJSON(data) {
        if (typeof data === 'string') {
            return JSON.parse(data);
        } else {
            return data;
        }
    }

    YztApp.prototype = {
        constructor: YztApp,
        /**
         * shareData
         * isShare
         * successFn
         * errorFn
         var shareData = {
            'title":"分享活动",
            "content":"分享内容",
            "href":"http://test-events.pingan.com.cn:41080/h5/yaoyiyao/index.html",
            "imgUrl":"http://test-events.pingan.com.cn:41080/h5/yaoyiyao/images/p.png",
            'successCallback':'shareSuccessCallback',
            'failCallback':'shareFailCallback'
        };
         */
        configureShare: function(shareData, isShare, successFn, errorFn) {
            shareData = shareData || {};
            shareData.successCallback = 'yztShareSuccessFn';
            shareData.failCallback = 'yztShareFailFn';

            nativeCallback[shareData.successCallback] = function (data) {
                successFn && successFn(data);
            };

            nativeCallback[shareData.failCallback] = function (data) {
                errorFn && errorFn(data);
            };

            this._setShareIsAvailable(isShare);
            this._setShareData(shareData);
        },
        /**
         * 设置分享内容
         * @param data
         * @private
         */
        _setShareData: function (data) {
            /**
             * Native 获取分享数据
             * @returns {string}
             */
            nativeCallback.getShareData = function() {
                data = typeof data === 'object' ? JSON.stringify(data) : data;
                if(isIOS){
                    return data;
                }else if(isAndroid){
                    App.call(['onGetShareData'], data);
                }
            };
        },

        /**
         * 设置更多功能菜单中各子功能显示状态
         * @private
         */
        _setMenuActions: function() {
            var menus = this._menus.length ? this._menus : [];
            nativeCallback.getMenuVariableActions = function () {
                if(isIOS){
                    return JSON.stringify(menus);
                }else if(isAndroid){
                    App.call(['onGetMenuVariableActions'],JSON.stringify(menus));
                }
            };
        },

        /**
         * 设置是否可以分享
         * @param isShare
         * @private
         */
        _setShareIsAvailable: function (isShare) {
            this._setMenuActionConfig('share', isShare);
        },

        /**
         *  设置功能配置列表
         * @param feature
         * @param isAvailable
         * @private
         */
        _setMenuActionConfig: function(feature, isAvailable) {
            isAvailable = isAvailable ? 'true' : 'false';
            if (this._menus.length) {
                this._menus.forEach(function(t) {
                    if (t.feature === feature) {
                        t.enable = isAvailable;
                    }
                });
            } else {
                this._menus.push({
                    'feature': feature,
                    'enable': isAvailable
                });
            }

            this._setMenuActions();
        },

        /**
         * 分享到 某一个平台
         * @param type
         */
        callShareToFunc: function(type, shareData) {
            App.call(['shareTo'], {shareType: type || '0'});
            shareData && this._setShareData(shareData);
        },

        /**
         * 弹出分享浮层
         * @param type
         */
        callShareAllFunc: function(shareData) {
            App.call(['shareAll'], function (a) {
                console.log(a);
            }, function (b) {
                console.log(b);
            }, {});
            shareData && this._setShareData(shareData);
        },

        /**
         * 进入Native 页面
         * @param url
         * @param func
         * @param isClearPath， 是否清理中间的路径，使回退直接回退到H5
         */
        accessNativeModule: function(url, func, isClearPath) {
            App.call(['openURL'], function (data) {
                func && func(data ? SUCCESS : ERROR, data);
            }, function (error) {
                func && func(ERROR, error);
            }, {url: url, isClearPath: isClearPath ? true : false});
        },

        /**
         * 获取用户登录态
         */
        getLoginStatus: function(callback) {
            App.call(['checkLoginStatus'], function(data) {
                callback && callback(SUCCESS, formatJSON(data));
            }, function(err) {
                //do nothing
                callback && callback(ERROR, err);
            }, {});
        },

        /**
         *  获取设备信息， 版本号， clientNo 等
         */
        getDeviceInfo: function(callback) {
            App.call(['sendMessage'],function(data){
                callback && callback(SUCCESS, formatJSON(data));
            },function(error){
                callback && callback(ERROR, error);
            },['getDeviceInfo']);
        },

        /**
         * 获取请求GP的公共参数
         */
        getGPParams: function (callback) {
            App.call(['getPublicParameters'], function(data){
                callback && callback(SUCCESS, formatJSON(data));
            }, function(err) {
                callback && callback(ERROR, err);
            },{});
        },

        /**
         * 设置title
         * @param title
         */
        setTitle: function (title) {
            App.call(['setNavTitle'], {title: title || ''});

            document && (document.title = title);
        },

        /**
         * 获取SSO信息
         * @param callback
         */
        getSSOTicket: function(callback) {
            App.call(['sendMessage'], function(data) {
                callback && callback(SUCCESS, formatJSON(data));
            }, function(err) {
                callback && callback(ERROR, err);
            }, ['getSSOTicket']);
        },

        /**
         * 获取用户五项信息， 加密后的
         */
        getNativeInfo: function(callback) {
            if (this.isOldVersion) {
                App.oldVersion.call('getNativeInfo', function(data) {
                    callback && callback(formatJSON(data));
                });
            } else {
                App.call(['getNativeInfo'], function(data){

                    callback && callback(formatJSON(data));
                }, function(data) {
                    callback && callback(data);
                }, {});
            }

        },

        /**
         * 显示或者隐藏导航栏
         */
        showOrHideNav: function(isShow) {
            App.call(['showNavigationBar'],null, null, {'show': isShow ? true : false});
        },

        /**
         * 是否显示navigationBar右端的更多按钮
         */
        showOrHideNavMoreBtn: function(isShow) {
            App.call(['showRightBarButtonItem'], null, null,{'show': isShow? true : false});
        },

        /**
         * 埋点
         * @param eventId
         * @param label
         * @param params
         */
        ubt: function (eventId, label, params) {
            App.call(['talkingData'], null, null, {
                eventId: eventId || '',
                label: label || '',
                params: params || {}
            });
        },

        /**
         * 显示加载中
         */
        showLoading: function() {
            App.call(["showProgress"], null, null, null);
        },

        /**
         *  隐藏加载中
         */
        hideLoading: function() {
            App.call(["hideProgress"], null, null, null);
        },

        /**
         * 显示提示信息
         * @param msg
         */
        showToast: function (msg) {
            App.call(['showSuccessMsg'], null, null,{'message': msg || ''});
        },

        /**
         * js返回   先定义方法 App.goBackAction()
         */
        isNeedBack: function (sta) {
            App.call(['isNeedJSBack'], null, null, { status: sta || 'true' })
        }
    };


    WIN.YztApp = new YztApp();

    WIN.nativeCallback = WIN.nativeCallback ? Object.assign({}, WIN.nativeCallback, nativeCallback) : nativeCallback;
    module.exports.App = WIN.App;
    module.exports.YztApp = WIN.YztApp;
})(window);
