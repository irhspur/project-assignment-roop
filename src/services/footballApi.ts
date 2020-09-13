import api from './api'

export const getClubs = async (year: string) => {
    try {
        const response = await api.get(`/clubs/${year}`)
        return response.data;
    }
    catch (err) {
        return []
    }
}

export const getMatchDetails = async (year: string) => {
    try {
        const response = await api.get(`/match-details/${year}`)
        return response.data;
    }
    catch (err) {
        return []
    }
}
