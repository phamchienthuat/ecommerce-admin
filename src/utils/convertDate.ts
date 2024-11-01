export function formatYMD (dateStr: string){
    const todayDate = new Date(dateStr);

    const formattedDateTime = `${String(todayDate.getDate()).padStart(2, '0')}/${
        String(todayDate.getMonth() + 1).padStart(2, '0')}/${todayDate.getFullYear()} ${
        String(todayDate.getHours()).padStart(2, '0')}:${
        String(todayDate.getMinutes()).padStart(2, '0')}:${
        String(todayDate.getSeconds()).padStart(2, '0')}`;
    
    return formattedDateTime
}