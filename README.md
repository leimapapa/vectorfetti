# vectorfetti
An SVG-based confetti plugin that allows you to make confetti appear on button click

![vectorfetti.png](vectorfetti.png)

## Dependencies

* None!


## Usage

```javascript
confetti(elt, {options});

confetti(document.querySelector('#myElement'), {
  	// these are the default values if you pass in no options
  	colors: 'random', // can also pass in an array of colors (ex. ['#ff0000', '#00ff00', '#0000ff']) 
	delay: 100, // how long before the confetti appears
	drop: window.innerHeight, // y axis spread (can be numbers.. - ex. 400)
	fadeout: true, // adds a fade effect that hides the edges of the SVG
	flakes: 100, // total pieces of confetti
	speed: 6000, // from population to removal from page
	spin: true, // rotate confetti around its center as it falls
	spread: 400, // x axis spread
	type: 'default' // 'default', 'xo', 'code', 'circle', 'flower', 'square', 'rect'
})
```

## CDN
https://cdn.jsdelivr.net/gh/leimapapa/vectorfetti/vectorfetti.min.js

## Working Example
[codepen example](https://codepen.io/leimapapa/pen/mdLJZPJ)
