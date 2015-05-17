/**
 * @namespace cloudkid
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
	*  @param {Object} locale The keyboard locale, like cloudkid.USLocale, which defines keys to
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
		
		key.addListener(callback, true, keyName, !!preventDefault);
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
			key.addListener(callback, true);
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
		
		key.addListener(callback, false, keyName, !!preventDefault);
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
			key.addListener(callback, false);
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
	 * Creates a key combination. NOTE: this feature has not yet been completed.
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
			combo = new Combo(name, preventDefault, this._keysByName);
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
	 * <code>null</code>.
	 * @method detectNextKey
	 * @param {Function} callback The function to be called when a key is pressed.
	 * @param {String} [cancelKey="esc"] The name of the key to cancel the listener. If explictly
	 *                                   passed <code>null</code>, then the "esc" key can be
	 *                                   detected and this action can only be cancelled with
	 *                                   stopDetecting().
	 */
	p.detectNextKey = function(callback, cancelKey)
	{
		if(cancelKey === undefined)
			cancelKey = this._keysByName.esc;
		else if(cancelKey)
			cancelKey = this._keysByName[cancelKey];
		
		this.detectKeyCallback = callback;
		this.detectCancelKey = cancelKey || null;
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
		
		if(this.detectKeyCallback)
		{
			var callback = this.detectKeyCallback;
			this.detectKeyCallback = null;
			
			if(key && key == this.detectCancelKey)
			{
				callback(null);
			}
			else
			{
				//because we are detecting the next key pressed, we should create
				//a new key - this feature is largely for creating keybindings, and it's probable
				//we aren't expecting all keycodes
				if(!key)
				{
					key = new Key(ev.keyCode, "key_" + ev.keyCode);
					this._keysByCode[ev.keyCode] = key;
					this._keysByName[key.name] = key;
				}
				callback(key.preferredName);
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
			
			for(var i = this._activeCombos.length - 1; i >= 0; --i)
			{
				if(this._activeCombos.testKey(key.code))
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
			
			//TODO: handle combos?
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
	namespace('cloudkid').Keyboard = Keyboard;
	
	
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
		
		//TODO: use regex & keysByNameRef to generate steps
	};
	
	p = Combo.prototype;
	
	//key is a keycode
	p.testKey = function(key)
	{
		//TODO: check key against current step
		//TODO: Trigger combo on own when complete
		//TODO: return a value if the combo was successful and the event default should be prevented
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