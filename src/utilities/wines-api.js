import sendRequest from './send-request';

const BASE_URL = '/api/wines';

export function search(search) {
    return sendRequest(BASE_URL, 'POST', search);
}

export function getAll() {
    return sendRequest(BASE_URL, 'GET');
}

export function addPlaylist(wine, newPlaylist) {
    return sendRequest(`${BASE_URL}/${wine._id}`, 'PUT', newPlaylist);
}

export function addSavedPlaylist(updatedData, wineId) {
    return sendRequest(`${BASE_URL}/${wineId}/updateSaved`, 'PUT', updatedData);
}