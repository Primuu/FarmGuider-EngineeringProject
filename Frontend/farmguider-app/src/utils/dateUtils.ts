import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";

export const MAX_DATE = new Date(8640000000000000);

export const removeTimezoneAndSeconds = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return new Date(Date.UTC(year, month, day, hours, minutes));
};

export const normalizeDate = (date: Date | null) => {
    return date ? new Date(date.setHours(1, 0, 0, 0)) : null;
}

export const formatDateTime = (givenDate: Date): string => {
    const date = new Date(givenDate);
    const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const formattedTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return `${formattedDate} ${formattedTime}`;
}

export const formatDate = (givenDate: Date): string => {
    const date = new Date(givenDate);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

export const formatYear = (date: Date) => {
    return date ? new Date(date).getFullYear().toString() : '';
};

export const formatTimeInSeconds = (seconds: number | null): string => {
    if (seconds == null) return '-';

    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (minutes == 0 && secs == 0) return '-';

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secs).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}

export const convertToSeconds = (time: string): number => {
    const parts = time.split(':').map(Number);

    let minutes = 0;
    let seconds = 0;

    if (parts.length === 2) {
        [minutes, seconds] = parts;
    } else if (parts.length === 1) {
        seconds = parts[0];
    }

    return (minutes * 60) + seconds;
};

export const convertToMinuteAndSecondsFormat = (seconds: number | null): string | null => {
    if (seconds == null) return null;

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secs).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}

export const isDateInLactationPeriods = (date: Date, lactationPeriods: LactationPeriodResponseDTO[]) => {
    return lactationPeriods.some(period => {
        const normalizedDate = normalizeDate(date)!;
        const startDate = new Date(period.startDate);
        const endDate = period.endDate ? new Date(period.endDate).setHours(23, 59, 59, 999) : MAX_DATE;

        return normalizedDate >= startDate && normalizedDate <= endDate;
    });
};
