export const historyDate = () => {
    const endDate: number = Math.floor(Date.now() / 1000);
    const startDate: number = endDate - 60 * 60 * 24 * 7 * 2;
    return { startDate, endDate }
}