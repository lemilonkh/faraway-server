// world.js
// (c) 2017 by Milan Gruner

// constants
var SEED = 1337;
var WIDTH = 500;
var HEIGHT = 500;

// imports
var Alea = require('alea'); // PRNG
var FastSimplexNoise = require('fast-simplex-noise');
var FractalNoise = require('fractal-noise');
var zeros = require('zeros');
var savePixels = require('save-pixels');

// init generators
var random = new Alea(SEED);
var noise = new FastSimplexNoise({
	frequence: 0.01,
	max: 255,
	min: 0,
	octaves: 8
});

// for future reference: read and save Alea state with:
// Alea.importState(state)
// random.exportState()

function fastSimplex(x, y) {
	return noise.scaled([x, y]);
}

// time to make some fractal noise (non-continuous)
var noiseRect = FractalNoise.makeRectangle(WIDTH, HEIGHT, fastSimplex, {
	amplitude: 0.85,
	frequency: 4.0,
	octaves: 8,
	persistence: 0.65
});

// encode noiseRect and FastSimplexNoise as linear ndarrays
var fractalImage = zeros([HEIGHT, WIDTH]);
var simplexImage = zeros([HEIGHT, WIDTH]);

for(var y = 0; y < HEIGHT; y++) {
	for(var x = 0; x < WIDTH; x++) {
		fractalImage.set(x, y, noiseRect[y][x]);
		simplexImage.set(x, y, fastSimplex(x, y));
	}
}

// encode as PNG and write to standard output (shell)
var channels = 1; // TODO add multiple noise functions in different channels
// console.log("Image array:", imageArray);
savePixels(imageArray, "png").pipe(process.stdout);
