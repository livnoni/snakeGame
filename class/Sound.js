//todo: what is the name of this pattern?

class Sound {
    constructor(soundPath) {
        var counter = 0;
        for (var soundName in soundPath) {
            counter++;
            this[soundName] = this._createAudioFile(soundPath[soundName]);
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