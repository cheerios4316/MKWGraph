# Hello :D
## What is this
This is an HTML page that runs on plain JS and Chart.JS that I made in a couple hours to track my progress as I get better at Mario Kart Wii.

## How to use
Clone the repo and edit `data/pb_data.js` with your data, then launch `index.html` in your browser of choice.
## Clean setup (optional)
`main.js` was designed to be easily implemented into any HTML page (if, for some reason, you need such a thing).
### What you need
In order to run the basic graph, you need to:

 1. Include `main.js`, `data/pb_data` and Chart.JS in your HTML page:
```
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="data/pb_data.js"></script>
<script src="./script/main.js"></script>
```
2. Create at least two empty `<select>` elements and give them an id:
```
<select id='cupSelect'></select>
<select id='circuitSelect'></select>
```
3. Create a `<canvas>` element and give it an id:
```
<canvas id='chart'></canvas>
```
4. Inside a `<script>` tag, create an object that holds information about at least two `<select>` elements:
```
const selects = [
	{
		id: 'cupSelect',
		type: 'cup'
	},
	{
		id: 'circuitSelect',
		type: 'circuit'
	}
]
```
`type` property can be either `'cup'` or '`circuit'`.

5. Finally, call these two functions passing as an argument the canvas' id and the array you defined earlier, respectively:
```
initChart('chart')
initSelect(selects)
```

That's it!
