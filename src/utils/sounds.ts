import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";

const correctAudio = new Audio(correctSound);
correctAudio.load();
const wrongAudio = new Audio(wrongSound);
wrongAudio.load();

class SoundBase {
    audioObj: HTMLAudioElement;
    isMuted: boolean;
    constructor(url: string, isMuted: boolean = false) {
        this.audioObj = new Audio(url);
        this.audioObj.load();
        this.isMuted = isMuted;
    }
    play() {
        if (this.isMuted) {
            if (this.audioObj.paused) {
                // do nothing
            } else {
                this.audioObj.pause();
            }
        } else {
            if (this.audioObj.paused) {
                this.audioObj.play();
            } else {
                this.audioObj.currentTime = 0;
            }
        }
    }
    setIsMuted(isMuted: boolean) {
        this.isMuted = isMuted;
    }
}

const Sound = {
    correct: new SoundBase(correctSound),
    wrong: new SoundBase(wrongSound),
} as const;

function setIsMuted(isMuted: boolean) {
    for (const sound of Object.values(Sound)) {
        sound.setIsMuted(isMuted);
    }
}



export {
    Sound,
    setIsMuted,
}