export default (time: number = 100): Promise<void> => new Promise(
    resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
