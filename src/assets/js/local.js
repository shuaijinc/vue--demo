
export function setItem(name, data) {
    return localStorage.setItem(name, data);
}

export function getItem(data) {
    return localStorage.getItem(data);
}

export function removeItem(data) {
    return localStorage.removeItem(data);
}

export function setCookie(key, value, time) {
    let now = new Date();
    now.setTime(now.getTime() + time * 24 * 60 * 60 * 1000);
    let data = key + "=" + value + ";" + "expires" + "=" + now.toGMTString()
    return document.cookie = data;
}

export function getCookie() {
    return document.cookie
}