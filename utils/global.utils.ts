export const getDateLocaleString = (date = new Date()) => {
    return new Date(date).toLocaleString('pl-PL')
}

export const transformDate = (date: Date) => {
    return getDateLocaleString(date).replaceAll('/', '.')
}
