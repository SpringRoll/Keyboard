/**
 * @namespace springroll.keyboard
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