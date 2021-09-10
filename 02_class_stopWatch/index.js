const myWatch = document.getElementById('stop-watch');

function secondsToTime(seconds) {
  const s = `0${seconds % 60}`.slice(-2);
  const m = `0${Math.floor(seconds / 60)}`.slice(-2);
  return `${m}:${s}`;
}

const btnAddMore = document.getElementById('addMore');
btnAddMore.addEventListener('click', () => {
  const newStopWatch = new StopWath();
  myWatch.appendChild(newStopWatch.$container);
});

class StopWath {
  counter = 0;
  counterIntervalId;

  $container;
  $txtTime;
  $btnStart;
  $btnPause;

  constructor() {
    this.$container = document.createElement('div');

    this.$txtTime = document.createElement('span');
    this.$txtTime.innerHTML = '00:00';

    this.$btnStart = document.createElement('button');
    this.$btnStart.innerHTML = 'Start';
    this.$btnStart.addEventListener('click', this.handleStart);

    this.$btnPause = document.createElement('button');
    this.$btnPause.innerHTML = 'Pause';
    this.$btnPause.addEventListener('click', this.handlePause);

    this.$container.appendChild(this.$txtTime);
    this.$container.appendChild(this.$btnStart);
    this.$container.appendChild(this.$btnPause);
  }

  handleStart = () => {
    if (!this.counterIntervalId)
      this.counterIntervalId = setInterval(() => {
        this.counter++;
        this.$txtTime.innerHTML = secondsToTime(this.counter);
      }, 1000);
  };

  handlePause = () => {
    clearInterval(this.counterIntervalId);
    this.counterIntervalId = undefined;
  };
}
