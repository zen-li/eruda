import Tool from '../DevTools/Tool.es6'
import CssStore from './CssStore.es6'
import Highlight from './Highlight.es6'
import Select from './Select.es6'
import util from '../lib/util'
import config from '../lib/config.es6'

export default class Elements extends Tool
{
    constructor()
    {
        super();

        require('./Elements.scss');

        this.name = 'elements';
        this._tpl = require('./Elements.hbs');
        this._rmDefComputedStyle = true;
        this._highlightElement = false;
        this._selectElement = false;
    }
    init($el, parent)
    {
        super.init($el);

        this._parent = parent;

        $el.html('<div class="eruda-show-area"></div>');
        this._$showArea = $el.find('.eruda-show-area');
        $el.append(require('./BottomBar.hbs')());

        this._htmlEl = document.documentElement;
        this._highlight = new Highlight(this._parent.$parent);
        this._select = new Select();
        this._bindEvent();
        this._initConfig();
        this._setEl(this._htmlEl);
    }
    show()
    {
        super.show();

        this._render();
    }
    overrideEventTarget()
    {
        var winEventProto = getWinEventProto();

        var origAddEvent = this._origAddEvent = winEventProto.addEventListener,
            origRmEvent = this._origRmEvent = winEventProto.removeEventListener;

        winEventProto.addEventListener = function (type, listener, useCapture)
        {
            addEvent(this, type, listener, useCapture);
            origAddEvent.apply(this, arguments);
        };

        winEventProto.removeEventListener = function (type, listener, useCapture)
        {
            rmEvent(this, type, listener, useCapture);
            origRmEvent.apply(this, arguments);
        };
    }
    restoreEventTarget()
    {
        var winEventProto = getWinEventProto();

        if (this._origAddEvent) winEventProto.addEventListener = this._origAddEvent;
        if (this._origRmEvent) winEventProto.removeEventListener = this._origRmEvent;
    }
    destroy()
    {
        super.destroy();

        this.restoreEventTarget();
    }
    _back()
    {
        if (this._curEl === this._htmlEl) return;

        var parentQueue = this._curParentQueue,
            parent = parentQueue.shift();

        while (!isElExist(parent)) parent = parentQueue.shift();

        this._setElAndRender(parent);
    }
    _bindEvent()
    {
        var self = this,
            select = this._select;

        this._$el.on('click', '.eruda-child', function ()
        {
            var idx = util.$(this).data('idx'),
                curEl = self._curEl,
                el = curEl.childNodes[idx];

            if (el && el.nodeType === 3)
            {
                let parent = self._parent,
                    curTagName = curEl.tagName,
                    type;

                switch (curTagName)
                {
                    case 'SCRIPT': type = 'js'; break;
                    case 'STYLE': type = 'css'; break;
                    default: return;
                }

                let sources = parent.get('sources');

                if (sources)
                {
                    sources.set(type, el.nodeValue);
                    parent.showTool('sources');
                }

                return;
            }

            !isElExist(el) ? self._render() : self._setElAndRender(el);
        }).on('click', '.toggle-all-computed-style', () => this._toggleAllComputedStyle());

        var $bottomBar = this._$el.find('.eruda-bottom-bar');

        $bottomBar.on('click', '.eruda-back', () => this._back())
                  .on('click', '.eruda-refresh', () => this._render())
                  .on('click', '.eruda-highlight', () => this._toggleHighlight())
                  .on('click', '.eruda-select', () => this._toggleSelect())
                  .on('click', '.eruda-reset', () => this._setElAndRender(this._htmlEl));

        select.on('select', target => this._setElAndRender(target));
    }
    _toggleAllComputedStyle()
    {
        this._rmDefComputedStyle = !this._rmDefComputedStyle;

        this._render();
    }
    _toggleHighlight()
    {
        if (this._selectElement) return;

        this._$el.find('.eruda-highlight').toggleClass('eruda-active');
        this._highlightElement = !this._highlightElement;

        this._render();
    }
    _toggleSelect()
    {
        var select = this._select;

        this._$el.find('.eruda-select').toggleClass('eruda-active');
        if (!this._selectElement && !this._highlightElement) this._toggleHighlight();
        this._selectElement = !this._selectElement;

        if (this._selectElement)
        {
            select.enable();
            this._parent.hide();
        } else
        {
            select.disable();
        }
    }
    _setEl(el)
    {
        this._curEl = el;
        this._curCssStore = new CssStore(el);
        this._highlight.setEl(el);
        this._rmDefComputedStyle = true;
        window.$0 = el;

        var parentQueue = [];

        var parent = el.parentNode;
        while (parent)
        {
            parentQueue.push(parent);
            parent = parent.parentNode;
        }
        this._curParentQueue = parentQueue;
    }
    _setElAndRender(e)
    {
        this._setEl(e);
        this._render();
    }
    _getData()
    {
        var ret = {};

        var el = this._curEl,
            cssStore = this._curCssStore;

        var {className, id, attributes, tagName} = el;

        ret.children = formatChildNodes(el.childNodes);
        ret.attributes = formatAttr(attributes);
        ret.name = formatElName({tagName, id, className, attributes});

        var events = el.erudaEvents;
        if (events && util.keys(events).length !== 0) ret.listeners = events;

        if (needNoStyle(tagName)) return ret;

        var computedStyle = cssStore.getComputedStyle();
        if (this._rmDefComputedStyle) computedStyle = rmDefComputedStyle(computedStyle);
        processStyleRules(computedStyle);
        ret.computedStyle = computedStyle;

        var styles = cssStore.getMatchedCSSRules();
        styles.unshift(getInlineStyle(el.style));
        styles.forEach(style => processStyleRules(style.style));
        ret.styles = styles;

        return ret;
    }
    _render()
    {
        if (!isElExist(this._curEl)) return this._back();

        this._highlight[this._highlightElement ? 'show' : 'hide']();
        this._renderHtml(this._tpl(this._getData()));
    }
    _renderHtml(html)
    {
        if (html === this._lastHtml) return;
        this._lastHtml = html;
        this._$showArea.html(html);
    }
    _initConfig()
    {
        var cfg = this.config = config.create('eruda-elements');

        cfg.set(util.defaults(cfg.get(), {overrideEventTarget: true}));

        if (cfg.get('overrideEventTarget')) this.overrideEventTarget();

        cfg.on('change', (key, val) =>
        {
            switch (key)
            {
                case 'overrideEventTarget': return val ? this.overrideEventTarget(): this.restoreEventTarget();
            }
        });

        var settings = this._parent.get('settings');
        settings.text('Elements')
                .add(cfg, 'overrideEventTarget', 'Catch Event Listeners')
                .separator();
    }
}

function processStyleRules(style)
{
    util.each(style, (val, key) =>
    {
        if (util.startWith(val, 'rgb'))
        {
            style[key] = `<span class="eruda-style-color" style="background-color: ${val}"></span>${val}`;
        }
    });
}

const isElExist = val => util.isEl(val) && val.parentNode;

function formatElName(data)
{
    var {id, className, attributes} = data;

    var ret = `<span class="eruda-blue">${data.tagName.toLowerCase()}</span>`;

    if (id !== '') ret += `#${id}`;

    util.each(className.split(/\s+/g), (val) =>
    {
        if (val.trim() === '') return;
        ret += `.${val}`;
    });

    util.each(attributes, (attr) =>
    {
        var name = attr.name;
        if (name === 'id' || name === 'class' || name === 'style') return;
        ret += ` ${name}="${attr.value}"`;
    });

    return ret;
}

var formatAttr = attributes => util.map(attributes, attr =>
{
    return {name: attr.name, value: attr.value};
});

function formatChildNodes(nodes)
{
    var ret = [];

    for (let i = 0, len = nodes.length; i < len; i++)
    {
        var child = nodes[i];
        if (child.nodeType === 3)
        {
            var val = child.nodeValue.trim();
            if (val !== '') ret.push({
                text: val,
                idx: i
            });
            continue;
        }
        if (child.nodeType === 1 &&
            child.id !== 'eruda' &&
            child.className.indexOf('eruda') < 0)
        {
            ret.push({
                text: formatElName(child),
                idx: i
            });
        }
    }

    return ret;
}

function getInlineStyle(style)
{
    var ret = {
        selectorText: 'element.style',
        style: {}
    };

    for (let i = 0, len = style.length; i < len; i++)
    {
        var s = style[i];

        ret.style[s] = style[s];
    }

    return ret;
}

var defComputedStyle = require('./defComputedStyle.json');

function rmDefComputedStyle(computedStyle)
{
    var ret = {};

    util.each(computedStyle, (val, key) =>
    {
        if (val === defComputedStyle[key]) return;

        ret[key] = val;
    });

    return ret;
}

var NO_STYLE_TAG = ['script', 'style', 'meta', 'title', 'link', 'head'];

var needNoStyle = tagName => NO_STYLE_TAG.indexOf(tagName.toLowerCase()) > -1;


function addEvent(el, type, listener, useCapture = false)
{
    if (!util.isFn(listener) || !util.isBool(useCapture)) return;

    var events = el.erudaEvents = el.erudaEvents || {};

    events[type] = events[type] || [];
    events[type].push({
        listener: listener,
        listenerStr: listener.toString(),
        useCapture: useCapture
    });
}

function rmEvent(el, type, listener, useCapture = false)
{
    if (!util.isFn(listener) || !util.isBool(useCapture)) return;

    var events = el.erudaEvents;

    if (!(events && events[type])) return;

    var listeners = events[type];

    for (let i = 0, len = listeners.length; i < len; i++)
    {
        if (listeners[i].listener === listener)
        {
            listeners.splice(i, 1);
            break;
        }
    }

    if (listeners.length === 0) delete events[type];
    if (util.keys(events).length === 0) delete el.erudaEvents;
}

var getWinEventProto = () => (window.EventTarget && window.EventTarget.prototype) || window.Node.prototype;
