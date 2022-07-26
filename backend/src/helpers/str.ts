export function trim(str = '', char = ' ') {
    while (str.charAt(0) === char) {
        str = str.substring(1);
    }

    while (str.charAt(str.length - 1) === char) {
        str = str.substring(0, str.length - 1);
    }

    return str;
}

export function stripSlashes(name = '') {
    return name.replace(/^(\/*)|(\/*)$/g, '');
}

export function toUpper(str = '') {
    return str.toUpperCase();
}

export function toLower(str = '') {
    return str.toLowerCase();
}

export function firstUpper(str = '') {
    return toUpper(str.toString()[0]) + str.toString().slice(1);
}

export function firstUpperAll(str = '') {
    return str
        .split(' ')
        .map(s => toUpper(s.toString()[0]) + s.toString().slice(1))
        .join(' ');
}

export function camelcaseToHyphen(str = '') {
    return toLower(str.replace(/([a-z])([A-Z])/g, '$1-$2'));
}

/**
 * Escapes characters in the string that are not safe to use in a RegExp.
 *
 * from https://github.com/google/closure-library/blob/master/closure/goog/string/string.js#L1148
 */
export function escapeRegExp(s: string) {
    return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
}
