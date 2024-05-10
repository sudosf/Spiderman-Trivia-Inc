export const escapeHTML = (str) => {
    if (typeof str == 'string') {
        return str.replace(/[&<>"']/g, function (match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            }[match];
        });
    }
    return 'there';
};

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);

    let parsedItem;
    try {
        parsedItem = item ? JSON.parse(item) : null;
    } catch (error) {
        parsedItem = item;
    }

    return parsedItem;
}

export function isLocalStorageItemPresent(key) {
    return localStorage.getItem(key) !== null;
}
