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