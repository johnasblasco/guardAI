// src/services/api.ts
import type {
    HealthReport,
    DashboardStats,
    HotspotData,
    PredictionData,
    SuggestedAction,
    BayesianParameter,
    Location,
    Symptom
} from '@/types/index';

// 1. Configuration
const API_URL = 'http://localhost:5000/api';

// 2. Generic Request Handler (Handles errors & JSON parsing automatically)
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `API Error: ${response.statusText}`);
    }

    return response.json();
}

// 3. The API Object
export const api = {

    // --- Student Features ---
    reports: {
        /** Submit a new sickness report */
        submit: (data: Omit<HealthReport, 'id' | 'userId' | 'timestamp' | 'status'>) =>
            request<HealthReport>('/reports', {
                method: 'POST',
                body: JSON.stringify(data),
            }),

        /** Get my history (persists on reload because it fetches fresh from DB) */
        getMyHistory: () =>
            request<HealthReport[]>('/reports/me'),


        /** Admin: Fetch ALL reports */
        getAll: () => request<HealthReport[]>('/reports'),


        /** Admin: Update report status */
        updateStatus: (id: string, status: string) =>
            request<HealthReport>(`/reports/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            }),
    },

    resources: {
        /** Fetch dynamic locations (Buildings -> Rooms) */
        getLocations: () =>
            request<Location[]>('/resources/locations'),

        /** Fetch available symptoms */
        getSymptoms: () =>
            request<Symptom[]>('/resources/symptoms'),
    },

    // --- Admin Features ---
    dashboard: {
        /** Get ALL dashboard data in one call (Fast load) */
        getAllData: () =>
            request<{
                stats: DashboardStats;
                hotspots: HotspotData[];
                predictions: PredictionData[];
                actions: SuggestedAction[];
                bayesian: BayesianParameter;
            }>('/dashboard'),

        /** Update an action status (Start/Complete) */
        updateAction: (id: string, status: 'pending' | 'in-progress' | 'completed') =>
            request<SuggestedAction>(`/dashboard/actions/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            }),

    }
};