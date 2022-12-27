export const setTheme = (theme) => {
    localStorage.setItem('isDark', theme)
}

export const getTheme = () => {
    const theme = localStorage.getItem('isDark')
    return JSON.parse(theme);
}