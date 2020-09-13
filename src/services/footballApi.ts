import api from './api'
import { formatTeamwiseMatches } from '../utils/dataUtils';

export const getClubs = async (year: string) => {
    try {
        // const response = await api.get(`/clubs/${year}`)
        const response = await api.get(`/${year}/en.1.json`)
        return response.data;
    }
    catch (err) {
        throw new Error("Network Error");
    }
}

export const getMatchDetails = async (year: string) => {
    try {
        // const response = await api.get(`/${year}`)
        const response = await api.get(`/${year}/en.1.json`)
            const teams = formatTeamwiseMatches(response.data.rounds)

        return teams;
        // return response.data;
    }
    catch (err) {
        throw new Error("Network Error");
    }
}
