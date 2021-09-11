const myWatch = document.getElementById('stop-watch');

function secondsToTime(seconds) {
  const s = `0${seconds % 60}`.slice(-2);
  const m = `0${Math.floor(seconds / 60)}`.slice(-2);
  return `${m}:${s}`;
}

const stopWatchList = [];
const btnAddMore = document.getElementById('add-more');
btnAddMore.addEventListener('click', () => {
  const newStopWatch = new StopWath();
  stopWatchList.push(newStopWatch);
  myWatch.appendChild(newStopWatch.$container);
});

const btnStartAll = document.getElementById('start-all');
btnStartAll.addEventListener('click', () => {
  stopWatchList.forEach((item) => {
    item.handleStart();
  });
});

const btnPauseAll = document.getElementById('pause-all');
btnPauseAll.addEventListener('click', () => {
  stopWatchList.forEach((item) => {
    item.handlePause();
  });
});

const btnStopAll = document.getElementById('stop-all');
btnStopAll.addEventListener('click', () => {
  stopWatchList.forEach((item) => {
    item.handleStop();
  });
});

class StopWath {
  counter = 0;
  counterIntervalId;

  $container;
  $txtTime;
  $btnStart;
  $btnPause;
  $btnStop;

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

    this.$btnStop = document.createElement('button');
    this.$btnStop.innerHTML = 'Stop';
    this.$btnStop.className = 'btn-stop-item';
    this.$btnStop.addEventListener('click', this.handleStop);

    this.$container.appendChild(this.$txtTime);
    this.$container.appendChild(this.$btnStart);
    this.$container.appendChild(this.$btnPause);
    this.$container.appendChild(this.$btnStop);
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

  handleStop = () => {
    this.$txtTime.innerHTML = '00:00';
    clearInterval(this.counterIntervalId);
    this.counterIntervalId = undefined;
    this.counter = 0;
  };
}
