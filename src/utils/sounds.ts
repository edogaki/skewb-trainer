import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";

const correctAudio = new Audio(correctSound);
correctAudio.load();
const wrongAudio = new Audio(wrongSound);
wrongAudio.load();

class SoundBase {
    audioObj: HTMLAudioElement;
    constructor(url: string) {
        this.audioObj = new Audio(url);
        this.audioObj.load();
    }
    play() {
        if (this.audioObj.paused) {
            this.audioObj.play();
        } else {
            this.audioObj.currentTime = 0;
        }
    }
}

const Sound = {
    correct: new SoundBase(correctSound),
    wrong: new SoundBase(wrongSound),
} as const;


export {
    Sound
}