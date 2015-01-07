/**
* ================================================================================
*
* base.js ver 4.01.08
*
* Author : KENTA SAKATA
* Since  : 2009/05/20
* Update : 2013/11/27
*
* Licensed under the MIT License
* Copyright (c) Kenta Sakata
* http://saken.jp/
*
* ================================================================================
*
**/
(function(window) {

	var _url = "files/js/common/";

	var _data = {

		flash    : ["#flash"],
		lightbox : ".lightbox",
		scroll   : 300,
		fade     : [".fade",0,0.7],
		rollover : ["_off","_on",0],
		tooltip  : [".tooltip",0],
		showcase : ".showcase",
		tab      : [".tab",true],
		selfLink : ["body","_on","_on","_off"],
		css3     : [".box","first","last"],
		ga       : "UA-000000-0"

	};

	var _isUse = {

		addition   : false,
		flash      : false,
		lightbox   : false,
		scroll     : true,
		fade       : true,
		rollover   : true,
		tooltip    : false,
		showcase   : false,
		tab        : false,
		selfLink   : false,
		external   : false,
		css3       : false,
		ga         : false,
		mousewheel : true

	};

	var _baseJS = {};
	var _userAgent,_ie,_fpVersion,_absolutePath,_category,_htmlName,_pageID;

	window._ = window.baseJS = _baseJS;

	/* =======================================================================
	Constructer
	========================================================================== */
	(function() {

		_baseJS.fn      = {};
		_baseJS.onReady = onReady;

		init();
		importJS();

		return false;

	})();

	/* =======================================================================
	Init
	========================================================================== */
	function init() {

		_userAgent = (function(ua) {

			var userAgent = "pc";

			if ((/Nitro/.test(ua)) || (/Nintendo 3DS/.test(ua))) userAgent = "ds";
			else if (/WiiU/.test(ua))    userAgent = "wiiu";
			else if (/Wii/.test(ua))     userAgent = "wii";
			else if (/iPad/.test(ua))    userAgent = "ipad";
			else if (/iPhone/.test(ua))  userAgent = "iphone";
			else if (/Android/.test(ua)) userAgent = "android";

			return userAgent;

		})(navigator.userAgent);

		_ie = (function() {

			var ver;

			/*@cc_on
			  @if (@_jscript_version == 10) ver = 10;
			  @elif (@_jscript_version == 9) ver = 9;
			  @elif (@_jscript_version == 5.8) ver = 8;
			  @else ver = 7;
			  @end
			@*/

			return ver;

		})();

		_fpVersion = (function() {

			if (_userAgent != "pc") return "";

			var num = (function() {

				var num = 0;

				try {

					if (navigator.plugins && navigator.mimeTypes["application/x-shockwave-flash"]) {

						var plugin = navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin;
						num = parseInt(plugin.description.match(/\d+\.\d+/));

					} else {

						var flashOCX = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").match(/([0-9]+)/);
						num = parseInt(flashOCX[0]);

					}

				} catch (e) {}

				return num;

			})();

			var fpVersion = "fp10";

			if (num < 8)       fpVersion = "nonFP";
			else if (num < 9)  fpVersion = "fp8";
			else if (num < 10) fpVersion = "fp9";

			return fpVersion;

		})();

		_absolutePath = (function(scripts) {

			var src = "";

			for (var p in scripts) {
				if (/base.js/.test(scripts[p].src)) src = scripts[p].src;
			}

			return src.split(_url)[0];

		})(document.getElementsByTagName("script"));

		var href   = location.href;
		var split  = href.split("#/")[0].split("/");
		var length = split.length;

		_category = split[length - 2];
		_htmlName = split[length - 1].split(".html")[0];

		if (_htmlName == "") _htmlName = "index";
		_pageID = _category + "-" + _htmlName;

		return false;

	}

	/* =======================================================================
	Import JS
	========================================================================== */
	function importJS() {

		var src = _absolutePath + _url + "base/";

		writeJS("jquery",src);

		if (_data.tab[1])      writeJS("jquery.cookie",src);
		if (_isUse.mousewheel) writeJS("jquery.mousewheel",src);

		writeJS("base.ready",src);
		if (_isUse.addition) writeJS("base.addition",src);
		writeJS("base.common",src);

		return false;

	}

	/* =======================================================================
	On Ready
	========================================================================== */
	function onReady() {

		var body = $("body").removeClass("noscript").addClass(_userAgent + " " + _fpVersion);
		var id   = body.attr("id");

		if (id) _pageID = id;
		else body.attr("id",_pageID);

		for (var p in _isUse) {
			if (_isUse[p] && _baseJS.fn[p]) _baseJS.fn[p](_data[p]);
		}

		return false;

	}

	/* =======================================================================
	Write JS
	========================================================================== */
	function writeJS(fileName,src) {

		document.write('<script src="' + src + fileName + '.js" type="text/javascript" charset="UTF-8"></script>');
		return false;

	}

	/* =======================================================================
	Get Consecutive Number
	========================================================================== */
	function consecutive(i) {

		var zero = "00";
		var num  = "";

		i++;

		if (i > 99)     zero = "";
		else if (i > 9) zero = "0";

		num = zero + String(i);

		return num;

	}

	/* =======================================================================
	Analyze URI
	========================================================================== */
	function analyzeURI(path) {

		var uri = {};

		uri.originalPath = path;

		uri.absolutePath = (function() {

			var e = document.createElement("span");
			e.innerHTML = '<a href="' + path + '" />';
			return e.firstChild.href;

		})();

		var key = {

			"schema"   :  2,
			"username" :  5,
			"password" :  6,
			"host"     :  7,
			"path"     :  9,
			"query"    : 10,
			"fragment" : 11

		};

		var array = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(uri.absolutePath);

		for (var i in key) {
			uri[i] = array[key[i]];
		}

		uri.querys = {};

		if (uri.query) {

			$.each(uri.query.split("&"), function() {

				var query = this.split("=");

				if (query.length == 2) {
					uri.querys[query[0]] = query[1];
				}

			});

		}

		return uri;

	}

	/* =======================================================================
	Timer
	========================================================================== */
	function timer(func,time) {

		var t = setTimeout(function() {

			clearTimeout(t);
			func();

			return false;

		},time);

		return false;

	}

	/* =======================================================================
	Test
	========================================================================== */
	function test(value) {

		if (_ie > 0) alert(value);
		else console.log(value);

		return false;

	}

	/* =======================================================================
	Public - Property
	========================================================================== */
	_baseJS.userAgent    = _userAgent;
	_baseJS.ie           = _ie;
	_baseJS.fpVersion    = _fpVersion;
	_baseJS.absolutePath = _absolutePath;
	_baseJS.category     = _category;
	_baseJS.htmlName     = _htmlName;
	_baseJS.pageID       = _pageID;

	/* =======================================================================
	Public - Method
	========================================================================== */
	_baseJS.writeJS     = writeJS;
	_baseJS.consecutive = consecutive;
	_baseJS.analyzeURI  = analyzeURI;
	_baseJS.timer       = timer;
	_baseJS.test        = test;

	return _baseJS;

})(window);