export const getTokenFromLocalStorage = () : string => {
    const token = localStorage.getItem('jwt');
    return token || '';
}

export const setTokenInLocalStorage = (token: string) => {
    localStorage.setItem('jwt', token);
}