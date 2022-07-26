type RequestOptions = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    data?: any;
};

export class RequestError extends Error {
    code: number;

    constructor(error: {code: number; message: string}) {
        super();

        this.code = error.code;
        this.message = error.message;
    }
}

export default async function request(payload: RequestOptions) {
    const {url, method = 'GET', data, headers = {}} = payload;

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(headers || {})
        },
        ...(!!data ? {body: JSON.stringify(data)} : {})
    });

    const result = await response.json();

    if (!response.ok) {
        if (typeof result === 'object') {
            throw new RequestError({
                code: result.code || response.status,
                message: result.message || response.statusText
            });
        }

        throw new RequestError({
            code: response.status,
            message: response.statusText
        });
    }

    return result;
}
