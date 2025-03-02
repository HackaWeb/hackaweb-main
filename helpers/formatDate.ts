export const formatDateTime = (date: Date) => {
    const formattedDate = date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return `${formattedDate}, ${formattedTime}`;
};
