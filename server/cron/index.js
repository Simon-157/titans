import each from 'lodash/each';

function Cron(interval = 60 * 1000) {
  const schedules = [];

  function tick() {
    each(schedules, (job, index) => {
      if (!job) {
        return;
      }

      const ts = Math.round((new Date()).getTime() / 1000);

      if (ts >= job.unixTime) {
        job.fn();

        schedules.splice(index, 1);
      }
    });
  }

  setInterval(tick, interval);

  this.addScheduleJob = function addScheduleJob(unixTime, fn) {
    schedules.push({
      fn,
      unixTime,
    });
  };
}

export default new Cron();
