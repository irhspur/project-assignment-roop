import api from './api'

export const getClubs = async (year: string) => {
    try {
        const response = await api.get('/clubs')
        return response.data;
    }
    catch (err) {
        return []
    }
}

export const getMatchDetails = async (year: string) => {
    try {
        const response = await api.get('/match-details')
        return response.data;
    }
    catch (err) {
        return []
    }
}
