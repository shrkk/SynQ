const BASE_URL = 'http://localhost:8000/api';

export interface DashboardSummary {
    total_sales: number;
    total_transactions: number;
    low_stock_item_count: number;
    top_selling_item: string | null;
    new_transactions?: number;
}

export interface IngestResponse {
    status: string;
    new_transactions: number;
}

export interface ChatResponse {
    response: string;
}

export const api = {
    ingest: async (): Promise<IngestResponse> => {
        const res = await fetch(`${BASE_URL}/ingest`, { method: 'POST' });
        if (!res.ok) throw new Error('Ingest failed');
        return res.json();
    },

    getDashboardSummary: async (): Promise<DashboardSummary> => {
        const res = await fetch(`${BASE_URL}/dashboard/summary`);
        if (!res.ok) throw new Error('Failed to fetch dashboard summary');
        return res.json();
    },

    chat: async (message: string): Promise<ChatResponse> => {
        const res = await fetch(`${BASE_URL}/agent/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        if (!res.ok) throw new Error('Chat failed');
        return res.json();
    }
};
