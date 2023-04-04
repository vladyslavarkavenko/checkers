export const getValue = (key) => {
    let value = localStorage.getItem(key);
    try {
        value = JSON.parse(value);
    } catch (err) {
        console.error("Was not bale to parse value as Json", {key, value});
    }
    return value;
}

export const setValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const delValue = (key) => {
    localStorage.removeItem(key);
}