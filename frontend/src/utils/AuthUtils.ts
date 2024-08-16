import {getTokenFromLocalStorage} from "./LocalStorageUtils";

const isAuthenticated = () : boolean => !!getTokenFromLocalStorage();


export { isAuthenticated };