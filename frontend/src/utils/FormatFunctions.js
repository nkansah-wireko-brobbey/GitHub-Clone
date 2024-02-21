export function formatMemberSince(dateString){
    const options  = {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }
    return new Date(dateString).toLocaleDateString("en-US", options);
}