import fetch from 'node-fetch';

export async function fetchDataWithTimeout(url, timeout = 10000) { // Increased to 10 seconds
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    console.log('Fetching URL:', url);
    console.log('Timeout set to:', timeout);

    try {
        const response = await fetch(url, { signal });
        console.log('Fetch response status:', response.status);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Fetch request was aborted due to timeout');
        } else {
            console.error('Fetch request failed:', error.message);
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}