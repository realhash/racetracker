export const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(+year, +month - 1, +day);
    const formattedDate = new Intl.DateTimeFormat('da-DK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
    return formattedDate.replace(/(\d{1,2})\s/, '$1. '); 
};