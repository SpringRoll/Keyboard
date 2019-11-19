/**
 * @namespace springroll
 */
(function()
{
	
	//A stripped down version of Detect.js, just for browser family and OS
	
	/*
	 * Detect.js: User-Agent Parser
	 * https://github.com/darcyclarke/Detect.js
	 * Dual licensed under the MIT and GPL licenses.
	 *
	 * @version 2.2.1
	 * @author Darcy Clarke
	 * @url http://darcyclarke.me
	 * @createdat Thu Feb 13 2014 11:36:42 GMT+0000 (WET)
	 *
	 * Based on UA-Parser (https://github.com/tobie/ua-parser) by Tobie Langel
	 *
	 * Example Usage:
	 * var agentInfo = detect.parse(navigator.userAgent);
	 * console.log(agentInfo.browser.family); // Chrome
	 *
	 */
	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.com/#x15.4.4.19
	// Detect
	var detect = function() {
		// Context
		var _this = function() {};
		// Regexes
		var regexes = {
			browser_parsers: [ {
				regex: "(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
				family_replacement: "Pale Moon (Firefox Variant)",
				other: true
			}, {
				regex: "(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
				family_replacement: "Firefox Mobile"
			}, {
				regex: "(Fennec)/(\\d+)\\.(\\d+)(pre)",
				family_replacment: "Firefox Mobile"
			}, {
				regex: "(Fennec)/(\\d+)\\.(\\d+)",
				family_replacement: "Firefox Mobile"
			}, {
				regex: "Mobile.*(Firefox)/(\\d+)\\.(\\d+)",
				family_replacement: "Firefox Mobile"
			}, {
				regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)",
				family_replacement: "Firefox ($1)"
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
				family_replacement: "Firefox Alpha"
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
				family_replacement: "Firefox Beta"
			}, {
				regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)",
				family_replacement: "Firefox Alpha"
			}, {
				regex: "(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)",
				family_replacement: "Firefox Beta"
			}, {
				regex: "(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?",
				family_replacement: "Firefox ($1)"
			}, {
				regex: "(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "MicroB",
				tablet: true
			}, {
				regex: "(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?"
			}, {
				regex: "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Chrome Mobile"
			}, {
				regex: "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Chrome Mobile iOS"
			}, {
				regex: "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile",
				family_replacement: "Chrome Mobile"
			}, {
				regex: "(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Chrome Frame"
			}, {
				regex: "(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)"
			}, {
				regex: "(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)"
			}, {
				regex: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
			}, {
				regex: "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?"
			}, {
				regex: "(IEMobile)[ /](\\d+)\\.(\\d+)",
				family_replacement: "IE Mobile"
			}, {
				regex: "(MSIE) (\\d+)\\.(\\d+).*XBLWP7",
				family_replacement: "IE Large Screen"
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
			}, {
				regex: "(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Mobile Safari",
				manufacturer: "Apple"
			}, {
				regex: "(iPod).*Version/(\\d+)\\.(\\d+)",
				family_replacement: "Mobile Safari",
				manufacturer: "Apple"
			}, {
				regex: "(iPod)",
				family_replacement: "Mobile Safari",
				manufacturer: "Apple"
			}, {
				regex: "(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Mobile Safari",
				manufacturer: "Apple"
			}, {
				regex: "(iPhone).*Version/(\\d+)\\.(\\d+)",
				family_replacement: "Mobile Safari",
				manufacturer: "Apple"
			}, {
				regex: "(iPhone)",
				family_replacement: "Mobile Safari",
				manufacturer: "Apple"
			}, {
				regex: "(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Mobile Safari",
				tablet: true,
				manufacturer: "Apple"
			}, {
				regex: "(iPad).*Version/(\\d+)\\.(\\d+)",
				family_replacement: "Mobile Safari",
				tablet: true,
				manufacturer: "Apple"
			}, {
				regex: "(iPad)",
				family_replacement: "Mobile Safari",
				tablet: true,
				manufacturer: "Apple"
			}, {
				regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
				other: true,
				tablet: true
			}, {
				regex: "(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Version/\\d+\\.\\d+.\\d+ Safari/",
				family_replacement: "WebKit Nightly"
			}, {
				regex: "(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/",
				family_replacement: "Safari"
			}, {
				regex: "(Safari)/\\d+"
			}, {
				regex: "Trident(.*)rv.(\\d+)\\.(\\d+)",
				family_replacement: "IE"
			}, {
				regex: "(MSIE) (\\d+)\\.(\\d+)",
				family_replacement: "IE"
			} ],
			os_parsers: [ {
				regex: "(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
			}, {
				regex: "(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?"
			}, {
				regex: "(Android) Donut",
				os_v2_replacement: "2",
				os_v1_replacement: "1"
			}, {
				regex: "(Android) Eclair",
				os_v2_replacement: "1",
				os_v1_replacement: "2"
			}, {
				regex: "(Android) Froyo",
				os_v2_replacement: "2",
				os_v1_replacement: "2"
			}, {
				regex: "(Android) Gingerbread",
				os_v2_replacement: "3",
				os_v1_replacement: "2"
			}, {
				regex: "(Android) Honeycomb",
				os_v1_replacement: "3"
			}, {
				regex: "(Silk-Accelerated=[a-z]{4,5})",
				os_replacement: "Android"
			}, {
				regex: "(Windows Phone 6\\.5)"
			}, {
				regex: "(Windows (?:NT 5\\.2|NT 5\\.1))",
				os_replacement: "Windows XP"
			}, {
				regex: "(XBLWP7)",
				os_replacement: "Windows Phone OS"
			}, {
				regex: "(Windows NT 6\\.1)",
				os_replacement: "Windows 7"
			}, {
				regex: "(Windows NT 6\\.0)",
				os_replacement: "Windows Vista"
			}, {
				regex: "(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)"
			}, {
				regex: "(Windows NT 6\\.2)",
				os_replacement: "Windows 8"
			}, {
				regex: "(Windows Phone 8)",
				os_replacement: "Windows Phone 8"
			}, {
				regex: "(Windows NT 5\\.0)",
				os_replacement: "Windows 2000"
			}, {
				regex: "(Windows Phone OS) (\\d+)\\.(\\d+)"
			}, {
				regex: "(Windows ?Mobile)",
				os_replacement: "Windows Mobile"
			}, {
				regex: "(WinNT4.0)",
				os_replacement: "Windows NT 4.0"
			}, {
				regex: "(Win98)",
				os_replacement: "Windows 98"
			}, {
				regex: "(Tizen)/(\\d+)\\.(\\d+)",
				other: true
			}, {
				regex: "(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?",
				manufacturer: "Apple"
			}, {
				regex: "(?:PPC|Intel) (Mac OS X)",
				manufacturer: "Apple"
			}, {
				regex: "(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?",
				os_replacement: "iOS",
				manufacturer: "Apple"
			}, {
				regex: "(iPhone|iPad|iPod); Opera",
				os_replacement: "iOS",
				manufacturer: "Apple"
			}, {
				regex: "(iPad); Opera",
				tablet: true,
				manufacturer: "Apple"
			}, {
				regex: "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)",
				os_replacement: "iOS",
				manufacturer: "Apple"
			}, {
				regex: "(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)"
			}, {
				regex: "(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)"
			}, {
				regex: "(Linux|BSD)",
				other: true
			} ],
			mobile_os_families: [ "Windows Phone 6.5", "Windows CE", "Symbian OS" ],
			mobile_browser_families: [ "Firefox Mobile", "Opera Mobile", "Opera Mini", "Mobile Safari", "webOS", "IE Mobile", "Playstation Portable", "Nokia", "Blackberry", "Palm", "Silk", "Android", "Maemo", "Obigo", "Netfront", "AvantGo", "Teleca", "SEMC-Browser", "Bolt", "Iris", "UP.Browser", "Symphony", "Minimo", "Bunjaloo", "Jasmine", "Dolfin", "Polaris", "BREW", "Chrome Mobile", "Chrome Mobile iOS", "UC Browser", "Tizen Browser" ]
		};
		// Parsers
		_this.parsers = [ "browser_parsers", "os_parsers", "mobile_os_families", "mobile_browser_families" ];
		// Types
		_this.types = [ "browser", "os"/*, "device"*/ ];
		// Regular Expressions
		_this.regexes = regexes || function() {
			var results = {};
			_this.parsers.map(function(parser) {
				results[parser] = [];
			});
			return results;
		}();
		// Families
		_this.families = function() {
			var results = {};
			_this.types.map(function(type) {
				results[type] = [];
			});
			return results;
		}();
		// Utility Variables
		var ArrayProto = Array.prototype, ObjProto = Object.prototype,
			FuncProto = Function.prototype, nativeForEach = ArrayProto.forEach,
			nativeIndexOf = ArrayProto.indexOf;
		// Find Utility
		var find = function(ua, obj) {
			var ret = {};
			for (var i = 0; i < obj.length; i++) {
				ret = obj[i](ua);
				if (ret) {
					break;
				}
			}
			return ret;
		};
		// Remove Utility
		var remove = function(arr, props) {
			each(arr, function(obj) {
				each(props, function(prop) {
					delete obj[prop];
				});
			});
		};
		// Contains Utility
		var contains = function(obj, target) {
			var found = false;
			if (!obj) return found;
			if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
			found = any(obj, function(value) {
				return value === target;
			});
			return found;
		};
		// Each Utility
		var forEach, each;
		each = forEach = function(obj, iterator, context) {
			if (!obj) return;
			if (nativeForEach && obj.forEach === nativeForEach) {
				obj.forEach(iterator, context);
			} else if (obj.length === +obj.length) {
				for (var i = 0, l = obj.length; i < l; i++) {
					iterator.call(context, obj[i], i, obj);
				}
			} else {
				for (var key in obj) {
					if (_.has(obj, key)) {
						iterator.call(context, obj[key], key, obj);
					}
				}
			}
		};
		// Extend Utiltiy
		var extend = function(obj) {
			each(slice.call(arguments, 1), function(source) {
				for (var prop in source) {
					obj[prop] = source[prop];
				}
			});
			return obj;
		};
		// Check String Utility
		var check = function(str) {
			return !!(str && typeof str != "undefined" && !str);
		};
		// To Version String Utility
		var toVersionString = function(obj) {
			var output = "";
			obj = obj || {};
			if (check(obj)) {
				if (check(obj.major)) {
					output += obj.major;
					if (check(obj.minor)) {
						output += "." + obj.minor;
						if (check(obj.patch)) {
							output += "." + obj.patch;
						}
					}
				}
			}
			return output;
		};
		// To String Utility
		var toString = function(obj) {
			obj = obj || {};
			var suffix = toVersionString(obj);
			if (suffix) suffix = " " + suffix;
			return obj && check(obj.family) ? obj.family + suffix : "";
		};
		// Parse User-Agent String
		_this.parse = function(ua) {
			// Parsers Utility
			var parsers = function(type) {
				return _this.regexes[type + "_parsers"].map(function(obj) {
					var regexp = new RegExp(obj.regex), rep = obj[(type === "browser" ? "family" : type) + "_replacement"], major_rep = obj.major_version_replacement;
					function parser(ua) {
						var m = ua.match(regexp);
						if (!m) return null;
						var ret = {};
						ret.family = (rep ? rep.replace("$1", m[1]) : m[1]) || "other";
						ret.tablet = obj.tablet;
						//ret.man = obj.manufacturer || null;
						return ret;
					}
					return parser;
				});
			};
			// User Agent
			var UserAgent = function() {};
			// Browsers Parsed
			var browser_parsers = parsers("browser");
			// Operating Systems Parsed
			var os_parsers = parsers("os");
			// Devices Parsed
			// Set Agent
			var a = new UserAgent();
			// Remember the original user agent string
			a.source = ua;
			// Set Browser
			a.browser = find(ua, browser_parsers);
			if (/*check(*/a.browser/*)*/) {
				a.browser.name = toString(a.browser);
				a.browser.version = toVersionString(a.browser);
			} else {
				a.browser = {};
			}
			// Set OS
			a.os = find(ua, os_parsers);
			if (/*check(*/a.os/*)*/) {
				a.os.name = toString(a.os);
				a.os.version = toVersionString(a.os);
			} else {
				a.os = {};
			}
			// Determine Device Type
			var mobile_agents = {};
			var mobile_browser_families = _this.regexes.mobile_browser_families.map(function(str) {
				mobile_agents[str] = true;
			});
			var mobile_os_families = _this.regexes.mobile_os_families.map(function(str) {
				mobile_agents[str] = true;
			});
			// Cleanup Objects
			remove([ a.browser, a.os/*, a.device*/ ], [ "tablet", "man" ]);
			// Return Agent
			return a;
		};
		// Return context
		return _this;
	};
	
	// Assign to namespace
	namespace('springroll').Detect = detect();
}());
