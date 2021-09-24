import { getTimeComponents } from "./utils";

class CountdownTimer {
    #timer;
    #days;
    #hours;
    #mins;
    #secs;
    #targetDate;
    #intervalId = null;
    #isActive = false;

    constructor({ selector, targetDate }) {
        this.#timer = document.getElementById(selector);
        this.#days = document.querySelector('[data-value="days"]');
        this.#hours = document.querySelector('[data-value="hours"]');
        this.#mins = document.querySelector('[data-value="mins"]');
        this.#secs = document.querySelector('[data-value="secs"]');
        this.#targetDate = targetDate;
        this.init();
    }

    start() {
        if (this.#isActive) return;
        this.#isActive = true;

        this.#intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = (currentTime - this.#targetDate) * -1;
            const { days, hours, mins, secs } = getTimeComponents(deltaTime);
            this.updateClockface({ days, hours, mins, secs });
        }, 1000);
    }

    stop() {
        if (this.#intervalId) {
            clearInterval(this.#intervalId);
            this.#intervalId = null;
            this.#isActive = false;
            const { days, hours, mins, secs } = getTimeComponents(this.#targetDate - Date.now());
            this.updateClockface({ days, hours, mins, secs });
        }
    }

    init() {
        this.updateClockface(getTimeComponents(this.#targetDate - Date.now()));
    }

    updateClockface({ days, hours, mins, secs }) {
        this.#days.textContent = days;
        this.#hours.textContent = hours;
        this.#mins.textContent = mins;
        this.#secs.textContent = secs;
    }

}

new CountdownTimer({
    selector: '#timer-1',
    //   targetDate: new Date('Jul 17, 2019'),
    targetDate: new Date('Oct 18, 2021'),
}).start();
