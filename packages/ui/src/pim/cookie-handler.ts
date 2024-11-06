interface CookieOptions {
    expires?: string | Date;
    expires_in?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
    if (typeof document === 'undefined') return;

    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
        const expires = options.expires instanceof Date ? options.expires : new Date(options.expires);
        cookieStr += `; expires=${expires.toUTCString()}`;
    }

    if (options?.expires_in) {
        const expires = new Date(Date.now() + options.expires_in * 1000);
        cookieStr += `; expires=${expires.toUTCString()}`;
    }

    if (options.path) {
        cookieStr += `; path=${options.path}`;
    }
    else {
        cookieStr += `; path=/`;
    }

    if (options.domain) {
        cookieStr += `; domain=${options.domain}`;
    }

    if (options.secure) {
        cookieStr += `; secure`;
    }

    if (options.sameSite) {
        cookieStr += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieStr;
};

export const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;

    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
        }
    }

    return null;
};

export const removeCookie = (name: string): void => {
    if (typeof document === 'undefined') return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const getAllCookies = (): { [key: string]: string } | null => {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const result: { [key: string]: string } = {};

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        const [name, value] = cookie.split('=');
        if (name) {
            result[decodeURIComponent(name)] = decodeURIComponent(value);
        }
    }

    return result;
};

