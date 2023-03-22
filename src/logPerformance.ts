// @ts-nocheck
export function logPerformance(label : string) : void {
    window.startTime = window.startTime ?? 0;
    const elapsedTime = performance.now() - window.startTime;
    const elapsedTimeRounded = (Math.round(elapsedTime * 10) / 10).toFixed(1);

    window.times = window.times === undefined ? elapsedTimeRounded : window.times + ',' + elapsedTimeRounded;
    window.timesLabels = window.timesLabels === undefined ? label : window.timesLabels + ',' + label;

    console.log(window.timesLabels + '\n' + window.times);
}
