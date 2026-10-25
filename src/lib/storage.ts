import { useState } from 'preact/hooks';

// The AngularJS version used ngStorage, which saved each key as JSON under
// this prefix. Keeping the same keys means existing saved data carries over.
const PREFIX = 'ngStorage-';

function read<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(PREFIX + key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch {
        return fallback;
    }
}

function write<T>(key: string, value: T) {
    try {
        if (value === undefined) {
            localStorage.removeItem(PREFIX + key);
        } else {
            localStorage.setItem(PREFIX + key, JSON.stringify(value));
        }
    } catch {
        // storage unavailable (private mode, quota); keep working in memory
    }
}

/**
 * useState that persists to localStorage. Setting undefined removes the key.
 */
export function useStoredState<T>(key: string, fallback: T): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(() => read(key, fallback));

    function set(next: T) {
        write(key, next);
        setValue(next);
    }

    return [value, set];
}
