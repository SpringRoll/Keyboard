Keyboard is a plugin for [SpringRoll](http://github.com/SpringRoll/SpringRoll). It is designed to make working with the keyboard outside of text editing easier. Keyboard has capabilities for detecting key presses and releases, tracking pressed keys, custom key binding, and complex key combinations.

##Installation

Keyboard can be installed using Bower.

```bash
bower install springroll-keyboard
```

##Examples

To test the examples, run the grunt task `examples`. This will download any dependencies and automatically launch the examples in your browser.

```bash
grunt examples
```

##Usage

Include keyboard.min.js in your libraries js or html, after SpringRoll's core.min.js.
After the Application is created, access the Keyboard instance with Application.instance.keyboard.

Key combo syntax:

```javascript
// Whitespace is required around the '+' and '>' separators.
// '+' separates simultaneous keys
"ctrl + s";
// '>' separates sequential keys
"arrow_up > arrow_down";
// escape '>' and '+' with '\' character, although standard US keyboards don't have those
// characters without using shift and another key
"\\+ + \\>";
// sequential steps can have multiple simultaneous keys
"ctrl + x > ctrl + v";
```

##License

Copyright (c) 2015 [CloudKid](http://github.com/cloudkidstudio)

Released under the MIT License.
