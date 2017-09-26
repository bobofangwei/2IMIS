    var class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name, key) {
      class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    var coreHasOwn = {}.hasOwnProperty;
    var coreToString = {}.toString;
    var type = function(obj) {
      if (obj === null) {
        return String(null);
      }
      // Date，Array等类型typeof都会返回object,function、正则（部分浏览器）中 typeof都会返回function
      if (typeof obj === 'object' || typeof obj === 'function') {
        return class2type[coreToString.call(obj)];
      }
      return typeof obj;
    };
    var isPlainObject = function(obj) {
      if (type(obj) !== 'object' || obj.nodeType || obj.window === window) {
        return false;
      }

      // 如果是纯粹的对象，那么obj一定有constructor属性，并且方法hasOwnPropertyOf一定就在构造函数本身的原型中，而不用通过原型链查找得到
      if (obj.constructor && !coreHasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
      return true;
    };
    var isEmptyObject = function(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    };
    var isFunction = function(obj) {
      return type(obj) === 'function';
    };
    /* 保存信息到session中
     * @param  {string} key
     * @param  {Object} value 保存的值，要求是object类型
     */
    var saveToSession = function(key, value) {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      sessionStorage.setItem(key, value);
    };
    /**
     * 从sesseion中读取数据
     * @param  {string} key
     * @param  {all} undef session中没有与key对应的存储时，返回undef
     */
    var loadFromSession = function(key, undef) {
      var tmp = sessionStorage.getItem(key);
      var ret = undef;
      if (tmp) {
        try {
          ret = JSON.parse(tmp);
        } catch (e) {

        }
      }
      return ret;
    };
    var removeFromSession = function(key) {
      sessionStorage.removeItem(key);
    };
    var saveToLocal = function(id, key, value) {
      var tmp = localStorage.__2iMIS__;
      if (!tmp) {
        tmp = {};
      } else {
        tmp = JSON.parse(tmp);
      }
      if (!tmp[id]) {
        tmp[id] = {};
      }
      tmp[id][key] = value;
      localStorage.setItem('__2iMIS__', JSON.stringify(tmp));
    };
    var loadFromLocal = function(id, key, undef) {
      var tmp = localStorage.__2iMIS__;
      if (!tmp) {
        return undef;
      }
      tmp = JSON.parse(tmp);
      if (!tmp[id]) {
        return undef;
      }
      return tmp[id][key] ? tmp[id][key] : undef;
    };
    // 类似于jQuery中的extend，实现两个对象之间的合并
    var extend = function() {
      var target = arguments[0] || {}, // 指向目标对象
        deep = false, // 是否进行深度复制
        i = 1, // 表示源对象的起始下标
        length = arguments.length, // 表示参数个数；
        options, name, src, copy, copyIsArray, clone; // options指向某个源对象，name指向源对象的某个属性名，src目标对象某个属性的原始值，copy某个源对象的某个属性的值，copyIsArray指示变量copy是否为数组        
      // 首先进行参数修正
      if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      // 处理target是字符串或者其他情形，这在深度复制中可能出现
      if (typeof target !== 'object' || isFunction(target)) {
        target = {};
      }
      // debugger
      for (i; i < length; i++) {
        options = arguments[i];
        for (name in options) {
          src = target[name];
          copy = options[name];
          // console.log('name', name);
          // console.log('src', src);
          // console.log('copy', copy);
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }
            // 递归调用
            target[name] = extend(deep, clone, copy);
          } else {
            target[name] = copy;
          }
        }
      }
      return target;
    };
    var formatDate = function(date, fmt) {
      var o = {
        'M+': date.getMonth() + 1, // 月份 
        'd+': date.getDate(), // 日 
        'h+': date.getHours(), // 小时 
        'm+': date.getMinutes(), // 分 
        's+': date.getSeconds(), // 秒 
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度 
        'S': date.getMilliseconds() // 毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
      return fmt;
    };

    export {
      saveToLocal,
      loadFromLocal,
      removeFromSession,
      saveToSession,
      loadFromSession,
      extend,
      formatDate
    };
