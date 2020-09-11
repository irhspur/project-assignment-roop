import api from './api'

export const getClubs = async (year: string) => {
    try {
        const response = await api.get(`/${year}/en.1.clubs.json`)
        return response.data;
    }
    catch (err) {
        return []
    }
}

export const getMatchDetails = async (year: string) => {
    try {
        const response = await api.get(`/${year}/en.1.json`)
        return response.data;
    }
    catch (err) {
        return []
    }
}
