//todo: what is the name of this pattern? (Factory)

class Sound {
    constructor(soundPaths) {
        var counter = 0;
        for (var soundName in soundPaths) {
            counter++;
            this[soundName] = this._createAudioFile(soundPaths[soundName]);
            console.log(`created new sound of ${soundName}.`);
        }
        console.log(`Audio class have created successfully ${counter} sounds.`);
    }

    _createAudioFile(path) {
        const audio = new Audio();
        audio.src = path;
        return audio;
    }

    play(sound) {
        this[sound].play();
    }
}