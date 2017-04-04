/**
 * JavaScript Utility Library
 *
 * @author Sujeet <sujeetkv90@gmail.com>
 * @link https://github.com/sujeet-kumar/util-js
 */

/* start generic Polyfills **********/
/* Mozilla's (ECMA-262) version of Array.indexOf method for compatibility */
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var k;
        
        if (this == null) {
            throw new TypeError('"Array" is null or not defined');
        }
        
        var O = Object(this);
        var len = O.length >>> 0;
        if (len === 0) {
            return -1;
        }
        
        var n = +fromIndex || 0;
        
        if (Math.abs(n) === Infinity) {
            n = 0;
        }
        
        if (n >= len) {
            return -1;
        }
        
        k = Math.max(((n >= 0) ? n : len - Math.abs(n)), 0);
        
        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        
        return -1;
    };
}

/* Match String in start */
if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return (this.indexOf(searchString, position) === position);
    };
}

/* Match String in end */
if (!String.prototype.endsWith)
{
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return (lastIndex !== -1 && lastIndex === position);
    };
}

/* Match String in all */
if (!String.prototype.includes)
{
    String.prototype.includes = function () {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

/* Get object keys */
if (!Object.keys)
{
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;
        
        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }
            
            var result = [], prop, i;
            
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }
            
            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
/* end generic Polyfills **********/

/* application level object container */
var Util = window.Util || {};

/* Config class */
Util.Config = (function () {
    /* private members */
    var data = {};
    
    /* public members */
    return {
        'has': function (key) {
            return data.hasOwnProperty(key);
        },
        'set': function (key, value) {
            data[key] = value;
        },
        'get': function (key, default_value) {
            return (!this.has(key)) ? default_value : data[key];
        },
        'unset': function (key) {
            return (this.has(key)) ? delete data[key] : false;
        },
        'backup': function () {
            return data;
        },
        'reset': function (dataset) {
            data = (Object.prototype.toString.call(dataset) == '[object Object]') ? dataset : {};
        }
    };
})();

/* var container */
Util.vars = {
    'log': [], /* for dummy log */
    'z_index': 900
};

/* get sequential z-index */
Util.getZIndex = function () {
    Util.vars.z_index++;
    return (Util.vars.z_index - 1);
};

/* get actual type */
Util.toType = function (val) {
    var type = Object.prototype.toString.call(val);
    return type.replace(/\[(\w+)\s(\w+)\]/, '$2').toLowerCase();
};

/* check if var is function */
Util.isFunction = function (val) {
    return (Util.toType(val) === 'function');
};

/* check if var is array */
Util.isArray = function (val) {
    return (Util.toType(val) === 'array');
};

/* check if var is object */
Util.isObject = function (val) {
    return (Util.toType(val) === 'object');
};

/* check if var is string */
Util.isString = function (val) {
    return (Util.toType(val) === 'string');
};

/* check if var is number */
Util.isNumber = function (val) {
    return (Util.toType(val) === 'number');
};

/* check if var is boolean */
Util.isBoolean = function (val) {
    return (Util.toType(val) === 'boolean');
};

/* check if var is null */
Util.isNull = function (val) {
    return (Util.toType(val) === 'null');
};

/* check if var is undefined */
Util.isUndefined = function (val) {
    return (Util.toType(val) === 'undefined');
};

/* get object size */
Util.objectSize = function (obj) {
    if (Util.isObject(obj)) {
        return Object.keys(obj).length;
    } else {
        return null;
    }
};

/* check if touch device */
Util.isTouchDevice = function () {
    return !!('ontouchstart' in window);
};

/* change first character in to uppercase */
Util.ucfirst = function (str) {
    str = '' + str;
    return str.charAt(0).toUpperCase() + str.substr(1);
};

/* truncate string upto specified length */
Util.truncate = function (string, max_length, replacement) {
    string = '' + string;
    max_length = max_length || 100;
    if (typeof replacement == 'undefined') {
        replacement = '...';
    }
    return (string.length <= max_length + (replacement.length)) 
           ? string : (string.substring(0, max_length) + replacement);
};

/* round number upto specified decimal places */
Util.round = function (num, digits) {
    var length = (typeof digits == 'undefined') ? 0 : parseInt(digits);
    var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
    return number;
};

/* format number */
Util.numberFormat = function (number, decimals, sectionDelim, decimalDelim, sectionLength) {
    var re = '\\d(?=(\\d{' + (sectionLength || 3) + '})+' + (decimals > 0 ? '\\D' : '$') + ')',
        num = number.toFixed(Math.max(0, ~~decimals));
    
    return (decimalDelim ? num.replace('.', decimalDelim) : num).replace(new RegExp(re, 'g'), '$&' + (sectionDelim || ','));
};

/* conver byte size into appropriate unit size */
Util.dataSize = function (bytes, rd, as_object) {
    rd = (typeof rd == 'undefined') ? 2 : parseInt(rd);
    var base = 1024,
        units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        e = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), (units.length - 1)),
        size = Util.round(bytes / Math.pow(base, e), rd),
        unit = units[e];
    return (as_object) ? {'size': size, 'unit': unit} : size + ' ' + unit;
};

/* get parts of version string */
Util.parseVersion = function (versionStr) {
    if (typeof versionStr != 'string') {
        return false;
    }
    var x = versionStr.split('.');
    var maj = parseInt(x[0]) || 0;
    var min = parseInt(x[1]) || 0;
    var pat = parseInt(x[2]) || 0;
    return {
        'major': maj,
        'minor': min,
        'patch': pat
    };
};

/* compare two versions */
Util.versionCompare = function (version1, version2) {
    version1 = Util.parseVersion(version1);
    version2 = Util.parseVersion(version2);
    if (!(version1 && version2)) {
        return false;
    }
    
    if (version1.major < version2.major) {
        return -1;
    } else if (version1.major > version2.major) {
        return 1;
    } else {
        if (version1.minor < version2.minor) {
            return -1;
        } else if (version1.minor > version2.minor) {
            return 1;
        } else {
            if (version1.patch < version2.patch) {
                return -1;
            } else if (version1.patch > version2.patch) {
                return 1;
            } else {
                return 0;
            }
        }
    }
};

/* parse URL */
Util.parseUrl = function (url) {
    if (!url) {
        return null;
    } else {
        var _url = document.createElement('a');
        _url.href = url;

        return {
            'protocol': _url.protocol,
            'host': _url.host,
            'hostname': _url.hostname,
            'port': _url.port,
            'pathname': _url.pathname,
            'search': _url.search,
            'hash': _url.hash
        };
    }
};

/* parse query string */
Util.parseStr = function (queryString, coerce) {
    queryString = ('' + queryString).replace(/^\?/, '');
    
    var re = /([^&=]+)=?([^&]*)/g,
        m,
        params = {},
        coerceTypes = {'true': !0, 'false': !1, 'null': null},
        decode = function (str) {
            return decodeURIComponent(str.replace(/\+/g, '%20'));
        };
    
    if (queryString) {
        while (m = re.exec(queryString)) {
            var k = decode(m[1]),
                v = decode(m[2]),
                curr = params;
            
            if (coerce) {
                v = !isNaN(v) ? +v : (v === 'undefined' ? undefined : (coerceTypes[v] ? coerceTypes[v] : v));
            }
            
            var keys = k.split('][');
            var keysLast = keys.length - 1;
            
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLast])) {
                keys[keysLast] = keys[keysLast].replace(/\]$/, '');
                keys = keys.shift().split('[').concat(keys);
                keysLast = keys.length - 1;
            }
            
            if (keysLast) {
                for (var i = 0; i <= keysLast; i++) {
                    k = (keys[i] === '') ? curr.length : keys[i];
                    curr = curr[k] = (i < keysLast) ? curr[k] || (keys[i+1] && isNaN(keys[i+1]) ? {} : []) : v;
                }
            } else if (params[k]) {
                if (Object.prototype.toString.call(params[k]) === '[object Array]') {
                    params[k].push(v);
                } else {
                    params[k] = [params[k], v];
                }
            } else {
                params[k] = v;
            }
        }
    }
    
    return params;
};

/* get random string */
Util.randomID = function (prefix) {
    prefix = (typeof prefix == 'string') ? prefix : '';
    return prefix + (Math.random().toString(36).substr(2, 9)); /* base 36 (numbers + letters) */
};

/* get randon UUID v4 */
Util.randomUUID = function (len, radix) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), uuid = [], i;
    radix = radix || chars.length;
    if (len) { /* Compact form */
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | (Math.random() * radix)];
        }
    } else { /* RFC4122 v4 form */
        var r;
        /* RFC4122 requires these characters */
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        /* Fill in random data. At i==19 set the high bits of clock sequence as per RFC4122, sec. 4.1.5 */
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16);
                uuid[i] = chars[(i == 19) ? ((r & 0x3) | 0x8) : r];
            }
        }
    }
    return uuid.join('');
};

/* get GUID of current window */
Util.windowGUID = function (topWindow) {
    var w = (topWindow) ? window.top : window.self;
    if (!w.name.match(/^GUID-/)) {
        w.name = 'GUID-' + Util.randomUUID().toUpperCase();
    }
    return w.name;
};

/* custom Polyfills */
Number.prototype.round = function (digits) {
    if (this == null) {
        throw new TypeError('"Number" is null or not defined');
    }
    return Util.round(this, digits);
};

String.prototype.ucfirst = function () {
    if (this == null) {
        throw new TypeError('"String" is null or not defined');
    }
    return Util.ucfirst(this);
};

String.prototype.truncate = function (max_length, replacement) {
    if (this == null) {
        throw new TypeError('"String" is null or not defined');
    }
    return Util.truncate(this, max_length, replacement);
};

Number.prototype.format = function (decimals, sectionDelim, decimalDelim, sectionLength) {
    return Util.numberFormat(this, decimals, sectionDelim, decimalDelim, sectionLength);
};

