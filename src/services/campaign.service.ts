const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
    }

    return response.json();
}

export const getDashboardSummary = async () => {
    const response = await fetch(`${API_URL}/campaign/summary`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch summary');
    }

    return response.json();
}

export const getAllRegistrations = async (params: any) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/campaign/registration/all?${query}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch registrations');
    }

    return response.json();
}

export const updateEligibility = async (id: number) => {
    const response = await fetch(`${API_URL}/campaign/registration/eligibility`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error('Failed to update eligibility');
    }

    return response.json();
}

export const sendManualEmail = async (id: number) => {
    const response = await fetch(`${API_URL}/campaign/registration/send-email`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error('Failed to send email');
    }

    return response.json();
}

export const exportRegistrations = async (params: any) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/campaign/registration/export?${query}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to export registrations');
    }

    return response.blob();
}
