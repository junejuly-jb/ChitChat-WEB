export const convertTime = (time) => {
    let then = new Date(time)
    let now = new Date();

    const msBetweenDates = Math.abs(then.getTime() - now.getTime());

    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    const options = {
        ...( hoursBetweenDates > 24 && {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        }),
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return then.toLocaleString('en-US', options)
}