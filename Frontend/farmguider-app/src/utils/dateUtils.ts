export const removeTimezoneAndSeconds = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return new Date(Date.UTC(year, month, day, hours, minutes));
};