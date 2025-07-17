// API configuration
const API_BASE_URL = 'https://suitmedia-backend.suitdev.com/api/ideas';

// API service
const fetchIdeas = async (page = 1, pageSize = 10, sort = '-published_at') => {
    try {
        const params = new URLSearchParams({
            'page[number]': page,
            'page[size]': pageSize,
            'append[]': 'small_image',
            'append[]': 'medium_image',
            'sort': sort
        });

        const response = await fetch(`${API_BASE_URL}?${params}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ideas:', error);
        throw error;
    }
};
export { fetchIdeas };