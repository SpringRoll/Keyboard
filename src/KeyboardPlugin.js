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