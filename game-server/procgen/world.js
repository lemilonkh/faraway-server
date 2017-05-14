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
var noise = new FastSimplexNoise.default({
	random: random,
	frequence: 8,
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
var channels = 3; // DONE add multiple noise functions in different channels
var resultImage = zeros([HEIGHT, WIDTH, channels]);

for(var y = 0; y < HEIGHT; y++) {
	for(var x = 0; x < WIDTH; x++) {
		//resultImage.set(x, y, 0, noiseRect[y][x]);
		resultImage.set(x, y, 1, fastSimplex(x, y));
		//resultImage.set(x, y, 2, (x+y)/(WIDTH+HEIGHT));
	}
}

// encode as PNG and write to standard output (shell)
// console.log("Image array:", imageArray);
savePixels(resultImage, "png").pipe(process.stdout);
