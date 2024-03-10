const timeFormat = (mongoDate) => {
    const date = new Date(mongoDate);
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
export default timeFormat;