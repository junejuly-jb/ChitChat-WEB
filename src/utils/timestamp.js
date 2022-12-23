export const shouldShowTimestamp = (previous, msg) => {
    const first = !previous;

    if(first) return false;

    let diffs = Math.abs(new Date(previous.createdAt) - new Date(msg.createdAt));
    const diffmins = diffs / 1000;

    return diffmins > 300;
}