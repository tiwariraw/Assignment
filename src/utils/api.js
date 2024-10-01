import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (query, startIndex = 0, maxResults = 10) => {
	const response = await axios.get(API_URL, {
		params: {
			q: query || 'javascript',
			startIndex,
			maxResults,
		},
	});
	return response.data;
};

export const fetchBookById = async (id) => {
	const response = await axios.get(`${API_URL}/${id}`);
	return response.data;
};