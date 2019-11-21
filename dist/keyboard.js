/**
 * @namespace springroll.keyboard
 */
(function()
{
	var userAgent = navigator.userAgent;

	if(userAgent.indexOf("Safari") >= 0)
	{
		browser = "Safari";
	}
	else if(userAgent.indexOf("Firefox") >= 0)
	{
		browser = "Firefox";
	}
	else if(userAgent.indexOf("IE") >= 0 || userAgent.indexOf("Edge"))
	{
		browser = "IE";
	}
	else//Assume browser with the qualities of Chrome
	{
		browser = "Chrome";
	}

	if(userAgent.indexOf("Windows") >= 0)
	{
		os = "Windows";
	}
	else if(userAgent.indexOf("Mac") >= 0)
	{
		os = "Mac";
	}
	else if(userAgent.indexOf("iOS") >= 0 || userAgent.indexOf('iPhone') >= 0 || userAgent.indexOf('iPad') >= 0)
	{
		os = "Mac";
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
		/**
		 * Cancel key
		 * @property {int} cancel
		 * @readOnly
		 */
		"cancel":3,

		/**
		 * backspace key
		 * @property {int} backspace
		 * @readOnly
		 */
		"backspace":8,

		/**
		 * tab key
		 * @property {int} tab
		 * @readOnly
		 */
		"tab":9,

		/**
		 * enter key
		 * @property {int} enter
		 * @readOnly
		 */
		"enter":13,

		/**
		 * shift key
		 * @property {int} shift
		 * @readOnly
		 */
		"shift":16,

		/**
		 * ctrl key
		 * @property {int} ctrl
		 * @readOnly
		 */
		"ctrl":17,

		/**
		 * alt key
		 * @property {int} alt
		 * @readOnly
		 */
		"alt":18,

		/**
		 * Pause or break key
		 * @property {int} pause/break
		 * @readOnly
		 */
		"pause/break": os == "Mac" && browser != "Firefox" ? 126 : 19,

		/**
		 * CAPS lock key
		 * @property {int} caps_lock
		 * @readOnly
		 */
		"caps_lock":20,

		/**
		 * Escape key
		 * @property {int} esc
		 * @readOnly
		 */
		"esc":27,

		/**
		 * Spacebar key
		 * @property {int} spacebar
		 * @readOnly
		 */
		"spacebar":32,

		/**
		 * Page Up key
		 * @property {int} pageup
		 * @readOnly
		 */
		"pageup":33,

		/**
		 * Page Down key
		 * @property {int} pagedown
		 * @readOnly
		 */
		"pagedown":34,

		/**
		 * end key
		 * @property {int} end
		 * @readOnly
		 */
		"end":35,

		/**
		 * home key
		 * @property {int} home
		 * @readOnly
		 */
		"home":36,

		/**
		 * Toggle left key
		 * @property {int} arrow_left
		 * @readOnly
		 */
		"arrow_left":37,

		/**
		 * Toggle up key
		 * @property {int} arrow_up
		 * @readOnly
		 */
		"arrow_up":38,

		/**
		 * Toggle right key
		 * @property {int} arrow_right
		 * @readOnly
		 */
		"arrow_right":39,

		/**
		 * Toggle down key
		 * @property {int} arrow_down
		 * @readOnly
		 */
		"arrow_down":40,

		/**
		 * Print screen key
		 * @property {int} print_screen
		 * @readOnly
		 */
		//Note: on windows, only keyUp is fired for print_screen
		"print_screen": os == "Linux" ? 42 : (os == "Mac" && browser != "Firefox" ? 124 : 44),

		/**
		 * insert key
		 * @property {int} insert
		 * @readOnly
		 */
		"insert":45,

		/**
		 * delete key
		 * @property {int} delete
		 * @readOnly
		 */
		"delete":46,

		/**
		 * Scroll lock key
		 * @property {int} scroll_lock
		 * @readOnly
		 */
		"scroll_lock": os == "Mac" && browser != "Firefox" ? 125 : 145,
		
		/**
		 * The OS button, either Windows or Apple Button
		 * @property {int} OS
		 * @readOnly
		 */
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

		/**
		 * on windows keyboard, located where the right 'windows' key might be
		 * not fired by Safari/Chrome on OSX (but is on FF?)
		 * @property {int} context_menu
		 * @readOnly
		 */
		"context_menu": os == "Mac" ? 0 : 93,
		
		/**
		 * Semi-colon
		 * @property {int} ;
		 * @readOnly
		 */
		";":186,

		/**
		 * Equals
		 * @property {int} =
		 * @readOnly
		 */
		"=":187,

		/**
		 * Comma
		 * @property {int} ,
		 * @readOnly
		 */
		",":188,

		/**
		 * Hyphen
		 * @property {int} -
		 * @readOnly
		 */
		"-":189,

		/**
		 * Period
		 * @property {int} .
		 * @readOnly
		 */
		".":190,

		/**
		 * Backslash
		 * @property {int} /
		 * @readOnly
		 */
		"/":191,

		/**
		 * Tick mark
		 * @property {int} `
		 * @readOnly
		 */
		"`":192,

		/**
		 * Forward slash
		 * @property {int} \
		 * @readOnly
		 */
		"\\":220,

		/**
		 * Left bracket
		 * @property {int} [
		 * @readOnly
		 */
		"[":219,

		/**
		 * Right bracket
		 * @property {int} ]
		 * @readOnly
		 */
		"]":221,

		/**
		 * An apostrophe
		 * @property {int} '
		 * @readOnly
		 */
		"'":222,
		
		//number pad keys
		/**
		 * Number pad times
		 * @property {int} num_*
		 * @readOnly
		 */
		"num_*":106,

		/**
		 * Number pad plus
		 * @property {int} num_+
		 * @readOnly
		 */
		"num_+":107,

		/**
		 * Number pad enter
		 * @property {int} num_enter
		 * @readOnly
		 */
		"num_enter":108,

		/**
		 * Number pad minus
		 * @property {int} num_-
		 * @readOnly
		 */
		"num_-":109,

		/**
		 * Number pad decimal
		 * @property {int} num_.
		 * @readOnly
		 */
		"num_.":110,

		/**
		 * Number pad divide
		 * @property {int} num_/
		 * @readOnly
		 */
		"num_/":111,

		/**
		 * Number pad lock, 'num lock' is 'clear' on Mac keyboards
		 * @property {int} num_lock
		 * @readOnly
		 */
		"num_lock": os == "Mac" ? 12 : 144,

		/**
		 * Number pad clear
		 * @property {int} clear
		 * @readOnly
		 */
		"clear": os == "Mac" ? 12 : 144
	};
	var i;
	/**
	 * Alpha letter A
	 * @property {int} A
	 * @readOnly
	 */
	/**
	 * Alpha letter B
	 * @property {int} B
	 * @readOnly
	 */
	/**
	 * Alpha letter C
	 * @property {int} C
	 * @readOnly
	 */
	/**
	 * Alpha letter D
	 * @property {int} D
	 * @readOnly
	 */
	/**
	 * Alpha letter E
	 * @property {int} E
	 * @readOnly
	 */
	/**
	 * Alpha letter F
	 * @property {int} F
	 * @readOnly
	 */
	/**
	 * Alpha letter G
	 * @property {int} G
	 * @readOnly
	 */
	/**
	 * Alpha letter H
	 * @property {int} H
	 * @readOnly
	 */
	/**
	 * Alpha letter I
	 * @property {int} I
	 * @readOnly
	 */
	/**
	 * Alpha letter J
	 * @property {int} J
	 * @readOnly
	 */
	/**
	 * Alpha letter K
	 * @property {int} K
	 * @readOnly
	 */
	/**
	 * Alpha letter L
	 * @property {int} L
	 * @readOnly
	 */
	/**
	 * Alpha letter M
	 * @property {int} M
	 * @readOnly
	 */
	/**
	 * Alpha letter N
	 * @property {int} N
	 * @readOnly
	 */
	/**
	 * Alpha letter O
	 * @property {int} O
	 * @readOnly
	 */
	/**
	 * Alpha letter P
	 * @property {int} P
	 * @readOnly
	 */
	/**
	 * Alpha letter Q
	 * @property {int} Q
	 * @readOnly
	 */
	/**
	 * Alpha letter R
	 * @property {int} R
	 * @readOnly
	 */
	/**
	 * Alpha letter S
	 * @property {int} S
	 * @readOnly
	 */
	/**
	 * Alpha letter T
	 * @property {int} T
	 * @readOnly
	 */
	/**
	 * Alpha letter U
	 * @property {int} U
	 * @readOnly
	 */
	/**
	 * Alpha letter V
	 * @property {int} V
	 * @readOnly
	 */
	/**
	 * Alpha letter W
	 * @property {int} W
	 * @readOnly
	 */
	/**
	 * Alpha letter X
	 * @property {int} X
	 * @readOnly
	 */
	/**
	 * Alpha letter Y
	 * @property {int} Y
	 * @readOnly
	 */
	/**
	 * Alpha letter Z
	 * @property {int} Z
	 * @readOnly
	 */
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

	/**
	 * Number pad 1
	 * @property {int} num_1
	 * @readOnly
	 */
	/**
	 * Number pad 2
	 * @property {int} num_2
	 * @readOnly
	 */
	/**
	 * Number pad 3
	 * @property {int} num_3
	 * @readOnly
	 */
	/**
	 * Number pad 4
	 * @property {int} num_4
	 * @readOnly
	 */
	/**
	 * Number pad 5
	 * @property {int} num_5
	 * @readOnly
	 */
	/**
	 * Number pad 6
	 * @property {int} num_6
	 * @readOnly
	 */
	/**
	 * Number pad 7
	 * @property {int} num_7
	 * @readOnly
	 */
	/**
	 * Number pad 8
	 * @property {int} num_8
	 * @readOnly
	 */
	/**
	 * Number pad 9
	 * @property {int} num_9
	 * @readOnly
	 */
	/**
	 * Number pad 0
	 * @property {int} num_0
	 * @readOnly
	 */
	for(i = 96; i <= 105; ++i)
	{
		USLocale["num_" + (i-96)] = i;
	}
	/**
	 * Function key F1
	 * @property {int} F1
	 * @readOnly
	 */
	/**
	 * Function key F2
	 * @property {int} F2
	 * @readOnly
	 */
	/**
	 * Function key F3
	 * @property {int} F3
	 * @readOnly
	 */
	/**
	 * Function key F4
	 * @property {int} F4
	 * @readOnly
	 */
	/**
	 * Function key F5
	 * @property {int} F5
	 * @readOnly
	 */
	/**
	 * Function key F6
	 * @property {int} F6
	 * @readOnly
	 */
	/**
	 * Function key F7
	 * @property {int} F7
	 * @readOnly
	 */
	/**
	 * Function key F8
	 * @property {int} F8
	 * @readOnly
	 */
	/**
	 * Function key F9
	 * @property {int} F9
	 * @readOnly
	 */
	/**
	 * Function key F10
	 * @property {int} F10
	 * @readOnly
	 */
	/**
	 * Function key F11
	 * @property {int} F11
	 * @readOnly
	 */
	/**
	 * Function key F12
	 * @property {int} F12
	 * @readOnly
	 */
	for(i = 112; i <= 123; ++i)
	{
		USLocale["F" + (i - 111)] = i;
	}
	
	//OS specfic 'meta' key - pick ctrl or command
	if(os == "Mac")
	{
		//also create 'command' for people that only want command
		/**
		 * The command (Mac OSX) or ctrl (Windows) key
		 * @property {int} meta
		 * @readOnly
		 */
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
	
	var DOWN = 1;
	var REPEAT = 2;
	var UP = 3;
	
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

		/**
		 * The list of key names for scrolling control keys
		 * @property {Array} scrollKeys
		 * @private
		 */
		 this.scrollKeys = ['arrow_down', 'arrow_up', 'arrow_left', 'arrow_right', 'spacebar'];
		
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

		if (app.options.preventScrollingKeys)
			this.restrictScrollingKeys();
	};

	// Reference to the prototype
	var p = Keyboard.prototype;
	
	//=======
	//event type functions
	
	/**
	 * Adds a listener for keydown events on a specific key, when a key is first pressed down. The
	 * callback will be passed the key name, in case the same callback is used for multiple keys.
	 * @method addKeyDown
	 * @param {String|Array} keyName The name(s) of the key, from the locale, to listen for.
	 * @param {Function} callback The function to call when the key is first pressed.
	 * @param {Boolean} [preventDefault=false] If the key should have the default action prevented
	 *                                         while this listener is attached.
	 */
	p.addKeyDown = function(keyName, callback, preventDefault)
	{
		if (Array.isArray(keyName))
		{
			for(var i = 0; i < keyName.length; ++i)
				this.addKeyDown(keyName[i], callback, preventDefault);
			return;
		}
		
		var key = this._keysByName[keyName];
		if(!key)
		{
			if(Debug)
				Debug.warn("No key found with name '" + keyName + "'");
			return;
		}
		
		key.addListener(callback, DOWN, keyName, !!preventDefault);
	};
	
	/**
	 * Removes a listener for keydown events on a specific key.
	 * @method removeKeyDown
	 * @param {String|Array} keyName The name(s) of the key, from the locale, to listen for.
	 * @param {Function} callback The function to be removed from the listener list.
	 */
	p.removeKeyDown = function(keyName, callback)
	{
		if (Array.isArray(keyName))
		{
			for(var i = 0; i < keyName.length; ++i)
				this.removeKeyDown(keyName[i], callback, preventDefault);
			return;
		}
		
		var key = this._keysByName[keyName];
		if(key)
			key.removeListener(callback, DOWN);
	};
	
	/**
	 * Adds a listener for repeated keydown events on a specific key. The callback will be passed
	 * the key name, in case the same callback is used for multiple keys.
	 * @method addKeyRepeat
	 * @param {String|Array} keyName The name(s) of the key, from the locale, to listen for.
	 * @param {Function} callback The function to call when the key is first pressed.
	 * @param {Boolean} [preventDefault=false] If the key should have the default action prevented
	 *                                         while this listener is attached.
	 */
	p.addKeyRepeat = function(keyName, callback, preventDefault)
	{
		if (Array.isArray(keyName))
		{
			for(var i = 0; i < keyName.length; ++i)
				this.addKeyRepeat(keyName[i], callback, preventDefault);
			return;
		}
		
		var key = this._keysByName[keyName];
		if(!key)
		{
			if(Debug)
				Debug.warn("No key found with name '" + keyName + "'");
			return;
		}
		
		key.addListener(callback, REPEAT, keyName, !!preventDefault);
	};
	
	/**
	 * Removes a listener for repeated keydown events on a specific key.
	 * @method removeKeyRepeat
	 * @param {String|Array} keyName The name(s) of the key, from the locale, to listen for.
	 * @param {Function} callback The function to be removed from the listener list.
	 */
	p.removeKeyRepeat = function(keyName, callback)
	{
		if (Array.isArray(keyName))
		{
			for(var i = 0; i < keyName.length; ++i)
				this.removeKeyRepeat(keyName[i], callback, preventDefault);
			return;
		}
		
		var key = this._keysByName[keyName];
		if(key)
			key.removeListener(callback, REPEAT);
	};
	
	/**
	 * Adds a listener for keyup events on a specific key. The callback will be passed the key
	 * name, in case the same callback is used for multiple keys.
	 * @method addKeyUp
	 * @param {String|Array} keyName The name(s) of the key, from the locale, to listen for.
	 * @param {Function} callback The function to call when the key is released.
	 * @param {Boolean} [preventDefault=false] If the key should have the default action prevented
	 *                                         while this listener is attached.
	 */
	p.addKeyUp = function(keyName, callback, preventDefault)
	{
		if (Array.isArray(keyName))
		{
			for(var i = 0; i < keyName.length; ++i)
				this.addKeyUp(keyName[i], callback, preventDefault);
			return;
		}
		
		var key = this._keysByName[keyName];
		if(!key)
		{
			if(Debug)
				Debug.warn("No key found with name '" + keyName + "'");
			return;
		}
		
		key.addListener(callback, UP, keyName, !!preventDefault);
	};
	
	/**
	 * Removes a listener for keyup events on a specific key.
	 * @method removeKeyUp
	 * @param {String|Array} keyName The name(s) of the key, from the locale, to listen for.
	 * @param {Function} callback The function to be removed from the listener list.
	 */
	p.removeKeyUp = function(keyName, callback)
	{
		if (Array.isArray(keyName))
		{
			for(var i = 0; i < keyName.length; ++i)
				this.removeKeyUp(keyName[i], callback, preventDefault);
			return;
		}
		
		var key = this._keysByName[keyName];
		if(key)
			key.removeListener(callback, UP);
	};
	
	/**
	 * Sets if the default browser action should be prevented on a specific key. This is good
	 * for keys that are only checked with justPressed(), isDown(), and justReleased().
	 * @method setPreventDefaultOnKey
	 * @param {String|Array} keyName The name(s) of the key, from the locale, to listen for.
	 * @param {Boolean} preventDefault If the key should have the default action prevented.
	 */
	p.setPreventDefaultOnKey = function(keyName, preventDefault)
	{
		if (Array.isArray(keyName))
		{
			for(var i = 0; i < keyName.length; ++i)
				this.setPreventDefaultOnKey(keyName[i], preventDefault);
			return;
		}
		
		var key = this._keysByName[keyName];
		if(key)
			key.setManualPreventDefault(preventDefault);
	};

	/**
	 * Restricts the arrow keys and spacebar from scrolling the page.
	 * @method restrictScrollingKeys
	 */
	p.restrictScrollingKeys = function()
	{
		this.setPreventDefaultOnKey(this.scrollKeys, true);
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
		
		if (key)
		{
			var preventDefault = false;
			if(key.isDown)
			{
				key.trigger(REPEAT);
			}
			else
			{
				key.isDown = key.justDown = true;
				if(this._updatedKeys.indexOf(key) == -1)
					this._updatedKeys.push(key);
				key.trigger(DOWN);
				
				//handle combos
				for(i = this._activeCombos.length - 1; i >= 0; --i)
				{
					if(this._activeCombos[i].testKeyDown(ev.keyCode))
						preventDefault = true;
				}
			}
			if(key.shouldPreventDefault || preventDefault)
			{
				ev.preventDefault();
				return true;
			}
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
		if(key)
		{
			var preventDefault = false;
			if (key.isDown)
			{
				key.isDown = false;
				key.justUp = true;
				if(this._updatedKeys.indexOf(key) == -1)
					this._updatedKeys.push(key);
				key.trigger(UP);
				
				//handle combos
				for(var i = this._activeCombos.length - 1; i >= 0; --i)
				{
					if(this._activeCombos[i].testKeyUp(ev.keyCode))
						preventDefault = true;
				}
			}
			if(key.shouldPreventDefault || preventDefault)
			{
				ev.preventDefault();
				return true;
			}
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
		this.repeatListeners = [];
		this.downListeners = [];
		this.manualPreventDefault = false;
		this.shouldPreventDefault = false;
		
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
	
	p.setManualPreventDefault = function(preventDefault)
	{
		this.manualPreventDefault = preventDefault;
		if (preventDefault)
		{
			this.shouldPreventDefault = true;
		}
		else
		{
			preventDefault = false;
			var listenerList = [this.downListeners, this.repeatListeners, this.upListeners];
			for(var i = 0; i < listenerList.length && !preventDefault; ++i)
			{
				var listeners = listenerList[i];
				for(var index = listeners.length - 1; index >= 0; --index)
				{
					if(listeners[index] && listeners[index].preventDefault)
					{
						preventDefault = true;
						break;
					}
				}
			}
			this.shouldPreventDefault = preventDefault;
		}
	};
	
	p.addListener = function(listener, type, requestedName, preventDefault)
	{
		var listeners;
		switch(type)
		{
			case DOWN:
				listeners = this.downListeners;
				break;
			case REPEAT:
				listeners = this.repeatListeners;
				break;
			case UP:
				listeners = this.upListeners;
				break;
		}
		if(listeners.indexOf(listener) == -1)
			listeners.push(listener);
		if(this.preferredName != requestedName)
			this.preferredName = requestedName;
		listener.preventDefault = preventDefault;
		if(preventDefault)
		{
			this.shouldPreventDefault = true;
		}
	};
	
	p.removeListener = function(listener, type)
	{
		var listeners;
		switch(type)
		{
			case DOWN:
				listeners = this.downListeners;
				break;
			case REPEAT:
				listeners = this.repeatListeners;
				break;
			case UP:
				listeners = this.upListeners;
				break;
		}
		var index = listeners.indexOf(listener);
		if(index >= 0)
		{
			if(index < 1)
				listeners.shift();
			else
				listeners.splice(index, 1);
		}
		//see if we should clear the prevent default status
		this.setManualPreventDefault(this.manualPreventDefault);
	};
	
	p.trigger = function(type)
	{
		var listeners;
		switch(type)
		{
			case DOWN:
				listeners = this.downListeners;
				break;
			case REPEAT:
				listeners = this.repeatListeners;
				break;
			case UP:
				listeners = this.upListeners;
				break;
		}
		for(var i = 0; i < listeners.length; ++i)
		{
			listeners[i](this.preferredName);
		}
	};
	
	p.destroy = function()
	{
		this.codes = this.names = this.upListeners = this.repeatListeners =
			this.downListeners = null;
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

}());/**
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
	 * @class Application
	 */
	var plugin = new ApplicationPlugin();

	// Init the Keyboard
	plugin.setup = function()
	{
		/**
		 *	The locale to use for keycodes.
		 *	@property {Object} options.keyboardLocale
		 *	@default springroll.keyboard.USLocale
		 */
		this.options.add("keyboardLocale", USLocale, true);
		
		/**
		 *	The target DOM to listen to all keyboard events from.
		 *	@property {DOMElement|String} options.keyboardTarget
		 *	@default document
		 */
		this.options.add("keyboardTarget", null, true);

		this.options.add("preventScrollingKeys", false, true);
	};
	
	//not actually async, but needs to happen after App options have been done
	plugin.preload = function(done)
	{
		var options = this.options;

		options.asDOMElement("keyboardTarget");
		options.keepFocus = true;

		var target = options.keyboardTarget || document;
		var locale = options.keyboardLocale || USLocale;
		
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