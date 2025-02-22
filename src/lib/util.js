// Built by eustia.
module.exports = (function ()
{
        var _ = {};

    /* ------------------------------ last ------------------------------ */

    var last = _.last = (function (exports)
    {
        /* Get the last element of array.
         *
         * |Name  |Type |Desc                     |
         * |--------------------------------------|
         * |arr   |array|The array to query       |
         * |return|*    |The last element of array|
         *
         * ```javascript
         * last([1, 2]); // -> 2
         * ```
         */

        exports = function (arr)
        {
            var len = arr ? arr.length : 0;

            if (len) return arr[len - 1];
        };

        return exports;
    })({});

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef = _.isUndef = (function (exports)
    {
        /* Check if value is undefined.
         *
         * |Name  |Type   |Desc                      |
         * |-----------------------------------------|
         * |val   |*      |The value to check        |
         * |return|boolean|True if value is undefined|
         *
         * ```javascript
         * isUndef(void 0); // -> true
         * isUndef(null); // -> false
         * ```
         */

        exports = function (val)
        {
            return val === void 0;
        };

        return exports;
    })({});

    /* ------------------------------ isObj ------------------------------ */

    var isObj = _.isObj = (function (exports)
    {
        /* Check if value is the language type of Object.
         *
         * |Name  |Type   |Desc                      |
         * |-----------------------------------------|
         * |val   |*      |The value to check        |
         * |return|boolean|True if value is an object|
         *
         * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
         *
         * ```javascript
         * isObj({}); // -> true
         * isObj([]); // -> true
         * ```
         */

        exports = function (val)
        {
            var type = typeof val;

            return !!val && (type === 'function' || type === 'object');
        };

        return exports;
    })({});

    /* ------------------------------ inherits ------------------------------ */

    var inherits = _.inherits = (function (exports)
    {
        /* Inherit the prototype methods from one constructor into another.
         *
         * |Name      |Type    |Desc       |
         * |-------------------------------|
         * |Class     |function|Child Class|
         * |SuperClass|function|Super Class|
         *
         * ```javascript
         * function People(name)
         * {
         *     this._name = name;
         * }
         * People.prototype = {
         *     getName: function ()
         *     {
         *         return this._name;
         *     }
         * };
         * function Student(name)
         * {
         *     this._name = name;
         * }
         * inherits(Student, People);
         * var s = new Student('RedHood');
         * s.getName(); // -> 'RedHood'
         * ```
         */

        var objCreate = Object.create;

        function noop() {}

        exports = function (Class, SuperClass)
        {
            if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

            noop.prototype  = SuperClass.prototype;
            Class.prototype = new noop();
        };

        return exports;
    })({});

    /* ------------------------------ has ------------------------------ */

    var has = _.has = (function (exports)
    {
        /* Checks if key is a direct property.
         *
         * |Name  |Type   |Desc                            |
         * |-----------------------------------------------|
         * |obj   |object |The object to query             |
         * |key   |string |The path to check               |
         * |return|boolean|True if key is a direct property|
         *
         * ```javascript
         * has({one: 1}, 'one'); // -> true
         * ```
         */

        var hasOwnProp = Object.prototype.hasOwnProperty;

        exports = function (obj, key)
        {
            return hasOwnProp.call(obj, key);
        };

        return exports;
    })({});

    /* ------------------------------ slice ------------------------------ */

    var slice = _.slice = (function (exports)
    {
        // TODO

        var arrProto = Array.prototype;

        exports = function (arr, start, end)
        {
            return arrProto.slice.call(arr, start, end);
        };

        return exports;
    })({});

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys = _.allKeys = (function (exports)
    {
        /* Retrieve all the names of object's own and inherited properties.
         *
         * |Name  |Type  |Desc                           |
         * |---------------------------------------------|
         * |obj   |object|The object to query            |
         * |return|array |The array of all property names|
         *
         * > Members of Object's prototype won't be retrieved.
         *
         * ```javascript
         * var obj = Object.create({zero: 0});
         * obj.one = 1;
         * allKeys(obj) // -> ['zero', 'one']
         * ```
         */

        exports = function (obj)
        {
            var ret = [], key;

            for (key in obj) ret.push(key);

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ splitCase ------------------------------ */

    var splitCase = _.splitCase = (function (exports)
    {
        /* Split different string case to an array.
         *
         * |Name  |Type  |Desc           |
         * |-----------------------------|
         * |str   |string|String to split|
         * |return|array |Result array   |
         *
         * ```javascript
         * splitCase('foo-bar'); // -> ['foo', 'bar']
         * splitCase('foo bar'); // -> ['foo', 'bar']
         * splitCase('foo_bar'); // -> ['foo', 'bar']
         * splitCase('foo.bar'); // -> ['foo', 'bar']
         * splitCase('fooBar'); // -> ['foo', 'bar']
         * splitCase('foo-Bar'); // -> ['foo', 'bar']
         * ```
         */

        var regUpperCase = /([A-Z])/g,
            regSeparator = /[_.\- ]+/g,
            regTrim = /(^-)|(-$)/g;

        function exports(str)
        {
            str = str.replace(regUpperCase, '-$1')
                     .toLowerCase()
                     .replace(regSeparator, '-')
                     .replace(regTrim, '');

            return str.split('-');
        }

        return exports;
    })({});

    /* ------------------------------ camelCase ------------------------------ */

    var camelCase = _.camelCase = (function (exports)
    {
        /* Convert string to "camelCase".
         *
         * |Name  |Type  |Desc              |
         * |--------------------------------|
         * |str   |string|String to convert |
         * |return|string|Camel cased string|
         *
         * ```javascript
         * camelCase('foo-bar'); // -> fooBar
         * camelCase('foo bar'); // -> fooBar
         * camelCase('foo_bar'); // -> fooBar
         * camelCase('foo.bar'); // -> fooBar
         * ```
         */

        function exports(str)
        {
            var arr = splitCase(str);

            var ret = arr[0];
            arr.shift();

            arr.forEach(capitalize, arr);
            ret += arr.join('');

            return ret;
        }

        function capitalize(val, idx)
        {
            this[idx] = val.replace(/\w/, function (match)
            {
                return match.toUpperCase();
            });
        }

        return exports;
    })({});

    /* ------------------------------ kebabCase ------------------------------ */

    var kebabCase = _.kebabCase = (function (exports)
    {
        /* Convert string to "kebabCase".
         *
         * |Name  |Type  |Desc              |
         * |--------------------------------|
         * |str   |string|String to convert |
         * |return|string|Kebab cased string|
         *
         * ```javascript
         * kebabCase('fooBar'); // -> foo-bar
         * kebabCase('foo bar'); // -> foo-bar
         * kebabCase('foo_bar'); // -> foo-bar
         * kebabCase('foo.bar'); // -> foo-bar
         * ```
         */

        function exports(str)
        {
            return splitCase(str).join('-');
        }

        return exports;
    })({});

    /* ------------------------------ idxOf ------------------------------ */

    var idxOf = _.idxOf = (function (exports)
    {
        /* Get the index at which the first occurrence of value.
         *
         * |Name       |Type  |Desc                |
         * |---------------------------------------|
         * |arr        |array |Array to search     |
         * |val        |*     |Value to search for |
         * |[fromIdx=0]|number|Index to search from|
         *
         * ```javascript
         * idxOf([1, 2, 1, 2], 2, 2); // -> 3
         * ```
         */

        exports = function (arr, val, fromIdx)
        {
            return Array.prototype.indexOf.call(arr, val);
        };

        return exports;
    })({});

    /* ------------------------------ keys ------------------------------ */

    var keys = _.keys = (function (exports)
    {
        /* Create an array of the own enumerable property names of object.
         *
         * |Name  |Type  |Desc                       |
         * |-----------------------------------------|
         * |obj   |object|The object to query        |
         * |return|array |The array of property names|
         */

        exports = Object.keys || function (obj)
        {
            var ret = [], key;

            for (key in obj)
            {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ escape ------------------------------ */

    var escape = _.escape = (function (exports)
    {
        /* Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.
         *
         * |Name  |Type  |Desc            |
         * |------------------------------|
         * |str   |string|String to escape|
         * |return|string|Escaped string  |
         *
         * ```javascript
         * escape('You & Me'); -> // -> 'You &amp; Me'
         * ```
         */

        function exports(str)
        {
            return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
        }

        var MAP = exports.MAP = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        };

        var regSrc = '(?:' + keys(MAP).join('|') + ')',
            regTest = new RegExp(regSrc),
            regReplace = new RegExp(regSrc, 'g');

        function replaceFn(match)
        {
            return MAP[match];
        }

        return exports;
    })({});

    /* ------------------------------ escapeRegExp ------------------------------ */

    var escapeRegExp = _.escapeRegExp = (function (exports)
    {
        /* Escape special chars to be used as literals in RegExp constructors.
         *
         * |Name  |Type  |Desc            |
         * |------------------------------|
         * |str   |string|string to escape|
         * |return|string|Escaped string  |
         *
         * ```javascript
         * escapeRegExp('[eris]'); // -> '\\[eris\\]'
         * ```
         */

        function exports(str)
        {
            return str.replace(/\W/g, '\\$&');
        }

        return exports;
    })({});

    /* ------------------------------ evalCss ------------------------------ */

    var evalCss = _.evalCss = (function (exports)
    {
        /* Load css into page.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |css|string|Css code|
         *
         * ```javascript
         * evalCss('body{background:#08c}');
         * ```
         */

        function exports(css)
        {
            var style = document.createElement('style');
            style.textContent = css;
            style.type = 'text/css';
            document.head.appendChild(style);
        }

        return exports;
    })({});

    /* ------------------------------ get ------------------------------ */

    var get = _.get = (function (exports)
    {
        function exports(url, cb)
        {
            var xhr = new window.XMLHttpRequest();

            xhr.onload = function ()
            {
                var status = xhr.status;

                if ((status >= 200 && status < 300) || status === 304)
                {
                    cb(null, xhr.responseText);
                }
            };

            xhr.onerror = function () { cb(xhr) };

            xhr.open('GET', url);
            xhr.send();
        }

        return exports;
    })({});

    /* ------------------------------ identity ------------------------------ */

    var identity = _.identity = (function (exports)
    {
        /* Return the first argument given.
         *
         * |Name  |Type|Desc       |
         * |-----------------------|
         * |val   |*   |Any value  |
         * |return|*   |Given value|
         *
         * ```javascript
         * identity('a'); // -> 'a'
         * ```
         */

        exports = function (val)
        {
            return val;
        };

        return exports;
    })({});

    /* ------------------------------ objToStr ------------------------------ */

    var objToStr = _.objToStr = (function (exports)
    {
        /* Alias of Object.prototype.toString.
         *
         * |Name  |Type  |Desc                                    |
         * |------------------------------------------------------|
         * |value |*     |Source value                            |
         * |return|string|String representation of the given value|
         */

        var ObjToStr = Object.prototype.toString;

        exports = function (val)
        {
            return ObjToStr.call(val);
        };

        return exports;
    })({});

    /* ------------------------------ isArr ------------------------------ */

    var isArr = _.isArr = (function (exports)
    {
        /* Check if value is an `Array` object.
         *
         * |Name  |Type   |Desc                              |
         * |-------------------------------------------------|
         * |val   |*      |The value to check                |
         * |return|boolean|True if value is an `Array` object|
         *
         * ```javascript
         * isArr([]); // -> true
         * isArr({}); // -> false
         * ```
         */

        exports = Array.isArray || function (val)
        {
            return objToStr(val) === '[object Array]';
        };

        return exports;
    })({});

    /* ------------------------------ isNum ------------------------------ */

    var isNum = _.isNum = (function (exports)
    {
        /* Checks if value is classified as a Number primitive or object.
         *
         * |Name|Type|Desc|
         * |--------------|
         * |value|*|The value to check|
         * |return|boolean|True if value is correctly classified, else false|
         */

        exports = function (val)
        {
            return objToStr(val) === '[object Number]';
        };

        return exports;
    })({});

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike = _.isArrLike = (function (exports)
    {
        // TODO

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        exports = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        return exports;
    })({});

    /* ------------------------------ each ------------------------------ */

    var each = _.each = (function (exports)
    {
        /* Iterates over elements of collection and invokes iteratee for each element.
         *
         * |Name    |Type         |Desc                          |
         * |-----------------------------------------------------|
         * |obj     |object\|array|Collection to iterate over    |
         * |iteratee|function     |Function invoked per iteration|
         * |[ctx]   |*            |Function context              |
         *
         * ```javascript
         * each({'a': 1, 'b': 2}, function (val, key) {});
         * ```
         */

        exports = function (obj, iteratee, ctx)
        {
            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++) iteratee.call(ctx, obj[i], i, obj);
            } else
            {
                var _keys = keys(obj);
                for (i = 0, len = _keys.length; i < len; i++)
                {
                    iteratee.call(ctx, obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return exports;
    })({});

    /* ------------------------------ createAssigner ------------------------------ */

    var createAssigner = _.createAssigner = (function (exports)
    {
        /* Used to create extend, extendOwn and defaults.
         *
         * |Name    |Type    |Desc                          |
         * |------------------------------------------------|
         * |keysFn  |function|Function to get object keys   |
         * |defaults|boolean |No override when set to true  |
         * |return  |function|The result function, extend...|
         */

        exports = function (keysFn, defaults)
        {
            return function (obj)
            {
                each(arguments, function (src, idx)
                {
                    if (idx === 0) return;

                    var keys = keysFn(src);

                    each(keys, function (key)
                    {
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    });
                });

                return obj;
            };
        };

        return exports;
    })({});

    /* ------------------------------ defaults ------------------------------ */

    var defaults = _.defaults = (function (exports)
    {
        /* Fill in undefined properties in object with the first value present in the following list of defaults objects.
         *
         * |Name  |Type  |Desc              |
         * |--------------------------------|
         * |obj   |object|Destination object|
         * |*src  |object|Sources objects   |
         * |return|object|Destination object|
         *
         * ```javascript
         * defaults({name: 'RedHood'}, {name: 'Unknown', age: 24}); // -> {name: 'RedHood', age: 24}
         * ```
         */

        exports = createAssigner(allKeys, true);

        return exports;
    })({});

    /* ------------------------------ cookie ------------------------------ */

    var cookie = _.cookie = (function (exports)
    {
        /* Simple api for handling browser cookies.
         *
         * ## get: get cookie value.
         *
         * |Name  |Type  |Desc                      |
         * |----------------------------------------|
         * |key   |string|Cookie key                |
         * |return|string|Corresponding cookie value|
         *
         * ## set: set cookie value.
         *
         * |Name     |Type   |Desc          |
         * |--------------------------------|
         * |key      |string |Cookie key    |
         * |val      |string |Cookie value  |
         * |[options]|object |Cookie options|
         * |return   |exports|Module cookie |
         *
         * ## remove: remove cookie value.
         *
         * |Name     |Type   |Desc          |
         * |--------------------------------|
         * |key      |string |Cookie key    |
         * |[options]|object |Cookie options|
         * |return   |exports|Module cookie |
         *
         * ```javascript
         * cookie.set('a', '1', {path: '/'});
         * cookie.get('a'); // -> '1'
         * cookie.remove('a');
         * ```
         */

        var defOpts = { path: '/' };

        function setCookie(key, val, options)
        {
            if (!isUndef(val))
            {
                options = options || {};
                options = defaults(options, defOpts);

                if (isNum(options.expires))
                {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + options.expires * 864e+5);
                    options.expires = expires;
                }

                val = encodeURIComponent(val);
                key = encodeURIComponent(key);

                document.cookie = [
                    key, '=', val,
                    options.expires && '; expires=' + options.expires.toUTCString(),
                    options.path && '; path=' + options.path,
                    options.domain  && '; domain=' + options.domain,
                    options.secure ? '; secure' : ''
                ].join('');

                return exports;
            }

            var cookies = document.cookie ? document.cookie.split('; ') : [],
                result = key ? undefined : {};

            for (var i = 0, len = cookies.length; i < len; i++)
            {
                var c = cookies[i],
                    parts = c.split('='),
                    name = decodeURIComponent(parts.shift());

                c = parts.join('=');
                c = decodeURIComponent(c);

                if (key === name)
                {
                    result = c;
                    break;
                }

                if (!key) result[name] = c;
            }

            return result;
        }

        exports = {
            get: setCookie,
            set: setCookie,
            remove: function (key, options)
            {
                options = options || {};
                options.expires = -1;
                return setCookie(key, '', options);
            }
        };

        return exports;
    })({});

    /* ------------------------------ extend ------------------------------ */

    var extend = _.extend = (function (exports)
    {
        /* Copy all of the properties in the source objects over to the destination object.
         *
         * |Name  |Type  |Desc              |
         * |--------------------------------|
         * |obj   |object|Destination object|
         * |*src  |object|Sources objects   |
         * |return|object|Destination object|
         *
         * ```javascript
         * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
         * ```
         */

        exports = createAssigner(allKeys);

        return exports;
    })({});

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn = _.extendOwn = (function (exports)
    {
        /* Like extend, but only copies own properties over to the destination object.
         *
         * |Name  |Type  |Desc              |
         * |--------------------------------|
         * |obj   |object|Destination object|
         * |*src  |object|Sources objects   |
         * |return|object|Destination object|
         *
         * ```javascript
         * extendOwn({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
         * ```
         */

        exports = createAssigner(keys);

        return exports;
    })({});

    /* ------------------------------ values ------------------------------ */

    var values = _.values = (function (exports)
    {
        /* Creates an array of the own enumerable property values of object.
         *
         * |Name  |Type  |Desc                    |
         * |--------------------------------------|
         * |obj   |object|Object to query         |
         * |return|array |Array of property values|
         *
         * ```javascript
         * values({one: 1, two: 2}); // -> [1, 2]
         * ```
         */

        exports = function (obj)
        {
            var ret = [];

            each(obj, function (val) { ret.push(val) });

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ contain ------------------------------ */

    var contain = _.contain = (function (exports)
    {
        // TODO

        exports = function (arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return idxOf(arr, val) >= 0;
        };

        return exports;
    })({});

    /* ------------------------------ isStr ------------------------------ */

    var isStr = _.isStr = (function (exports)
    {
        /* Check if value is a string primitive.
         *
         * |Name  |Type   |Desc                               |
         * |--------------------------------------------------|
         * |val   |*      |The value to check                 |
         * |return|boolean|True if value is a string primitive|
         *
         * ```javascript
         * isStr('eris'); // -> true
         * ```
         */

        exports = function (val)
        {
            return objToStr(val) === '[object String]';
        };

        return exports;
    })({});

    /* ------------------------------ isBool ------------------------------ */

    var isBool = _.isBool = (function (exports)
    {
        /* Check if value is a boolean primitive.
         *
         * |Name  |Type   |Desc                      |
         * |-----------------------------------------|
         * |val   |*      |The value to check        |
         * |return|boolean|True if value is a boolean|
         *
         * ```javascript
         * isBool(true); // -> true
         * isBool(false); // -> true
         * isBool(1); // -> false
         * ```
         */

        exports = function (val)
        {
            return val === true || val === false;
        };

        return exports;
    })({});

    /* ------------------------------ isEl ------------------------------ */

    var isEl = _.isEl = (function (exports)
    {
        /* Check if value is a DOM element.
         *
         * |Name  |Type   |Desc                          |
         * |---------------------------------------------|
         * |val   |*      |Value to check                |
         * |return|boolean|True if value is a DOM element|
         *
         * ```javascript
         * isEl(document.body); // -> true
         * ```
         */

        exports = function (val)
        {
            return !!(val && val.nodeType === 1);
        };

        return exports;
    })({});

    /* ------------------------------ isErr ------------------------------ */

    var isErr = _.isErr = (function (exports)
    {
        /* Check if value is an error.
         *
         * |Name  |Type   |Desc                     |
         * |----------------------------------------|
         * |val   |*      |The value to check       |
         * |return|boolean|True if value is an error|
         *
         * ```javascript
         * isErr(new Error()); // -> true
         * ```
         */

        exports = function (val)
        {
            return objToStr(val) === '[object Error]';
        };

        return exports;
    })({});

    /* ------------------------------ isFn ------------------------------ */

    var isFn = _.isFn = (function (exports)
    {
        /* Check if value is a function.
         *
         * |Name  |Type   |Desc                       |
         * |------------------------------------------|
         * |val   |*      |The value to check         |
         * |return|boolean|True if value is a function|
         *
         * Generator function is also classified as true.
         *
         * ```javascript
         * isFn(function() {}); // -> true
         * isFn(function*() {}); // -> true
         * ```
         */

        exports = function (val)
        {
            var objStr = objToStr(val);

            return objStr === '[object Function]' || objStr === '[object GeneratorFunction]';
        };

        return exports;
    })({});

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch = _.isMatch = (function (exports)
    {
        /* Check if keys and values in src are contained in obj.
         *
         * |Name  |Type  |Desc                               |
         * |-------------------------------------------------|
         * |obj   |object |Object to inspect                 |
         * |src   |object |Object of property values to match|
         * |return|boolean|True if object is match           |
         *
         * ```javascript
         * isMatch({a: 1, b: 2}, {a: 1}); // -> true
         * ```
         */

        exports = function (obj, src)
        {
            var _keys = keys(src),
                len = _keys.length;

            if (obj == null) return !len;

            obj = Object(obj);

            for (var i = 0; i < len; i++)
            {
                var key = _keys[i];
                if (src[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        };

        return exports;
    })({});

    /* ------------------------------ isRegExp ------------------------------ */

    var isRegExp = _.isRegExp = (function (exports)
    {
        /* Check if value is a regular expression.
         *
         * |Name  |Type   |Desc                                 |
         * |----------------------------------------------------|
         * |val   |*      |The value to check                   |
         * |return|boolean|True if value is a regular expression|
         *
         * ```javascript
         * isRegExp(/a/); // -> true
         * ```
         */

        exports = function (val)
        {
            return objToStr(val) === '[object RegExp]';
        };

        return exports;
    })({});

    /* ------------------------------ loadJs ------------------------------ */

    var loadJs = _.loadJs = (function (exports)
    {
        /* Inject script tag into page with given src value.
         */

        exports = function (url, cb)
        {
            var script = document.createElement('script');
            script.src = url;
            script.onload = function ()
            {
                var isNotLoaded = script.readyState &&
                    script.readyState != "complete" &&
                    script.readyState != "loaded";

                cb && cb(!isNotLoaded);
            };
            document.body.appendChild(script);
        };

        return exports;
    })({});

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim = _.ltrim = (function (exports)
    {
        /* Remove chars or white-spaces from beginning of string.
         *
         * |Name  |Type         |Desc                  |
         * |-------------------------------------------|
         * |str   |string       |The string to trim    |
         * |chars |string\|array|The characters to trim|
         * |return|string       |The trimmed string    |
         *
         * ```javascript
         * ltrim(' abc  '); // -> 'abc  '
         * ltrim('_abc_', '_'); // -> 'abc_'
         * ltrim('_abc_', ['a', '_']); // -> 'bc_'
         * ```
         */

        var regSpace = /^\s+/;

        exports = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var start   = 0,
                len     = str.length,
                charLen = chars.length,
                found   = true,
                i, c;

            while (found && start < len)
            {
                found = false;
                i = -1;
                c = str.charAt(start);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        start++;
                        break;
                    }
                }
            }

            return (start >= len) ? '' : str.substr(start, len);
        };

        return exports;
    })({});

    /* ------------------------------ matcher ------------------------------ */

    var matcher = _.matcher = (function (exports)
    {
        // TODO

        exports = function (attrs)
        {
            attrs = extendOwn({}, attrs);

            return function (obj)
            {
                return isMatch(obj, attrs);
            };
        };

        return exports;
    })({});

    /* ------------------------------ now ------------------------------ */

    var now = _.now = (function (exports)
    {
        /* Gets the number of milliseconds that have elapsed since the Unix epoch. */

        exports = Date.now || function ()
        {
            return new Date().getTime();
        };

        return exports;
    })({});

    /* ------------------------------ optimizeCb ------------------------------ */

    var optimizeCb = _.optimizeCb = (function (exports)
    {
        exports = function (func, ctx, argCount)
        {
            if (isUndef(ctx)) return func;

            switch (argCount == null ? 3 : argCount)
            {
                case 1: return function (val)
                {
                    return func.call(ctx, val);
                };
                case 3: return function (val, idx, collection)
                {
                    return func.call(ctx, val, idx, collection);
                };
                case 4: return function (accumulator, val, idx, collection)
                {
                    return func.call(ctx, accumulator, val, idx, collection);
                }
            }

            return function ()
            {
                return func.apply(ctx, arguments);
            };
        };

        return exports;
    })({});

    /* ------------------------------ safeCb ------------------------------ */

    var safeCb = _.safeCb = (function (exports)
    {
        /* function
         * safeCb: Create callback based on input value.
         */

        exports = function (val, ctx, argCount)
        {
            if (val == null) return identity;

            if (isFn(val)) return optimizeCb(val, ctx, argCount);

            if (isObj(val)) return matcher(val);

            return function (key)
            {
                return function (obj)
                {
                    return obj == null ? undefined : obj[key];
                }
            };
        };

        return exports;
    })({});

    /* ------------------------------ filter ------------------------------ */

    var filter = _.filter = (function (exports)
    {
        /* Iterates over elements of collection, returning an array of all the values that pass a truth test.
         *
         * |Name     |Type    |Desc                                   |
         * |----------------------------------------------------------|
         * |obj      |array   |Collection to iterate over             |
         * |predicate|function|Function invoked per iteration         |
         * |[ctx]    |*       |Predicate context                      |
         * |return   |array   |Array of all values that pass predicate|
         *
         * ```javascript
         * filter([1, 2, 3, 4, 5], function (val)
         * {
         *     return val % 2 === 0;
         * }); // -> [2, 4]
         * ```
         */

        exports = function (obj, predicate, ctx)
        {
            var ret = [];

            predicate = safeCb(predicate, ctx);

            each(obj, function (val, idx, list)
            {
                if (predicate(val, idx, list)) ret.push(val);
            });

            return ret;
        };

        return exports;
    })({});

    /* ------------------------------ map ------------------------------ */

    var map = _.map = (function (exports)
    {
        /* Create an array of values by running each element in collection through iteratee.
         *
         * |Name    |Type         |Desc                          |
         * |-----------------------------------------------------|
         * |obj     |array\|object|Collection to iterate over    |
         * |iteratee|function     |Function invoked per iteration|
         * |[ctx]   |*            |Function context              |
         * |return  |array        |New mapped array              |
         *
         * ```javascript
         * map([4, 8], function (n) { return n * n; }); // -> [16, 64]
         * ```
         */

        exports = function (obj, iteratee, ctx)
        {
            iteratee = safeCb(iteratee, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len = (_keys || obj).length,
                results = Array(len);

            for (var i = 0; i < len; i++)
            {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iteratee(obj[curKey], curKey, obj);
            }

            return results;
        };

        return exports;
    })({});

    /* ------------------------------ toArr ------------------------------ */

    var toArr = _.toArr = (function (exports)
    {
        /* Convert value to an array.
         *
         * |Name  |Type |Desc            |
         * |-----------------------------|
         * |val   |*    |Value to convert|
         * |return|array|Converted array |
         *
         * ```javascript
         * toArr({a: 1, b: 2}); // -> [{a: 1, b: 2}]
         * toArr('abc'); // -> ['abc']
         * toArr(1); // -> []
         * toArr(null); // -> []
         * ```
         */

        exports = function (val)
        {
            if (!val) return [];

            if (isArr(val)) return val;

            if (isArrLike(val) && !isStr(val)) return map(val);

            return [val];
        };

        return exports;
    })({});

    /* ------------------------------ Class ------------------------------ */

    var Class = _.Class = (function (exports)
    {
        /* Create JavaScript class.
         *
         * |Name   |Type    |Desc                             |
         * |--------------------------------------------------|
         * |methods|object  |Public methods                   |
         * |statics|object  |Static methods                   |
         * |return |function|Function used to create instances|
         *
         * ```javascript
         * var People = Class({
         *     initialize: function (name, age)
         *     {
         *         this.name = name;
         *         this.age = age;
         *     },
         *     introduce: function ()
         *     {
         *         return 'I am ' + this.name + ', ' + this.age + ' years old.'.
         *     }
         * });
         *
         * var Student = People.extend({
         *     initialize: function (name, age, school)
         *     {
         *         this.callSuper('initialize', name, age);
         *
         *         this.school = school.
         *     },
         *     introduce: function ()
         *     {
         *         return this.callSuper('introduce') + '\n I study at ' + this.school + '.'.
         *     }
         * }, {
         *     is: function (obj)
         *     {
         *         return obj instanceof Student;
          *    }
         * });
         *
         * var a = new Student('allen', 17, 'Hogwarts');
         * a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
         * Student.is(a); // -> true
         * ```
         */

        var regCallSuper = /callSuper/;

        function makeClass(parent, methods, statics)
        {
            statics = statics || {};

            var ctor = function ()
            {
                var args = toArr(arguments);

                if (has(ctor.prototype, 'initialize') &&
                    !regCallSuper.test(this.initialize.toString()) &&
                    this.callSuper)
                {
                    args.unshift('initialize');
                    this.callSuper.apply(this, args);
                    args.shift();
                }

                return this.initialize
                       ? this.initialize.apply(this, args) || this
                       : this;
            };

            inherits(ctor, parent);
            ctor.superclass = ctor.prototype.superclass = parent;

            ctor.extend = function (methods, statics)
            {
                return makeClass(ctor, methods, statics);
            };
            ctor.inherits = function (Class)
            {
                inherits(Class, ctor);
            };
            ctor.methods = function (methods)
            {
                extend(ctor.prototype, methods);
                return ctor;
            };
            ctor.statics = function (statics)
            {
                extend(ctor, statics);
                return ctor;
            };

            ctor.methods(methods).statics(statics);

            return ctor;
        }

        exports = function (methods, statics)
        {
            return Base.extend(methods, statics);
        };

        var Base = exports.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function (name)
            {
                var superMethod = this.superclass.prototype[name];

                if (!superMethod) return;

                return superMethod.apply(this, toArr(arguments).slice(1));
            },
            toString: function ()
            {
                return this.className;
            }
        });

        return exports;
    })({});

    /* ------------------------------ Emitter ------------------------------ */

    var Emitter = _.Emitter = (function (exports)
    {
        exports = Class({
            initialize: function ()
            {
                this._events = this._events || {};
            },
            on: function (event, listener)
            {
                this._events[event] = this._events[event] || [];
                this._events[event].push(listener);

                return this;
            },
            off: function (event, listener)
            {
                if (!has(this._events, event)) return;

                this._events[event].splice(this._events[event].indexOf(listener), 1);

                return this;
            },
            once: function (event, listener)
            {
                var fired = false;

                function g()
                {
                    this.off(event, g);
                    if (!fired)
                    {
                        fired = true;
                        listener.apply(this, arguments);
                    }
                }

                this.on(event, g);

                return this;
            },
            emit: function (event)
            {
                if (!has(this._events, event)) return;

                var args = slice(arguments, 1);

                each(this._events[event], function (val)
                {
                    val.apply(this, args);
                }, this);

                return this;
            }
        }, {
            mixin: function (obj)
            {
                each(['on', 'off', 'once', 'emit'], function (val)
                {
                    obj[val] = Emitter.prototype[val];
                });

                obj._events = obj._events || {};
            }
        });

        return exports;
    })({});

    /* ------------------------------ Select ------------------------------ */

    var Select = _.Select = (function (exports)
    {
        /* jQuery like dom manipulator.
         */

        function mergeArr(first, second)
        {
            var len = second.length,
                i   = first.length;

            for (var j = 0; j < len; j++) first[i++] = second[j];

            first.length = i;

            return first;
        }

        exports = Class({
            className: 'Select',
            initialize: function (selector)
            {
                this.length = 0;

                if (!selector) return this;

                if (isStr(selector)) return rootSelect.find(selector);

                if (selector.nodeType)
                {
                    this[0]     = selector;
                    this.length = 1;
                }
            },
            find: function (selector)
            {
                var ret = new Select;

                this.each(function ()
                {
                    mergeArr(ret, this.querySelectorAll(selector));
                });

                return ret;
            },
            each: function (fn)
            {
                each(this, function (element, idx)
                {
                    fn.call(element, idx, element);
                });

                return this;
            }
        });

        var rootSelect = new exports(document);

        return exports;
    })({});

    /* ------------------------------ $safeNodes ------------------------------ */

    var $safeNodes = _.$safeNodes = (function (exports)
    {
        exports = function (nodes)
        {
            if (isStr(nodes)) return new Select(nodes);

            return toArr(nodes);
        };

        return exports;
    })({});

    /* ------------------------------ $attr ------------------------------ */

    var $attr = _.$attr = (function (exports)
    {
        exports = function (nodes, name, val)
        {
            nodes = $safeNodes(nodes);

            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getAttr(nodes[0], name);

            var attrs = name;
            if (!isObj(attrs))
            {
                attrs = {};
                attrs[name] = val;
            }

            setAttr(nodes, attrs);
        };

        exports.remove = function (nodes, names)
        {
            nodes = $safeNodes(nodes);
            names = toArr(names);

            each(nodes, function (node)
            {
                each(names, function (name)
                {
                    node.removeAttribute(name);
                });
            });
        };

        function getAttr(node, name)
        {
            return node.getAttribute(name);
        }

        function setAttr(nodes, attrs)
        {
            each(nodes, function (node)
            {
                each(attrs, function (val, name)
                {
                    node.setAttribute(name, val);
                });
            })
        }

        return exports;
    })({});

    /* ------------------------------ $data ------------------------------ */

    var $data = _.$data = (function (exports)
    {
        exports = function (nodes, name, val)
        {
            var dataName = name;

            if (isStr(name)) dataName = 'data-' + name;
            if (isObj(name))
            {
                dataName = {};
                each(name, function (val, key)
                {
                    dataName['data-' + key] = val;
                });
            }

            return $attr(nodes, dataName, val);
        };

        return exports;
    })({});

    /* ------------------------------ $css ------------------------------ */

    var $css = _.$css = (function (exports)
    {
        exports = function (nodes, name, val)
        {
            nodes = $safeNodes(nodes);

            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getCss(nodes[0], name);

            var css = name;
            if (!isObj(css))
            {
                css = {};
                css[name] = val;
            }

            setCss(nodes, css);
        };

        function getCss(node, name)
        {
            return node.style[camelCase(name)];
        }

        function setCss(nodes, css)
        {
            each(nodes, function (node)
            {
                var cssText = ';';
                each(css, function (val, key)
                {
                    cssText += kebabCase(key) + ':' + addPx(key, val) + ';';
                });
                node.style.cssText += cssText;
            });
        }

        var cssNumProps = [
            'column-count',
            'columns',
            'font-weight',
            'line-weight',
            'opacity',
            'z-index',
            'zoom'
        ];

        function addPx(key, val)
        {
            var needPx = isNum(val) && !contain(cssNumProps, kebabCase(key));

            return needPx ? val + 'px' : val;
        }

        return exports;
    })({});

    /* ------------------------------ $insert ------------------------------ */

    var $insert = _.$insert = (function (exports)
    {
        exports = {
            before: insertFactory('beforebegin'),
            after: insertFactory('afterend'),
            append: insertFactory('beforeend'),
            prepend: insertFactory('afterbegin')
        };

        function insertFactory(type)
        {
            return function (nodes, val)
            {
                nodes = $safeNodes(nodes);

                each(nodes, function (node)
                {
                    node.insertAdjacentHTML(type, val);
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ $offset ------------------------------ */

    var $offset = _.$offset = (function (exports)
    {
        exports = function (nodes)
        {
            nodes = $safeNodes(nodes);

            var node = nodes[0];

            var clientRect = node.getBoundingClientRect();

            return {
                left: clientRect.left + window.pageXOffset,
                top : clientRect.top  + window.pageYOffset,
                width : Math.round(clientRect.width),
                height: Math.round(clientRect.height)
            };
        };

        return exports;
    })({});

    /* ------------------------------ $property ------------------------------ */

    var $property = _.$property = (function (exports)
    {
        exports = {
            html: propFactory('innerHTML'),
            text: propFactory('textContent'),
            val: propFactory('value')
        };

        function propFactory(name)
        {
            return function (nodes, val)
            {
                nodes = $safeNodes(nodes);

                if (isUndef(val)) return nodes[0][name];

                each(nodes, function (node)
                {
                    node[name] = val;
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ $remove ------------------------------ */

    var $remove = _.$remove = (function (exports)
    {
        exports = function (nodes)
        {
            nodes = $safeNodes(nodes);

            each(nodes, function (node)
            {
                var parent = node.parentNode;

                if (parent) parent.removeChild(node);
            });
        };

        return exports;
    })({});

    /* ------------------------------ $show ------------------------------ */

    var $show = _.$show = (function (exports)
    {
        exports = function (nodes)
        {
            nodes = $safeNodes(nodes);

            each(nodes, function (node)
            {
                if (isHidden(node))
                {
                    node.style.display = getDefDisplay(node.nodeName);
                }
            });
        };

        function isHidden(node)
        {
            return getComputedStyle(node, '').getPropertyValue('display') == 'none';
        }

        var elDisplay = {};

        function getDefDisplay(nodeName)
        {
            var el, display;

            if (!elDisplay[nodeName])
            {
                el = document.createElement(nodeName);
                document.documentElement.appendChild(el);
                display = getComputedStyle(el, '').getPropertyValue("display");
                el.parentNode.removeChild(el);
                display == "none" && (display = "block");
                elDisplay[nodeName] = display;
            }

            return elDisplay[nodeName];
        }

        return exports;
    })({});

    /* ------------------------------ delegate ------------------------------ */

    var delegate = _.delegate = (function (exports)
    {
        function retTrue()  { return true }
        function retFalse() { return false }

        function trigger(e)
        {
            var handlers = this.events[e.type],
                handler,
                handlerQueue = formatHandlers.call(this, e, handlers);

            e = new delegate.Event(e);

            var i = 0, j, matched, ret;

            while ((matched = handlerQueue[i++]) && !e.isPropagationStopped())
            {
                e.curTarget = matched.el;
                j = 0;
                while ((handler = matched.handlers[j++]) && !e.isImmediatePropagationStopped())
                {
                    ret = handler.handler.apply(matched.el, [e]);

                    if (ret === false)
                    {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        }

        function formatHandlers(e, handlers)
        {
            var current = e.target,
                ret     = [],
                delegateCount = handlers.delegateCount,
                selector, matches, handler, i;

            if (current.nodeType)
            {
                for (; current !== this; current = current.parentNode || this)
                {
                    matches = [];
                    for (i = 0; i < delegateCount; i++)
                    {
                        handler = handlers[i];
                        selector = handler.selector + ' ';
                        if (matches[selector] === undefined)
                        {
                            matches[selector] = contain(this.querySelectorAll(selector), current);
                        }
                        if (matches[selector]) matches.push(handler);
                    }
                    if (matches.length) ret.push({ el: current, handlers: matches});
                }
            }

            if (delegateCount < handlers.length)
            {
                ret.push({
                    el: this,
                    handlers: handlers.slice(delegateCount)
                });
            }

            return ret;
        }

        exports = {
            add: function (el, type, selector, fn)
            {
                var handler = {
                        selector: selector,
                        handler : fn
                    },
                    handlers;

                if (!el.events) el.events = {};

                if (!(handlers = el.events[type]))
                {
                    handlers = el.events[type] = [];
                    handlers.delegateCount = 0;
                    el.addEventListener(type, function (e)
                    {
                        trigger.apply(el, arguments);
                    }, false);
                }

                selector ? handlers.splice(handlers.delegateCount++, 0, handler)
                         : handlers.push(handler);
            },
            remove: function (el, type, selector, fn)
            {
                var events = el.events;

                if (!events || !events[type]) return;

                var handlers = events[type],
                    i = handlers.length,
                    handler;

                while (i--)
                {
                    handler = handlers[i];

                    if ((!selector || handler.selector == selector) && handler.handler == fn)
                    {
                        handlers.splice(i, 1);
                        if (handler.selector)
                        {
                            handlers.delegateCount--;
                        }
                    }
                }
            },
            Event: Class({
                className: 'Event',
                initialize: function Event(e) { this.origEvent = e },
                isDefaultPrevented: retFalse,
                isPropagationStopped: retFalse,
                isImmediatePropagationStopped: retFalse,
                preventDefault: function ()
                {
                    var e = this.origEvent;

                    this.isDefaultPrevented = retTrue;
                    if (e && e.preventDefault) e.preventDefault();
                },
                stopPropagation: function ()
                {
                    var e = this.origEvent;

                    this.isPropagationStopped = retTrue;
                    if (e && e.stopPropagation) e.stopPropagation();
                },
                stopImmediatePropagation: function ()
                {
                    var e = this.origEvent;

                    this.isImmediatePropagationStopped = retTrue;
                    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
                    this.stopPropagation();
                }
            })
        };

        return exports;
    })({});

    /* ------------------------------ $event ------------------------------ */

    var $event = _.$event = (function (exports)
    {
        exports = {
            on: eventFactory('add'),
            off: eventFactory('remove')
        };

        function eventFactory(type)
        {
            return function (nodes, event, selector, handler)
            {
                nodes = $safeNodes(nodes);

                if (isUndef(handler))
                {
                    handler = selector;
                    selector = undefined;
                }

                each(nodes, function (node)
                {
                    delegate[type](node, event, selector, handler);
                });
            };
        }

        return exports;
    })({});

    /* ------------------------------ some ------------------------------ */

    var some = _.some = (function (exports)
    {
        /* Check if predicate return truthy for any element.
         *
         * |Name     |Type         |Desc                                          |
         * |----------------------------------------------------------------------|
         * |obj      |array\|object|Collection to iterate over                    |
         * |predicate|function     |Function to invoked per iteration             |
         * |ctx      |*            |Predicate context                             |
         * |return   |boolean      |True if any element passes the predicate check|
         *
         * ```javascript
         * some([2, 5], function (val)
         * {
         *     return val % 2 === 0;
         * }); // -> true
         * ```
         */

        exports = function (obj, predicate, ctx)
        {
            predicate = safeCb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len   = (_keys || obj).length;

            for (var i = 0; i < len; i++)
            {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        };

        return exports;
    })({});

    /* ------------------------------ $class ------------------------------ */

    var $class = _.$class = (function (exports)
    {
        exports = {
            add: function (nodes, name)
            {
                nodes = $safeNodes(nodes);
                var names = toArr(name);

                each(nodes, function (node)
                {
                    var classList = [];

                    each(names, function (name)
                    {
                        if (!exports.has(node, name)) classList.push(name);
                    });

                    if (classList.length !== 0) node.className += ' ' + classList.join(' ');
                });
            },
            has: function (nodes, name)
            {
                nodes = $safeNodes(nodes);

                var regName = new RegExp('(^|\\s)' + name + '(\\s|$)');

                return some(nodes, function (node)
                {
                    return regName.test(node.className);
                });
            },
            toggle: function (nodes, name)
            {
                nodes = $safeNodes(nodes);

                each(nodes, function (node)
                {
                    if (!exports.has(node, name)) return exports.add(node, name);

                    exports.remove(node, name);
                });
            },
            remove: function (nodes, name)
            {
                nodes = $safeNodes(nodes);
                var names = toArr(name);

                each(nodes, function (node)
                {
                    each(names, function (name)
                    {
                        node.classList.remove(name);
                    });
                });
            }
        };

        return exports;
    })({});

    /* ------------------------------ $ ------------------------------ */

    var $ = _.$ = (function (exports)
    {
        /* jQuery like style dom manipulator.
         */

        exports = function (selector)
        {
            return new Select(selector);
        };

        Select.methods({
            offset: function ()
            {
                return $offset(this);
            },
            hide: function ()
            {
                return this.css('display', 'none');
            },
            show: function ()
            {
                $show(this);

                return this;
            },
            first: function ()
            {
                return $(this[0]);
            },
            last: function () {
                return $(last(this));
            },
            get: function (idx)
            {
                return this[idx];
            },
            eq: function (idx)
            {
                return $(this[idx]);
            },
            on: function (event, selector, handler)
            {
                $event.on(this, event, selector, handler);

                return this;
            },
            off: function (event, selector, handler)
            {
                $event.off(this, event, selector, handler);

                return this;
            },
            html: function (val)
            {
                var result = $property.html(this, val);

                if (isUndef(val)) return result;

                return this;
            },
            text: function (val)
            {
                var result = $property.text(this, val);

                if (isUndef(val)) return result;

                return this;
            },
            val: function (val)
            {
                var result = $property.val(this, val);

                if (isUndef(val)) return result;

                return this;
            },
            css: function (name, val)
            {
                var result = $css(this, name, val);

                if (isGetter(name, val)) return result;

                return this;
            },
            attr: function (name, val)
            {
                var result = $attr(this, name, val);

                if (isGetter(name, val)) return result;

                return this;
            },
            data: function (name, val)
            {
                var result = $data(this, name, val);

                if (isGetter(name, val)) return result;

                return this;
            },
            rmAttr: function (name)
            {
                $attr.remove(this, name);

                return this;
            },
            remove: function ()
            {
                $remove(this);

                return this;
            },
            addClass: function (name)
            {
                $class.add(this, name);

                return this;
            },
            rmClass: function (name)
            {
                $class.remove(this, name);

                return this;
            },
            toggleClass: function (name)
            {
                $class.toggle(this, name);

                return this;
            },
            hasClass: function (name)
            {
                return $class.has(this, name);
            },
            parent: function ()
            {
                return $(this[0].parentNode);
            },
            append: function (val)
            {
                $insert.append(this, val);

                return this;
            },
            prepend: function (val)
            {
                $insert.prepend(this, val);

                return this;
            },
            before: function (val)
            {
                $insert.before(this, val);

                return this;
            },
            after: function (val)
            {
                $insert.after(this, val);

                return this;
            }
        });

        function isGetter(name, val)
        {
            return isUndef(val) && isStr(name);
        }

        return exports;
    })({});

    /* ------------------------------ orientation ------------------------------ */

    var orientation = _.orientation = (function (exports)
    {
        Emitter.mixin(exports);

        window.addEventListener('orientationchange', function ()
        {
            setTimeout(function ()
            {
                exports.emit('change');
            }, 150);
        }, false);

        return exports;
    })({});

    /* ------------------------------ toNum ------------------------------ */

    var toNum = _.toNum = (function (exports)
    {
        /* Convert value to a number.
         *
         * |Name  |Type  |Desc            |
         * |------------------------------|
         * |val   |*     |Value to process|
         * |return|number|Resulted number |
         *
         * ```javascript
         * toNum('5'); // -> 5
         * ```
         */

        exports = function (val)
        {
            if (isNum(val)) return val;

            if (isObj(val))
            {
                var temp = isFn(val.valueOf) ? val.valueOf() : val;
                val = isObj(temp) ? (temp + '') : temp;
            }

            if (!isStr(val)) return val === 0 ? val : +val;

            return +val;
        };

        return exports;
    })({});

    /* ------------------------------ pxToNum ------------------------------ */

    var pxToNum = _.pxToNum = (function (exports)
    {
        function exports(str)
        {
            return toNum(str.replace('px', ''));
        }

        return exports;
    })({});

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim = _.rtrim = (function (exports)
    {
        /* Remove chars or white-spaces from end of string.
         *
         * |Name  |Type         |Desc                  |
         * |-------------------------------------------|
         * |str   |string       |The string to trim    |
         * |chars |string\|array|The characters to trim|
         * |return|string       |The trimmed string    |
         *
         * ```javascript
         * rtrim(' abc  '); // -> ' abc'
         * rtrim('_abc_', '_'); // -> '_abc'
         * rtrim('_abc_', ['c', '_']); // -> '_ab'
         * ```
         */

        var regSpace = /\s+$/;

        exports = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var end = str.length - 1,
                charLen = chars.length,
                found = true,
                i, c;

            while (found && end >= 0)
            {
                found = false;
                i = -1;
                c = str.charAt(end);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        end--;
                        break;
                    }
                }
            }

            return (end >= 0) ? str.substring(0, end + 1) : '';
        };

        return exports;
    })({});

    /* ------------------------------ startWith ------------------------------ */

    var startWith = _.startWith = (function (exports)
    {
        /* Check if string starts with the given target string.
         *
         * |Name  |Type   |Desc                             |
         * |------------------------------------------------|
         * |str   |string |The string to search             |
         * |prefix|string |String prefix                    |
         * |return|boolean|True if string starts with prefix|
         *
         * ```javascript
         * startWith('ab', 'a'); // -> true
         * ```
         */

        exports = function (str, prefix)
        {
            return str.indexOf(prefix) === 0;
        };

        return exports;
    })({});

    /* ------------------------------ toStr ------------------------------ */

    var toStr = _.toStr = (function (exports)
    {
        /* Convert value to a string.
         *
         * |Name  |Type  |Desc            |
         * |------------------------------|
         * |val   |*     |Value to convert|
         * |return|string|Resulted string |
         *
         * ```javascript
         * toStr(null); // -> ''
         * toStr(1); // -> '1'
         * toStr(false); // -> 'false'
         * toStr([1, 2, 3]); // -> '1,2,3'
         * ```
         */

        function exports(val)
        {
            return val == null ? '' : val.toString();
        }

        return exports;
    })({});

    /* ------------------------------ trim ------------------------------ */

    var trim = _.trim = (function (exports)
    {
        /* Remove chars or white-spaces from beginning end of string.
         *
         * |Name  |Type         |Desc                  |
         * |-------------------------------------------|
         * |str   |string       |The string to trim    |
         * |chars |string\|array|The characters to trim|
         * |return|string       |The trimmed string    |
         *
         * ```javascript
         * trim(' abc  '); // -> 'abc'
         * trim('_abc_', '_'); // -> 'abc'
         * trim('_abc_', ['a', 'c', '_']); // -> 'b'
         * ```
         */

        var regSpace = /^\s+|\s+$/g;

        exports = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        return exports;
    })({});

    /* ------------------------------ uniqId ------------------------------ */

    var uniqId = _.uniqId = (function (exports)
    {
        /* Generate a globally-unique id.
         *
         * |Name  |Type  |Desc              |
         * |--------------------------------|
         * |prefix|string|Id prefix         |
         * |return|string|Globally-unique id|
         *
         * ```javascript
         * uniqueId('eusita_'); // -> 'eustia_xxx'
         * ```
         */

        var idCounter = 0;

        exports = function (prefix)
        {
            var id = ++idCounter + '';

            return prefix ? prefix + id : id;
        };

        return exports;
    })({});

    /* ------------------------------ unique ------------------------------ */

    var unique = _.unique = (function (exports)
    {
        /* Create duplicate-free version of an array.
         *
         * |Name     |Type    |Desc                         |
         * |------------------------------------------------|
         * |arr      |array   |Array to inspect             |
         * |[compare]|function|Function for comparing values|
         * |return   |array   |New duplicate free array     |
         *
         * ```javascript
         * unique([1, 2, 3, 1]); // -> [1, 2, 3]
         * ```
         */

        function isEqual(a, b) { return a === b }

        exports = function (arr, compare)
        {
            compare = compare || isEqual;

            return filter(arr, function (item, idx, arr)
            {
                var len = arr.length;

                while (++idx < len)
                {
                    if (compare(item, arr[idx])) return false;
                }

                return true;
            });
        };

        return exports;
    })({});

    /* ------------------------------ upperFirst ------------------------------ */

    var upperFirst = _.upperFirst = (function (exports)
    {
        /* Convert the first character of string to upper case.
         *
         * |Name  |Type  |Desc             |
         * |-------------------------------|
         * |str   |string|String to convert|
         * |return|string|Converted string |
         *
         * ```javascript
         * upperFirst('red'); // -> RED
         * ```
         */

        function exports(str)
        {
            if (str.length < 1) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        return exports;
    })({});

    return _;
})();