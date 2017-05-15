<img
    src="https://github.com/lemilonkh/faraway-server/raw/master/logo.png"
    width="500px" height="500px" />

# FarAway Server
Server backend and procedural generation tools for the game FarAway by YourWorstFriend

## Installation
1. Install NodeJS (you know what to do)
2. Install pomelo:\
   `sudo npm i -g pomelo` (GNU/Linux || OSX) ||\
   `npm i -g pomelo` (Windows)
3. Clone this repository: `git clone git@github.com:lemilonkh/faraway-server.git`
4. `cd faraway-server`
5. `sh npm-install.sh` (GNU/Linux; OSX) `||`\
   `npm-install.bat`   (Windows)

### Run
Start the game server:
```bash
cd game-server
npm start [OR] pomelo start
```

Start the web server:
```bash
cd web-server
npm start [OR] pomelo start
```

### Test the ProcGen pipeline on the command line
```bash
cd game-server
npm run procgen
xdg-open ../exaples/output_[...].png # for GNU/Linux
```

[OR]

```bash
cd game-server/procgen
node world.js > myFile.png
```

## Examples
#### Simplex noise
![Simplex noise](/examples/simplex.png?raw=true)

#### Fractal noise
![Fractal noise](/examples/fractal.png?raw=true)

#### Combined, with index as channel
![Combined, with index as channel](/examples/threechannel.png?raw=true)
