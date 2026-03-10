const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

const tryParseJson = (text: string) => {
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
};

const getErrorMessageFromResponse = async (response: Response) => {
    const text = await response.text().catch(() => '');
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        const parsed = tryParseJson(text);
        if (parsed && typeof parsed === 'object' && 'message' in parsed && typeof (parsed as any).message === 'string') {
            return (parsed as any).message as string;
        }
    }

    return text || `Request failed (${response.status})`;
};

const parseJsonResponse = async (response: Response) => {
    const text = await response.text().catch(() => '');
    if (!text) return null;

    const parsed = tryParseJson(text);
    if (parsed !== null) return parsed;

    throw new Error(text);
};

export const submitRegistration = async (data: any) => {
    const response = await fetch(`${API_URL}/campaign/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessageFromResponse(response));
    }

    return parseJsonResponse(response);
}

export const getDashboardSummary = async () => {
    const response = await fetch(`${API_URL}/campaign/summary`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessageFromResponse(response));
    }

    return parseJsonResponse(response);
}

export const getAllRegistrations = async (params: any) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/campaign/registration/all?${query}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessageFromResponse(response));
    }

    return parseJsonResponse(response);
}

export const updateEligibility = async (id: number) => {
    const response = await fetch(`${API_URL}/campaign/registration/eligibility`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessageFromResponse(response));
    }

    return parseJsonResponse(response);
}

export const sendManualEmail = async (id: number) => {
    const response = await fetch(`${API_URL}/campaign/registration/send-email`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessageFromResponse(response));
    }

    return parseJsonResponse(response);
}

export const exportRegistrations = async (params: any) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/campaign/registration/export?${query}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessageFromResponse(response));
    }

    return response.blob();
}
