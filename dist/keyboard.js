/*! Keyboard 0.1.2 */
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
	// Shim Array.prototype.map if necessary
	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.com/#x15.4.4.19
	/*if (!Array.prototype.map) {
		Array.prototype.map = function(callback, thisArg) {
			var T, A, k;
			if (this == null) {
				throw new TypeError(" this is null or not defined");
			}
			// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
			var O = Object(this);
			// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
			// 3. Let len be ToUint32(lenValue).
			var len = O.length >>> 0;
			// 4. If IsCallable(callback) is false, throw a TypeError exception.
			// See: http://es5.github.com/#x9.11
			if (typeof callback !== "function") {
				throw new TypeError(callback + " is not a function");
			}
			// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
			if (thisArg) {
				T = thisArg;
			}
			// 6. Let A be a new array created as if by the expression new Array(len) where Array is
			// the standard built-in constructor with that name and len is the value of len.
			A = new Array(len);
			// 7. Let k be 0
			k = 0;
			// 8. Repeat, while k < len
			while (k < len) {
				var kValue, mappedValue;
				// a. Let Pk be ToString(k).
				//   This is implicit for LHS operands of the in operator
				// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
				//   This step can be combined with c
				// c. If kPresent is true, then
				if (k in O) {
					// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
					kValue = O[k];
					// ii. Let mappedValue be the result of calling the Call internal method of callback
					// with T as the this value and argument list containing kValue, k, and O.
					mappedValue = callback.call(T, kValue, k, O);
					// iii. Call the DefineOwnProperty internal method of A with arguments
					// Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
					// and false.
					// In browsers that support Object.defineProperty, use the following:
					// Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });
					// For best browser support, use the following:
					A[k] = mappedValue;
				}
				// d. Increase k by 1.
				k++;
			}
			// 9. return A
			return A;
		};
	}*/
	// Detect
	var detect = function() {
		// Context
		var _this = function() {};
		// Regexes
		var regexes = {
			browser_parsers: [ /*{
				regex: "^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii",
				family_replacement: "Wii",
				manufacturer: "Nintendo"
			}, {
				regex: "(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)",
				family_replacement: "Camino",
				other: true
			},*/ {
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
			}, /*{
				regex: "(Flock)/(\\d+)\\.(\\d+)(b\\d+?)",
				family_replacement: "Flock",
				other: true
			}, {
				regex: "(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Rockmelt",
				other: true
			}, {
				regex: "(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Netscape"
			}, {
				regex: "(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)",
				family_replacement: "Netscape"
			}, {
				regex: "(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Netscape"
			}, {
				regex: "(MyIBrow)/(\\d+)\\.(\\d+)",
				family_replacement: "My Internet Browser",
				other: true
			}, {
				regex: "(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				family_replacement: "Opera Tablet",
				tablet: true
			}, {
				regex: "(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)",
				family_replacement: "Opera Mobile"
			}, {
				regex: "Opera Mobi",
				family_replacement: "Opera Mobile"
			}, {
				regex: "(Opera Mini)/(\\d+)\\.(\\d+)",
				family_replacement: "Opera Mini"
			}, {
				regex: "(Opera Mini)/att/(\\d+)\\.(\\d+)",
				family_replacement: "Opera Mini"
			}, {
				regex: "(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				family_replacement: "Opera"
			}, {
				regex: "(webOSBrowser)/(\\d+)\\.(\\d+)",
				family_replacement: "webOS"
			}, {
				regex: "(webOS)/(\\d+)\\.(\\d+)",
				family_replacement: "webOS"
			}, {
				regex: "(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)",
				family_replacement: "webOS TouchPad"
			}, {
				regex: "(luakit)",
				family_replacement: "LuaKit",
				other: true
			}, {
				regex: "(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)",
				family_replacement: "Lightning",
				other: true
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)",
				family_replacement: "Swiftfox",
				other: true
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)",
				family_replacement: "Swiftfox",
				other: true
			}, {
				regex: "rekonq",
				family_replacement: "Rekonq",
				other: true
			}, {
				regex: "(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?",
				family_replacement: "Conkeror",
				other: true
			}, {
				regex: "(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Konqueror",
				other: true
			}, {
				regex: "(WeTab)-Browser",
				family_replacement: "WeTab",
				other: true
			}, {
				regex: "(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Comodo Dragon",
				other: true
			}, {
				regex: "(YottaaMonitor)",
				family_replacement: "Yottaa Monitor",
				other: true
			}, {
				regex: "(Kindle)/(\\d+)\\.(\\d+)",
				family_replacement: "Kindle"
			}, {
				regex: "(Symphony) (\\d+).(\\d+)",
				family_replacement: "Symphony",
				other: true
			}, {
				regex: "Minimo",
				family_replacement: "Minimo",
				other: true
			},*/ {
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
			},/* {
				regex: "(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "UC Browser",
				other: true
			}, {
				regex: "(SLP Browser)/(\\d+)\\.(\\d+)",
				family_replacement: "Tizen Browser",
				other: true
			}, {
				regex: "(Epiphany)/(\\d+)\\.(\\d+).(\\d+)",
				family_replacement: "Epiphany",
				other: true
			}, {
				regex: "(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)",
				family_replacement: "Sogou Explorer",
				other: true
			}, {
				regex: "(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)",
				family_replacement: "PingdomBot",
				other: true
			}, {
				regex: "(facebookexternalhit)/(\\d+)\\.(\\d+)",
				family_replacement: "FacebookBot"
			}, {
				regex: "Facebot",
				family_replacement: "FacebookBot"
			}, {
				regex: "(Twitterbot)/(\\d+)\\.(\\d+)",
				family_replacement: "TwitterBot"
			},*/ {
				regex: "(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iron|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)"
			}, {
				regex: "(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Iron|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris)/(\\d+)\\.(\\d+)"
			}, {
				regex: "(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)"
			}, {
				regex: "(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?"
			}, /*{
				regex: "(Android) Donut",
				v2_replacement: "2",
				v1_replacement: "1"
			}, {
				regex: "(Android) Eclair",
				v2_replacement: "1",
				v1_replacement: "2"
			}, {
				regex: "(Android) Froyo",
				v2_replacement: "2",
				v1_replacement: "2"
			}, {
				regex: "(Android) Gingerbread",
				v2_replacement: "3",
				v1_replacement: "2"
			}, {
				regex: "(Android) Honeycomb",
				v1_replacement: "3"
			}, */{
				regex: "(IEMobile)[ /](\\d+)\\.(\\d+)",
				family_replacement: "IE Mobile"
			}, {
				regex: "(MSIE) (\\d+)\\.(\\d+).*XBLWP7",
				family_replacement: "IE Large Screen"
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)"
			}, {
				regex: "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?"
			},/* {
				regex: "(Obigo)InternetBrowser",
				other: true
			}, {
				regex: "(Obigo)\\-Browser",
				other: true
			}, {
				regex: "(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?",
				other: true
			}, {
				regex: "(MAXTHON|Maxthon) (\\d+)\\.(\\d+)",
				family_replacement: "Maxthon",
				other: true
			}, {
				regex: "(Maxthon|MyIE2|Uzbl|Shiira)",
				v1_replacement: "0",
				other: true
			}, {
				regex: "(PLAYSTATION) (\\d+)",
				family_replacement: "PlayStation",
				manufacturer: "Sony"
			}, {
				regex: "(PlayStation Portable)[^\\d]+(\\d+).(\\d+)",
				manufacturer: "Sony"
			}, {
				regex: "(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)",
				other: true
			}, {
				regex: "(POLARIS)/(\\d+)\\.(\\d+)",
				family_replacement: "Polaris",
				other: true
			}, {
				regex: "(Embider)/(\\d+)\\.(\\d+)",
				family_replacement: "Polaris",
				other: true
			}, {
				regex: "(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Bon Echo",
				other: true
			},*/ {
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
			},/* {
				regex: "(AvantGo) (\\d+).(\\d+)",
				other: true
			}, {
				regex: "(Avant)",
				v1_replacement: "1",
				other: true
			}, {
				regex: "^(Nokia)",
				family_replacement: "Nokia Services (WAP) Browser",
				manufacturer: "Nokia"
			}, {
				regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)",
				manufacturer: "Nokia"
			}, {
				regex: "(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)",
				manufacturer: "Nokia"
			}, {
				regex: "(NokiaBrowser)/(\\d+)\\.(\\d+)",
				manufacturer: "Nokia"
			}, {
				regex: "(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)",
				family_replacement: "NokiaBrowser",
				manufacturer: "Nokia"
			}, {
				regex: "(Series60)/5\\.0",
				v2_replacement: "0",
				v1_replacement: "7",
				family_replacement: "NokiaBrowser",
				manufacturer: "Nokia"
			}, {
				regex: "(Series60)/(\\d+)\\.(\\d+)",
				family_replacement: "Nokia OSS Browser",
				manufacturer: "Nokia"
			}, {
				regex: "(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Nokia Series 40 Ovi Browser",
				manufacturer: "Nokia"
			}, {
				regex: "(Nokia)[EN]?(\\d+)",
				manufacturer: "Nokia"
			}, {
				regex: "(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Blackberry WebKit",
				tablet: true,
				manufacturer: "Nokia"
			}, {
				regex: "(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)",
				family_replacement: "Blackberry WebKit",
				manufacturer: "RIM"
			}, {
				regex: "(Black[bB]erry)\\s?(\\d+)",
				family_replacement: "Blackberry",
				manufacturer: "RIM"
			}, {
				regex: "(OmniWeb)/v(\\d+)\\.(\\d+)",
				other: true
			}, {
				regex: "(Blazer)/(\\d+)\\.(\\d+)",
				family_replacement: "Palm Blazer",
				manufacturer: "Palm"
			}, {
				regex: "(Pre)/(\\d+)\\.(\\d+)",
				family_replacement: "Palm Pre",
				manufacturer: "Palm"
			}, {
				regex: "(Links) \\((\\d+)\\.(\\d+)",
				other: true
			}, {
				regex: "(QtWeb) Internet Browser/(\\d+)\\.(\\d+)",
				other: true
			},*/ {
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
			}, /*{
				regex: "(OLPC)/Update(\\d+)\\.(\\d+)",
				other: true
			}, {
				regex: "(OLPC)/Update()\\.(\\d+)",
				v1_replacement: "0",
				other: true
			}, {
				regex: "(SEMC\\-Browser)/(\\d+)\\.(\\d+)",
				other: true
			}, {
				regex: "(Teleca)",
				family_replacement: "Teleca Browser",
				other: true
			},*/ {
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
			}, /*{
				regex: "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				os_replacement: "Chrome OS"
			}, {
				regex: "(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				other: true
			}, {
				regex: "(Linux Mint)(?:/(\\d+))?",
				other: true
			}, {
				regex: "(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				other: true
			}, {
				regex: "(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)",
				os_replacement: "Symbian OS"
			}, {
				regex: "(Symbian/3).+NokiaBrowser/7\\.3",
				os_replacement: "Symbian^3 Anna"
			}, {
				regex: "(Symbian/3).+NokiaBrowser/7\\.4",
				os_replacement: "Symbian^3 Belle"
			}, {
				regex: "(Symbian/3)",
				os_replacement: "Symbian^3"
			}, {
				regex: "(Series 60|SymbOS|S60)",
				os_replacement: "Symbian OS"
			}, {
				regex: "(MeeGo)",
				other: true
			}, {
				regex: "Symbian [Oo][Ss]",
				os_replacement: "Symbian OS"
			}, {
				regex: "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				os_replacement: "BlackBerry OS",
				manufacturer: "RIM"
			}, {
				regex: "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				os_replacement: "BlackBerry OS",
				manufacturer: "RIM"
			}, {
				regex: "(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)",
				os_replacement: "BlackBerry Tablet OS",
				tablet: true,
				manufacturer: "RIM"
			}, {
				regex: "(Play[Bb]ook)",
				os_replacement: "BlackBerry Tablet OS",
				tablet: true,
				manufacturer: "RIM"
			}, {
				regex: "(Black[Bb]erry)",
				os_replacement: "Blackberry OS",
				manufacturer: "RIM"
			}, {
				regex: "(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?",
				os_replacement: "webOS"
			}, {
				regex: "(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)",
				other: true
			}, {
				regex: "(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)",
				other: true
			},*/ {
				regex: "(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)"
			}, {
				regex: "(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)"
			}, {
				regex: "(Linux|BSD)",
				other: true
			} ],
			mobile_os_families: [ "Windows Phone 6.5", "Windows CE", "Symbian OS" ],
			/*device_parsers: [ {
				regex: "HTC ([A-Z][a-z0-9]+) Build",
				device_replacement: "HTC $1",
				manufacturer: "HTC"
			}, {
				regex: "HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+",
				device_replacement: "HTC $1",
				manufacturer: "HTC"
			}, {
				regex: "HTC_Touch_([A-Za-z0-9]+)",
				device_replacement: "HTC Touch ($1)",
				manufacturer: "HTC"
			}, {
				regex: "USCCHTC(\\d+)",
				device_replacement: "HTC $1 (US Cellular)",
				manufacturer: "HTC"
			}, {
				regex: "Sprint APA(9292)",
				device_replacement: "HTC $1 (Sprint)",
				manufacturer: "HTC"
			}, {
				regex: "HTC ([A-Za-z0-9]+ [A-Z])",
				device_replacement: "HTC $1",
				manufacturer: "HTC"
			}, {
				regex: "HTC-([A-Za-z0-9]+)",
				device_replacement: "HTC $1",
				manufacturer: "HTC"
			}, {
				regex: "HTC_([A-Za-z0-9]+)",
				device_replacement: "HTC $1",
				manufacturer: "HTC"
			}, {
				regex: "HTC ([A-Za-z0-9]+)",
				device_replacement: "HTC $1",
				manufacturer: "HTC"
			}, {
				regex: "(ADR[A-Za-z0-9]+)",
				device_replacement: "HTC $1",
				manufacturer: "HTC"
			}, {
				regex: "(HTC)",
				manufacturer: "HTC"
			}, {
				regex: "SonyEricsson([A-Za-z0-9]+)/",
				device_replacement: "Ericsson $1",
				other: true,
				manufacturer: "Sony"
			}, {
				regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build"
			}, {
				regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
			}, {
				regex: "Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
			}, {
				regex: "Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build"
			}, {
				regex: "Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build"
			}, {
				regex: "NokiaN([0-9]+)",
				device_replacement: "Nokia N$1",
				manufacturer: "Nokia"
			}, {
				regex: "Nokia([A-Za-z0-9\\v-]+)",
				device_replacement: "Nokia $1",
				manufacturer: "Nokia"
			}, {
				regex: "NOKIA ([A-Za-z0-9\\-]+)",
				device_replacement: "Nokia $1",
				manufacturer: "Nokia"
			}, {
				regex: "Nokia ([A-Za-z0-9\\-]+)",
				device_replacement: "Nokia $1",
				manufacturer: "Nokia"
			}, {
				regex: "Lumia ([A-Za-z0-9\\-]+)",
				device_replacement: "Lumia $1",
				manufacturer: "Nokia"
			}, {
				regex: "Symbian",
				device_replacement: "Nokia",
				manufacturer: "Nokia"
			}, {
				regex: "(PlayBook).+RIM Tablet OS",
				device_replacement: "Blackberry Playbook",
				tablet: true,
				manufacturer: "RIM"
			}, {
				regex: "(Black[Bb]erry [0-9]+);",
				manufacturer: "RIM"
			}, {
				regex: "Black[Bb]erry([0-9]+)",
				device_replacement: "BlackBerry $1",
				manufacturer: "RIM"
			}, {
				regex: "(Pre)/(\\d+)\\.(\\d+)",
				device_replacement: "Palm Pre",
				manufacturer: "Palm"
			}, {
				regex: "(Pixi)/(\\d+)\\.(\\d+)",
				device_replacement: "Palm Pixi",
				manufacturer: "Palm"
			}, {
				regex: "(Touchpad)/(\\d+)\\.(\\d+)",
				device_replacement: "HP Touchpad",
				manufacturer: "HP"
			}, {
				regex: "HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)",
				device_replacement: "HP iPAQ $1",
				manufacturer: "HP"
			}, {
				regex: "Palm([A-Za-z0-9]+)",
				device_replacement: "Palm $1",
				manufacturer: "Palm"
			}, {
				regex: "Treo([A-Za-z0-9]+)",
				device_replacement: "Palm Treo $1",
				manufacturer: "Palm"
			}, {
				regex: "webOS.*(P160UNA)/(\\d+).(\\d+)",
				device_replacement: "HP Veer",
				manufacturer: "HP"
			}, {
				regex: "(Kindle Fire)",
				manufacturer: "Amazon"
			}, {
				regex: "(Kindle)",
				manufacturer: "Amazon"
			}, {
				regex: "(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?",
				device_replacement: "Kindle Fire",
				tablet: true,
				manufacturer: "Amazon"
			}, {
				regex: "(iPad) Simulator;",
				manufacturer: "Apple"
			}, {
				regex: "(iPad);",
				manufacturer: "Apple"
			}, {
				regex: "(iPod);",
				manufacturer: "Apple"
			}, {
				regex: "(iPhone) Simulator;",
				manufacturer: "Apple"
			}, {
				regex: "(iPhone);",
				manufacturer: "Apple"
			}, {
				regex: "Nexus\\ ([A-Za-z0-9\\-]+)",
				device_replacement: "Nexus $1"
			}, {
				regex: "acer_([A-Za-z0-9]+)_",
				device_replacement: "Acer $1",
				manufacturer: "Acer"
			}, {
				regex: "acer_([A-Za-z0-9]+)_",
				device_replacement: "Acer $1",
				manufacturer: "Acer"
			}, {
				regex: "Amoi\\-([A-Za-z0-9]+)",
				device_replacement: "Amoi $1",
				other: true,
				manufacturer: "Amoi"
			}, {
				regex: "AMOI\\-([A-Za-z0-9]+)",
				device_replacement: "Amoi $1",
				other: true,
				manufacturer: "Amoi"
			}, {
				regex: "Asus\\-([A-Za-z0-9]+)",
				device_replacement: "Asus $1",
				manufacturer: "Asus"
			}, {
				regex: "ASUS\\-([A-Za-z0-9]+)",
				device_replacement: "Asus $1",
				manufacturer: "Asus"
			}, {
				regex: "BIRD\\-([A-Za-z0-9]+)",
				device_replacement: "Bird $1",
				other: true
			}, {
				regex: "BIRD\\.([A-Za-z0-9]+)",
				device_replacement: "Bird $1",
				other: true
			}, {
				regex: "BIRD ([A-Za-z0-9]+)",
				device_replacement: "Bird $1",
				other: true
			}, {
				regex: "Dell ([A-Za-z0-9]+)",
				device_replacement: "Dell $1",
				manufacturer: "Dell"
			}, {
				regex: "DoCoMo/2\\.0 ([A-Za-z0-9]+)",
				device_replacement: "DoCoMo $1",
				other: true
			}, {
				regex: "([A-Za-z0-9]+)\\_W\\;FOMA",
				device_replacement: "DoCoMo $1",
				other: true
			}, {
				regex: "([A-Za-z0-9]+)\\;FOMA",
				device_replacement: "DoCoMo $1",
				other: true
			}, {
				regex: "vodafone([A-Za-z0-9]+)",
				device_replacement: "Huawei Vodafone $1",
				other: true
			}, {
				regex: "i\\-mate ([A-Za-z0-9]+)",
				device_replacement: "i-mate $1",
				other: true
			}, {
				regex: "Kyocera\\-([A-Za-z0-9]+)",
				device_replacement: "Kyocera $1",
				other: true
			}, {
				regex: "KWC\\-([A-Za-z0-9]+)",
				device_replacement: "Kyocera $1",
				other: true
			}, {
				regex: "Lenovo\\-([A-Za-z0-9]+)",
				device_replacement: "Lenovo $1",
				manufacturer: "Lenovo"
			}, {
				regex: "Lenovo\\_([A-Za-z0-9]+)",
				device_replacement: "Lenovo $1",
				manufacturer: "Levovo"
			}, {
				regex: "LG/([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LG-LG([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LGE-LG([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LGE VX([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LG ([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LGE LG\\-AX([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LG\\-([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LGE\\-([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "LG([A-Za-z0-9]+)",
				device_replacement: "LG $1",
				manufacturer: "LG"
			}, {
				regex: "(KIN)\\.One (\\d+)\\.(\\d+)",
				device_replacement: "Microsoft $1"
			}, {
				regex: "(KIN)\\.Two (\\d+)\\.(\\d+)",
				device_replacement: "Microsoft $1"
			}, {
				regex: "(Motorola)\\-([A-Za-z0-9]+)",
				manufacturer: "Motorola"
			}, {
				regex: "MOTO\\-([A-Za-z0-9]+)",
				device_replacement: "Motorola $1",
				manufacturer: "Motorola"
			}, {
				regex: "MOT\\-([A-Za-z0-9]+)",
				device_replacement: "Motorola $1",
				manufacturer: "Motorola"
			}, {
				regex: "Philips([A-Za-z0-9]+)",
				device_replacement: "Philips $1",
				manufacturer: "Philips"
			}, {
				regex: "Philips ([A-Za-z0-9]+)",
				device_replacement: "Philips $1",
				manufacturer: "Philips"
			}, {
				regex: "SAMSUNG-([A-Za-z0-9\\-]+)",
				device_replacement: "Samsung $1",
				manufacturer: "Samsung"
			}, {
				regex: "SAMSUNG\\; ([A-Za-z0-9\\-]+)",
				device_replacement: "Samsung $1",
				manufacturer: "Samsung"
			}, {
				regex: "Softbank/1\\.0/([A-Za-z0-9]+)",
				device_replacement: "Softbank $1",
				other: true
			}, {
				regex: "Softbank/2\\.0/([A-Za-z0-9]+)",
				device_replacement: "Softbank $1",
				other: true
			}, {
				regex: "(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)",
				device_replacement: "Generic Smartphone"
			}, {
				regex: "^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly\\_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)",
				device_replacement: "Generic Feature Phone"
			}, {
				regex: "^(htcp|htcs|htct|htc\\_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)",
				device_replacement: "Generic Feature Phone"
			}, {
				regex: "^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)",
				device_replacement: "Generic Feature Phone"
			}, {
				regex: "^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda\\_)",
				device_replacement: "Generic Feature Phone"
			}, {
				regex: "(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)",
				device_replacement: "Spider"
			} ],*/
			mobile_browser_families: [ "Firefox Mobile", "Opera Mobile", "Opera Mini", "Mobile Safari", "webOS", "IE Mobile", "Playstation Portable", "Nokia", "Blackberry", "Palm", "Silk", "Android", "Maemo", "Obigo", "Netfront", "AvantGo", "Teleca", "SEMC-Browser", "Bolt", "Iris", "UP.Browser", "Symphony", "Minimo", "Bunjaloo", "Jasmine", "Dolfin", "Polaris", "BREW", "Chrome Mobile", "Chrome Mobile iOS", "UC Browser", "Tizen Browser" ]
		};
		// Parsers
		_this.parsers = [ /*"device_parsers",*/ "browser_parsers", "os_parsers", "mobile_os_families", "mobile_browser_families" ];
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
						/*ret.major = parseInt(major_rep ? major_rep : m[2]) || null;
						ret.minor = m[3] ? parseInt(m[3]) : null;
						ret.patch = m[4] ? parseInt(m[4]) : null;*/
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
			//var device_parsers = parsers("device");
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
			// Set Device
			/*a.device = find(ua, device_parsers);
			if (check(a.device)) {
				a.device.name = toString(a.device);
				a.device.version = toVersionString(a.device);
			} else {
				a.device = {
					tablet: false,
					family: "Other"
				};
			}*/
			// Determine Device Type
			var mobile_agents = {};
			var mobile_browser_families = _this.regexes.mobile_browser_families.map(function(str) {
				mobile_agents[str] = true;
			});
			var mobile_os_families = _this.regexes.mobile_os_families.map(function(str) {
				mobile_agents[str] = true;
			});
			// Is Spider
			/*if (a.browser.family === "Spider") {
				a.device.type = "Spider";
			} else if (a.browser.tablet || a.os.tablet || a.device.tablet) {
				a.device.type = "Tablet";
			} else if (mobile_agents.hasOwnProperty(a.browser.family)) {
				a.device.type = "Mobile";
			} else {
				a.device.type = "Desktop";
			}*/
			// Determine Device Manufacturer
			//a.device.manufacturer = a.browser.man || a.os.man || a.device.man || null;
			// Cleanup Objects
			remove([ a.browser, a.os/*, a.device*/ ], [ "tablet", "man" ]);
			// Return Agent
			return a;
		};
		// Return context
		return _this;
	};
	// Export the Underscore object for **Node.js** and **"CommonJS"**,
	// backwards-compatibility for the old `require()` API. If we're not
	// CommonJS, add `_` to the global object via a string identifier
	// the Closure Compiler "advanced" mode. Registration as an AMD
	// via define() happens at the end of this file
	/*if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			exports = module.exports = detect;
		}
		exports.detect = detect;
	} else {
		root["detect"] = detect;
	}
	// AMD define happens at the end for compatibility with AMD
	// that don't enforce next-turn semantics on modules
	if (typeof define === "function" && define.amd) {
		define(function(require) {
			return detect;
		});
	}*/

	
	// Assign to namespace
	namespace('springroll').Detect = detect();

}());
/**
 * @namespace springroll
 */
(function()
{
	var parsed = include('springroll.Detect').parse(navigator.userAgent);
	var browser, os;
	if(parsed.browser.family.indexOf("Safari") >= 0)
	{
		browser = "Safari";
	}
	else if(parsed.browser.family.indexOf("Firefox") >= 0)
	{
		browser = "Firefox";
	}
	else if(parsed.browser.family.indexOf("IE") >= 0)
	{
		browser = "IE";
	}
	else//Assume browser with the qualities of Chrome
	{
		browser = "Chrome";
	}
	if(parsed.os.name.indexOf("Windows") >= 0)
	{
		os = "Windows";
	}
	else if(parsed.os.name.indexOf("Mac") >= 0)
	{
		os = "Mac";
	}
	else if(parsed.os.name.indexOf("iOS") >= 0)
	{
		//iOS would probably report the same as OSX, right?
		os = "Mac";
		//all iOS browsers use a WebView that is similar to iOS Safari
		browser = "Safari";
	}
	else//Assume some form of Linux, including Android
	{
		os = "Linux";
	}
	
	/**
	*  USLocale is the standard keyboard layout for US computers. All standard keys are included.
	*  Keys to note:
	*
	*  * 'OS' represents both the Windows key and the 'command' key, although 'command'
	*    is also available when the client is running MacOS.
	*    
	*  * 'meta' represents 'ctrl' on Windows and Linux, and 'command' on OSX. Use this when creating
	*    keyboard shortcuts in web apps.
	*
	*  @class USLocale
	*  @static
	*/
	var USLocale =
	{
		//general
		"cancel":3,
		"backspace":8,
		"tab":9,
		"enter":13,
		"shift":16,
		"ctrl":17,
		"alt":18,
		"pause/break": os == "Mac" && browser != "Firefox" ? 126 : 19,
		"caps_lock":20,
		"esc":27,
		"spacebar":32,
		"pageup":33,
		"pagedown":34,
		"end":35,
		"home":36,
		"arrow_left":37,
		"arrow_up":38,
		"arrow_right":39,
		"arrow_down":40,
		//Note: on windows, only keyUp is fired for print_screen
		"print_screen": os == "Linux" ? 42 : (os == "Mac" && browser != "Firefox" ? 124 : 44),
		"insert":45,
		"delete":46,
		"scroll_lock": os == "Mac" && browser != "Firefox" ? 125 : 145,
		
		//command/windows - may be different for left/right, depending on browser
		//also might be 93, depending on OS
		"OS": browser == "Firefox" ?
			//Firefox uses the same keycode for left & right
			(os == "Mac" ? 224 : 91) :
			//other browsers use different codes for left/right, although webkit uses a different
			//code on OSX than Windows/Linux
			[
				91,
				os == "Mac" ? 93 : 92
			],
		//on windows keyboard, located where the right 'windows' key might be
		//not fired by Safari/Chrome on OSX (but is on FF?)
		"context_menu": os == "Mac" ? 0 : 93,
		
		";":186,
		"=":187,
		",":188,
		"-":189,
		".":190,
		"/":191,
		"`":192,
		"\\":220,
		"[":219,
		"]":221,
		"'":222,
		
		//number pad keys
		"num_*":106,
		"num_+":107,
		"num_enter":108,
		"num_-":109,
		"num_.":110,
		"num_/":111,
		//'num lock' is 'clear' on Mac keyboards
		"num_lock": os == "Mac" ? 12 : 144,
		"clear": os == "Mac" ? 12 : 144
	};
	var i;
	//A-Z
	for(i = 65; i <= 90; ++i)
	{
		//use the capital letter as the value for the keyCode
		USLocale[String.fromCharCode(i + 32)] = i;
	}
	//0-9
	for(i = 48; i <= 57; ++i)
	{
		USLocale[String.fromCharCode(i)] = i;
	}
	//0-9, number pad: num_0-num_9
	for(i = 96; i <= 105; ++i)
	{
		USLocale["num_" + (i-96)] = i;
	}
	//F1-F12
	for(i = 112; i <= 123; ++i)
	{
		USLocale["F" + (i - 111)] = i;
	}
	
	//OS specfic 'meta' key - pick ctrl or command
	if(os == "Mac")
	{
		//also create 'command' for people that only want command
		USLocale.meta = USLocale.command = USLocale.OS;
	}
	else
	{
		USLocale.meta = USLocale.ctrl;
		USLocale.command = 0;
	}
	
	// Assign to namespace
	namespace('springroll.keyboard').USLocale = USLocale;

}());
/**
 * @namespace springroll
 */
(function()
{
	var Application = include('springroll.Application'),
		Debug = include('springroll.Debug', false);
	
	/**
	*  A class for easier keyboard controls, from simple key events to complex key combinations.
	*
	*  @class Keyboard
	*  @constructor
	*  @param {DOMElement} target The DOM element to listen to key events on.
	*  @param {Object} locale The keyboard locale, like springroll.USLocale, which defines keys to
	*                         keep track of.
	*/
	var Keyboard = function(target, locale)
	{
		//bind callbacks/listeners
		this._onFocusLost = this._onFocusLost.bind(this);
		this._onPaused = this._onPaused.bind(this);
		this._onResumed = this._onResumed.bind(this);
		this._update = this._update.bind(this);
		this._keyDown = this._keyDown.bind(this);
		this._keyUp = this._keyUp.bind(this);
		
		/**
		 * The DOM element that the key event listeners are attached to.
		 * @property {DOMElement} target
		 * @private
		 * @readOnly
		 */
		this.target = target;
		target.addEventListener('onblur', this._onFocusLost);
		
		/**
		 * All keys that are listened to, arranged by key code.
		 * @property {Object} _keysByCode
		 * @private
		 */
		var _keysByCode = this._keysByCode = {};
		/**
		 * All keys that are listened to, arranged by key name.
		 * @property {Object} _keysByName
		 * @private
		 */
		var _keysByName = this._keysByName = {};
		/**
		 * All key combinations that have been registered
		 * @property {Array} _activeCombos
		 * @private
		 */
		this._activeCombos = [];
		/**
		 * Keys that have been updated since the most recent frame update. This array gets wiped
		 * each _update call.
		 * @property {Array} _updatedKeys
		 * @private
		 */
		this._updatedKeys = [];
		
		/**
		 * The callback used when key detection has ended.
		 * @property {Function} detectKeyCallback
		 * @private
		 */
		this.detectKeyCallback = null;
		/**
		 * The key object that is used to cancel key detection.
		 * @property {Key} detectCancelKey
		 * @private
		 */
		this.detectCancelKey = null;
		
		/**
		 * If key detection should allow key modifiers, instead of just detecting those keys
		 * by themselves
		 * @property {Boolean} detectModifiers
		 * @private
		 */
		this.detectModifiers = false;
		
		/**
		 * The list of key names for modifier keys - 'ctrl', 'alt', 'shift', and 'command'.
		 * @property {Array} modifiers
		 * @private
		 */
		this.modifiers = ["ctrl", "alt", "shift", "command"];
		
		for(var keyName in locale)
		{
			var codes = locale[keyName];
			if(!Array.isArray(codes))
				codes = [codes];
			var i, key = null;
			for(i = 0; i < codes.length; ++i)
			{
				if(_keysByCode[codes[i]])
				{
					key = _keysByCode[codes[i]];
					break;
				}
			}
			if(!key)
				key = new Key();
			key.addName(keyName);
			key.addCode(codes);
			_keysByName[keyName] = key;
			for(i = 0; i < codes.length; ++i)
			{
				_keysByCode[codes[i]] = key;
			}
		}
		
		this.enabled = true;
		
		var app = Application.instance;
		app.on('paused', this._onPaused);
		app.on('resumed', this._onResumed);
	};

	// Reference to the prototype
	var p = Keyboard.prototype;
	
	//=======
	//event type functions
	
	/**
	 * Adds a listener for keydown events on a specific key. The callback will be passed the key
	 * name, in case the same callback is used for multiple keys.
	 * @method addKeyDown
	 * @param {String} keyName The name of the key, from the locale, to listen for.
	 * @param {Function} callback The function to call when the key is first pressed.
	 * @param {Boolean} [preventDefault=false] If the key should have the default action prevented
	 *                                         while this listener is attached.
	 */
	p.addKeyDown = function(keyName, callback, preventDefault)
	{
		var key = this._keysByName[keyName];
		if(!key)
		{
			if(Debug)
				Debug.warn("No key found with name '" + keyName + "'");
			return;
		}
		
		key.addListener(callback, false, keyName, !!preventDefault);
	};
	
	/**
	 * Removes a listener for keydown events on a specific key.
	 * @method removeKeyDown
	 * @param {String} keyName The name of the key, from the locale, to listen for.
	 * @param {Function} callback The function to be removed from the listener list.
	 */
	p.removeKeyDown = function(keyName, callback)
	{
		var key = this._keysByName[keyName];
		if(key)
			key.removeListener(callback, false);
	};
	
	/**
	 * Adds a listener for keyup events on a specific key. The callback will be passed the key
	 * name, in case the same callback is used for multiple keys.
	 * @method addKeyUp
	 * @param {String} keyName The name of the key, from the locale, to listen for.
	 * @param {Function} callback The function to call when the key is released.
	 * @param {Boolean} [preventDefault=false] If the key should have the default action prevented
	 *                                         while this listener is attached.
	 */
	p.addKeyUp = function(keyName, callback, preventDefault)
	{
		var key = this._keysByName[keyName];
		if(!key)
		{
			if(Debug)
				Debug.warn("No key found with name '" + keyName + "'");
			return;
		}
		
		key.addListener(callback, true, keyName, !!preventDefault);
	};
	
	/**
	 * Removes a listener for keyup events on a specific key.
	 * @method removeKeyUp
	 * @param {String} keyName The name of the key, from the locale, to listen for.
	 * @param {Function} callback The function to be removed from the listener list.
	 */
	p.removeKeyUp = function(keyName, callback)
	{
		var key = this._keysByName[keyName];
		if(key)
			key.removeListener(callback, true);
	};
	
	/**
	 * Sets if the default browser action should be prevented on a specific key. This is good
	 * for keys that are only checked with justPressed(), isDown(), and justReleased().
	 * @method setPreventDefaultOnKey
	 * @param {String} keyName The name of the key, from the locale, to listen for.
	 * @param {Boolean} preventDefault If the key should have the default action prevented.
	 */
	p.setPreventDefaultOnKey = function(keyName, preventDefault)
	{
		var key = this._keysByName[keyName];
		if(key)
			key.preventDownDefault = preventDefault;
	};
	
	/**
	 * Creates a key combination. Combination syntax is key names separated by '+' for simultaneous
	 * keys and '>' for sequential keys. Whitespace is required around the '+' and '>' separators.
	 * Keys must be fully released between '>' stages.
	 * @method addCombo
	 * @param {String} comboString A string defining how the key combination functions.
	 * @param {Function} callback The function to called when the combination successfully fires.
	 * @param {Boolean} [preventDefault=true] If the combo should have the default action prevented,
	 *                                        for any successful step of it that is completed.
	 */
	p.addCombo = function(comboString, callback, preventDefault)
	{
		//preventDefault defaults to true here, to cancel stuff like ctrl+s
		if(preventDefault !== false)
			preventDefault = true;
		
		var combo,
			_activeCombos = this._activeCombos;
		for(var i = _activeCombos.length - 1; i >= 0; --i)
		{
			if(_activeCombos[i].name == comboString &&
				_activeCombos[i].preventDefault == preventDefault)
			{
				combo = _activeCombos[i];
				break;
			}
		}
		if(!combo)
		{
			combo = new Combo(comboString, preventDefault, this._keysByName);
			_activeCombos.push(combo);
		}
		combo.addListener(callback);
	};
	
	/**
	 * Removes a listener for a key combination. If no listeners remain, that key
	 * combination is destroyed.
	 * @method removeKeyUp
	 * @param {String} comboString The comboString used to create the combination.
	 * @param {Function} callback The function to be removed from the listener list.
	 */
	p.removeCombo = function(comboString, callback)
	{
		var _activeCombos = this._activeCombos;
		for(var i = _activeCombos.length - 1; i >= 0; --i)
		{
			if(_activeCombos[i].name == comboString)
			{
				if(_activeCombos[i].removeListener(callback))
				{
					if(i == _activeCombos.length - 1)
						_activeCombos.pop();
					else
						_activeCombos.splice(i, 1);
				}
			}
		}
	};
	
	/**
	 * Begins listening for the next key to be pressed (or repeated). The callback is passed
	 * the name of that key, so that it can then be used with other functions. Additionally, if
	 * the key pressed does not have a recognized keyCode, then an entry is created for it with the
	 * name <code>'key_%keyCode%'</code>. If the cancel key is pressed, then the callback is passed
	 * <code>null</code>. If allowModifiers is true, then the result should be considered a key
	 * combination to be used with addCombo().
	 * @method detectNextKey
	 * @param {Function} callback The function to be called when a key is pressed.
	 * @param {String} [cancelKey="esc"] The name of the key to cancel the listener. If explictly
	 *                                   passed <code>null</code>, then the "esc" key can be
	 *                                   detected and this action can only be cancelled with
	 *                                   stopDetecting().
	 * @param {Boolean} [allowModifiers=false] If key modifiers (ctrl, alt, shift, command) should
	 *                                         be detected as modifications of the pressed key
	 *                                         instead of as their own keypresses.
	 */
	p.detectNextKey = function(callback, cancelKey, allowModifiers)
	{
		if(cancelKey === undefined)
			cancelKey = this._keysByName.esc;
		else if(cancelKey)
			cancelKey = this._keysByName[cancelKey];
		
		this.detectKeyCallback = callback;
		this.detectCancelKey = cancelKey || null;
		this.detectModifiers = !!allowModifiers;
	};
	
	/**
	 * Cancels a detectNextKey() action.
	 * @method stopDetecting
	 */
	p.stopDetecting = function()
	{
		this.detectKeyCallback = null;
		this.detectCancelKey = null;
	};
	
	//=======
	//update checker functions
	
	/**
	 * Checks to see if a key has begun to be pressed since the last Application 'update' event.
	 * @method justPressed
	 * @param {String} keyName The name of the key to check.
	 * @return {Boolean} If the key was just pressed or not.
	 */
	p.justPressed = function(keyName)
	{
		var key = this._keysByName[keyName];
		if(key)
			return key.justDown;
		else
			return false;
	};
	
	/**
	 * Checks to see if a key is being held down.
	 * @method isDown
	 * @param {String} keyName The name of the key to check.
	 * @return {Boolean} If the key is down or not.
	 */
	p.isDown = function(keyName)
	{
		var key = this._keysByName[keyName];
		if(key)
			return key.isDown;
		else
			return false;
	};
	
	/**
	 * Checks to see if a key has been released since the last Application 'update' event.
	 * @method justReleased
	 * @param {String} keyName The name of the key to check.
	 * @return {Boolean} If the key was just released or not.
	 */
	p.justReleased = function(keyName)
	{
		var key = this._keysByName[keyName];
		if(key)
			return key.justUp;
		else
			return false;
	};
	
	/**
	* If the Keyboard should be handling key events or not. Setting this to false immediately
	* resets the status of any keys that are currently pressed.
	* @property {Object} enabled
	*/
	Object.defineProperty(p, "enabled", {
		get: function() { return this._enabled; },
		set: function(value)
		{
			this._enabled = value;
			var target = this.target;
			target.removeEventListener('keydown', this._keyDown, true);
			target.removeEventListener('keyup', this._keyUp, true);
			Application.instance.off('update', this._update);
			if(value)
			{
				target.addEventListener('keydown', this._keyDown, true);
				target.addEventListener('keyup', this._keyUp, true);
				//use a really low priority to clear the key states after everything else has had
				//a chance to check them
				Application.instance.on('update', this._update, -1000);
			}
			else
				this.clearKeys();
		}
	});
	
	/**
	 * Clears the status of all keys that are pressed, requiring them to be released and pressed
	 * again.
	 * @method clearKeys
	 */
	p.clearKeys = function()
	{
		var _keysByCode = this._keysByCode;
		
		if(!_keysByCode) return;
		
		for(var code in _keysByCode)
		{
			var key = _keysByCode[code];
			key.isDown = key.justDown = key.justUp = false;
		}
	};
	
	/**
	 * Listener for when the target has lost focus, to call clearKeys().
	 * @method _onFocusLost
	 * @private
	 * @param {Event} ev The event from the DOM.
	 */
	p._onFocusLost = function(ev)
	{
		this.clearKeys();
	};
	
	/**
	 * Listener for Application 'paused' events. Disables the Keyboard.
	 * @method _onPaused
	 * @private
	 */
	p._onPaused = function()
	{
		this.enabled = false;
	};
	
	/**
	 * Listener for Application 'resumed' events. Enables the Keyboard and gives browser focus
	 * to the target.
	 * @method _onResumed
	 * @private
	 */
	p._onResumed = function()
	{
		this.enabled = true;
		
		var target = this.target;
		if(target && target.focus)
			target.focus();
	};
	
	/**
	 * Listener for Application 'update' events. This is created with a priority of -1000 so that
	 * it can reset justPressed() and justReleased() states after other code has had a chance to
	 * check them.
	 * @method _update
	 * @private
	 * @param  {Number} elapsed Milliseconds elapsed since the previous update.
	 */
	p._update = function(elapsed)
	{
		var _updatedKeys = this._updatedKeys;
		if(!_updatedKeys || !_updatedKeys.length) return;
		
		for(var i = _updatedKeys.length - 1; i >= 0; --i)
		{
			var key = _updatedKeys[i];
			key.justDown = key.justUp = false;
		}
		_updatedKeys.length = 0;
	};
	
	/**
	 * Listener for keydown events on the target.
	 * @method _keyDown
	 * @private
	 * @param  {KeyboardEvent} ev The keyboard event.
	 */
	p._keyDown = function(ev)
	{
		var key = this._keysByCode[ev.keyCode];
		var i;
		
		if(this.detectKeyCallback)
		{
			var callback = this.detectKeyCallback;
			
			if(key && key == this.detectCancelKey)
			{
				this.detectKeyCallback = null;
				callback(null);
			}
			else
			{
				//make sure it wasn't a modifier we should handle
				var wasModifier = false;
				var modifiers = this.modifiers;
				if(this.detectModifiers)
				{
					for(i = 0; i < modifiers.length; ++i)
					{
						if(key === this._keysByName[modifiers[i]])
						{
							wasModifier = true;
							break;
						}
					}
				}
				//skip modifier keys when they are used as modifiers
				if(!wasModifier)
				{
					this.detectKeyCallback = null;
					//because we are detecting the next key pressed, we should create
					//a new key - this feature is largely for creating keybindings, and it's probable
					//we aren't expecting all keycodes
					if(!key)
					{
						key = new Key(ev.keyCode, "key_" + ev.keyCode);
						this._keysByCode[ev.keyCode] = key;
						this._keysByName[key.name] = key;
					}
					var detected = key.preferredName;
					if(this.detectModifiers)
					{
						for(i = 0; i < modifiers.length; ++i)
						{
							if(this._keysByName[modifiers[i]].isDown)
							{
								detected = modifiers[i] + " + " + detected;
							}
						}
					}
					callback(detected);
				}
			}
		}
		
		var preventDefault = false;
		if(key && !key.isDown)
		{
			key.isDown = key.justDown = true;
			if(this._updatedKeys.indexOf(key) == -1)
				this._updatedKeys.push(key);
			if(key.trigger())
				preventDefault = true;
			
			//handle combos
			for(i = this._activeCombos.length - 1; i >= 0; --i)
			{
				if(this._activeCombos[i].testKeyDown(ev.keyCode))
					preventDefault = true;
			}
		}
		if(preventDefault)
		{
			ev.preventDefault();
			return true;
		}
	};
	
	/**
	 * Listener for keyup events on the target.
	 * @method _keyUp
	 * @private
	 * @param  {KeyboardEvent} ev The keyboard event.
	 */
	p._keyUp = function(ev)
	{
		var key = this._keysByCode[ev.keyCode];
		
		var preventDefault = false;
		if(key && key.isDown)
		{
			key.isDown = false;
			key.justUp = true;
			if(this._updatedKeys.indexOf(key) == -1)
				this._updatedKeys.push(key);
			if(key.trigger())
				preventDefault = true;
			
			//handle combos
			for(var i = this._activeCombos.length - 1; i >= 0; --i)
			{
				if(this._activeCombos[i].testKeyUp(ev.keyCode))
					preventDefault = true;
			}
		}
		if(preventDefault)
		{
			ev.preventDefault();
			return true;
		}
	};
	
	/**
	 * Destroys the keyboard and removes all listeners. Do not use after this is called.
	 * @method destroy
	 */
	p.destroy = function()
	{
		this.enabled = false;
		var app = Application.instance;
		if(app)
		{
			app.off('paused', this._onPaused);
			app.off('resumed', this._onResumed);
		}
		this.target.removeEventListener('onblur', this._onFocusLost);
		var i;
		for(i in this._keysByCode)
			this._keysByCode[i].destroy();
		for(i = this._activeCombos.length - 1; i >= 0; --i)
			this._activeCombos[i].destroy();
		this._keysByCode = this._keysByName = this._updatedKeys = this._activeCombos =
			this.target = null;
		this._update = this._keyDown = this._keyUp = this._onResumed = this._onPaused =
			this._onFocusLost = null;
	};
	
	// Assign to namespace
	namespace('springroll').Keyboard = Keyboard;
	
	
	//================= Internal Helper Classes ============
	var Key = function()
	{
		this.codes = [];
		this.names = [];
		//decides which name to send with key up/down events in case there is more
		//than one name - for example, choosing 'clear' over 'num_lock'
		this.preferredName = null;
		//listener functions
		this.upListeners = [];
		this.downListeners = [];
		this.preventDownDefault = false;
		this.preventUpDefault = false;
		
		this.isDown = false;
		this.justDown = false;
		this.justUp = false;
	};
	
	p = Key.prototype;
	
	p.addCode = function(code)
	{
		if(Array.isArray(code))
		{
			for(var i = 0; i < code.length; ++i)
				this.codes.push(code[i]);
		}
		else
			this.codes.push(code);
	};
	
	p.addName = function(name)
	{
		if(!this.names.length)
			this.preferredName = name;
		this.names.push(name);
	};
	
	p.addListener = function(listener, isUp, requestedName, preventDefault)
	{
		var listeners = isUp ? this.upListeners : this.downListeners;
		if(listeners.indexOf(listener) == -1)
			listeners.push(listener);
		if(this.preferredName != requestedName)
			this.preferredName = requestedName;
		listener.preventDefault = preventDefault;
		if(preventDefault)
		{
			if(isUp)
				this.preventUpDefault = true;
			else
				this.preventDownDefault = true;
		}
	};
	
	p.removeListener = function(listener, isUp)
	{
		var listeners = isUp ? this.upListeners : this.downListeners,
			index = listeners.indexOf(listener);
		if(index >= 0)
		{
			if(index < 1)
				listeners.shift();
			else
				listeners.splice(index, 1);
		}
		//see if we should clear the prevent default status
		var preventDefault = false;
		for(index = listeners.length - 1; index >= 0; --index)
		{
			if(listeners[i].preventDefault)
			{
				preventDefault = true;
				break;
			}
		}
		if(isUp)
			this.preventUpDefault = preventDefault;
		else
			this.preventDownDefault = preventDefault;
	};
	
	p.trigger = function()
	{
		var listeners = this.isDown ? this.downListeners : this.upListeners;
		for(var i = 0; i < listeners.length; ++i)
		{
			listeners[i](this.preferredName);
		}
		return this.isDown ? this.preventDownDefault : this.preventUpDefault;
	};
	
	p.destroy = function()
	{
		this.codes = this.names = this.upListeners = this.downListeners = null;
	};
	
	var Combo = function(name, preventDefault, keysByNameRef)
	{
		this.name = name;
		this.listeners = [];
		this.steps = [];
		this.currentStep = 0;
		this.preventDefault = preventDefault;
		
		//2: split based on steps, > surrounded by whitespace
		var steps = name.split(/\s+>\s+/g);
		for(var i = 0; i < steps.length; ++i)
		{
			//3: split step components, + surrounded by whitespace
			var stepNames = steps[i].split(/\s+\+\s+/g);
			var step = [];
			for(var j = 0; j < stepNames.length; ++j)
			{
				//get the actual key
				var keyName = stepNames[j];
				if(keyName == "\\>")
					keyName = ">";
				else if(keyName == "\\+")
					keyName = "+";
				var key = keysByNameRef[keyName];
				if(!key)
				{
					if(Debug)
						Debug.warn("Issue while creating combo - no key with name " + keyName);
					continue;
				}
				//push an object to track that key
				step.push({sated: false, released: false, codes: key.codes});
			}
			//if the step is valid, add the step to the list
			if(step.length)
				this.steps.push(step);
		}
	};
	
	p = Combo.prototype;
	
	p.testKeyDown = function(keyCode)
	{
		var step = this.steps[this.currentStep];
		var found = false,
			i,
			key;
		//see if we are waiting on that key
		for(i = 0; i < step.length; ++i)
		{
			key = step[i];
			if(key.codes.indexOf(keyCode) >= 0)
			{
				if(key.sated)//key was pressed twice - cancel everything
					break;
				key.sated = true;
				found = true;
				break;
			}
		}
		//if the key is not one of ours, reset the combo to the beginning
		if(!found)
		{
			this.resetStep();
			this.currentStep = 0;
			return false;
		}
		//see if we are ready to complete the combo or move on to the next step
		var allSuccess = true;
		for(i = 0; i < step.length; ++i)
		{
			key = step[i];
			if(!key.sated)
			{
				allSuccess = false;
				break;
			}
		}
		
		//if that was the last step, trigger listeners immediately
		if(allSuccess && this.currentStep + 1 == this.steps.length)
		{
			this.trigger();
			this.resetStep();
			this.currentStep = 0;
		}
		
		//let Keyboard know if the default key behavior should be prevented
		return this.preventDefault;
	};
	
	p.testKeyUp = function(keyCode)
	{
		var step = this.steps[this.currentStep];
		var found = false,
			i,
			key;
		//see if we are waiting on that key
		for(i = 0; i < step.length; ++i)
		{
			key = step[i];
			//only note keys that have been sated, to avoid marking keys as released
			//when the combo was cancelled while being held
			if(key.sated && key.codes.indexOf(keyCode) >= 0)
			{
				key.released = true;
				found = true;
				break;
			}
		}
		
		if(found)
		{
			var allReleased = true;
			for(i = 0; i < step.length; ++i)
			{
				if(!step[i].released)
				{
					allReleased = false;
					break;
				}
			}
			//if all keys for the current step have been released,
			//move on to the next one
			if(allReleased)
			{
				this.resetStep();
				++this.currentStep;
			}
		}
		
		//if the key was valid, then let Keyboard know if we should prevent default behavior
		return found && this.preventDefault;
	};
	
	p.resetStep = function()
	{
		var step = this.steps[this.currentStep];
		for(i = 0; i < step.length; ++i)
		{
			key = step[i];
			key.sated = key.released = false;
		}
	};
	
	p.trigger = function()
	{
		var listeners = this.listeners;
		for(var i = 0; i < listeners.length; ++i)
		{
			listeners[i](this.name);
		}
	};
	
	p.addListener = function(listener)
	{
		var listeners = this.listeners;
		if(listeners.indexOf(listener) == -1)
			listeners.push(listener);
	};
	
	p.removeListener = function(listener)
	{
		var listeners = this.listeners,
			index = listeners.indexOf(listener);
		if(index >= 0)
		{
			if(index < 1)
				listeners.shift();
			else
				listeners.splice(index, 1);
		}
		//if there are no more listeners, return true to tell the Keyboard to destroy it
		return listeners.length < 1;
	};
	
	p.destroy = function()
	{
		this.listeners = this.steps = null;
	};

}());
/**
 * @namespace springroll
 */
(function()
{
	// Include classes
	var Keyboard = include('springroll.Keyboard'),
		ApplicationPlugin = include('springroll.ApplicationPlugin'),
		USLocale = include('springroll.keyboard.USLocale');

	/**
	 * Create an app plugin for Keyboard, all properties and methods documented
	 * in this class are mixed-in to the main Application
	 * @class KeyboardPlugin
	 * @extends springroll.ApplicationPlugin
	 */
	var plugin = new ApplicationPlugin();

	// Init the Keyboard
	plugin.setup = function()
	{
		/**
		 *	The locale to use for keycodes.
		 *	@property {Object} options.keyboardLocale
		 *	@default springroll.USLocale
		 */
		this.options.add("keyboardLocale", null, true);
		
		/**
		 *	The target DOM to listen to all keyboard events from.
		 *	@property {DOMElement|String} options.keyboardTarget
		 *	@default document
		 */
		this.options.add("keyboardTarget", null, true);
	};
	
	//not actually async, but needs to happen after App options have been done
	plugin.preload = function(done)
	{
		this.options.asDOMElement("keyboardTarget");
		var target = this.options.keyboardTarget || document;
		
		var locale = this.options.keyboardLocale || USLocale;
		
		/**
		 * The Keyboard instance
		 * @property {springroll.Keyboard} keyboard
		 */
		this.keyboard = new Keyboard(target, locale);
		
		done();
	};

	// Destroy the animator
	plugin.teardown = function()
	{
		this.keyboard.destroy();
		this.keyboard = null;
	};

}());