// world.js
// (c) 2017 by Milan Gruner

// constants
var SEED = 1337;
var WIDTH = 500;
var HEIGHT = 500;

// imports
var Alea = require('alea'); // PRNG
var SimplexNoise = require('simplex-noise');
var FractalNoise = require('fractal-noise');
var zeros = require('zeros');
var savePixels = require('save-pixels');

// init generators
var random = new Alea(SEED);
var simplex = new SimplexNoise(random);

// for future reference: read and save Alea state with:
// Alea.importState(state)
// random.exportState()

// time to make some fractal noise (non-continuous)
/*var noiseRect = FractalNoise.makeRectangle(WIDTH, HEIGHT, simplex.noise2D, {
	amplitude: 0.85,
	frequency: 4.0,
	octaves: 8,
	persistence: 0.65
});*/

function fakeNoise2D(x, y) {
	return (x + y) / (WIDTH + HEIGHT);
}

var noiseRect = FractalNoise.makeRectangle(WIDTH, HEIGHT, fakeNoise2D, {
	amplitude: 0.85,
	frequency: 4.0,
	octaves: 8,
	persistence: 0.65
});

// encode noiseRect as linear ndarray
var imageArray = zeros([HEIGHT, WIDTH]);
for(var y = 0; y < HEIGHT; y++) {
	for(var x = 0; x < WIDTH; x++) {
		imageArray.set(x, y, noiseRect[y][x]);
	}
}

// encode as PNG and write to standard output (shell)
var channels = 1; // TODO add multiple noise functions in different channels
// console.log("Image array:", imageArray);
savePixels(imageArray, "png").pipe(process.stdout);
