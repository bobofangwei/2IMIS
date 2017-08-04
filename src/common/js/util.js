var isEmptyObject = function(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
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
export {
    saveToLocal,
    loadFromLocal,
    removeFromSession,
    saveToSession,
    loadFromSession
};
