import { TRound, TTeamData, TStats, TLast5 } from "./types";

export const getTeams = (rounds: TRound[]) => {
    const teams = new Set<string>();
    rounds.forEach(round => round.matches.forEach(match => {
        teams.add(match.team1);
        teams.add(match.team2);
    }))
    return Array.from(teams);
}

export const sortByPoints = (sortOrder: number) => (a: TTeamData, b: TTeamData) => (a.points || 0) > (b.points || 0) ? -sortOrder : sortOrder

export const mapPointClass = (len: number) => (team: TTeamData, idx: number) => ({
    ...team,
    class:
        idx < 4
            ? "is-positive"
            : idx > len - 4
                ? "is-negative"
                : "",
})

export const formatTeamwiseMatches = (rounds: TRound[]) => {
    const formattedData: { [key: string]: TTeamData } = {}

    rounds.forEach(round => round.matches.forEach(match => {
        const stats = calculateStats(match.score, match.date);

        const team1 = formattedData[match.team1];
        const team2 = formattedData[match.team2];

        formattedData[match.team1] = combineTeamStat(team1, stats.team1, match.team1)
        formattedData[match.team2] = combineTeamStat(team2, stats.team2, match.team2)


    }))
    return formattedData;
}

export const calculateStats = (score: { ft: [] }, date: string): { team1: TStats, team2: TStats } => {

    const [team1Score = 0, team2Score = 0] = score.ft

    const goals = {
        team1: {
            goalsFor: team1Score,
            goalsAgainst: team2Score,
            goalsDifference: team1Score - team2Score
        },
        team2: {
            goalsFor: team2Score,
            goalsAgainst: team1Score,
            goalsDifference: team2Score - team1Score
        }
    }

    if (team1Score > team2Score) {
        return { team1: { win: 1, points: 3, ...goals.team1, last5: [{ date, status: 'W' }] }, team2: { loss: 1, ...goals.team2, last5: [{ date, status: 'L' }] } }
    } else if (team1Score === team2Score) {
        return { team1: { draw: 1, points: 1, ...goals.team1, last5: [{ date, status: 'D' }] }, team2: { draw: 1, points: 1, ...goals.team2, last5: [{ date, status: 'D' }] } }
    } else {
        return { team2: { win: 1, points: 3, ...goals.team1, last5: [{ date, status: 'L' }] }, team1: { loss: 1, ...goals.team2, last5: [{ date, status: 'W' }] } }
    }
}

const statRows = ['win', 'loss', 'draw', 'points', 'goalsFor', 'goalsAgainst', 'goalsDifference', 'last5'];

const combineTeamStat = (existingData: TTeamData, teamStats: TStats, teamName: string) => {

    const calculateValue = (key: keyof TStats): (number | TLast5[]) => {
        if (key === 'last5') {
            //@ts-ignore
            if (existingData.last5.length < 5) {
            //@ts-ignore
                return teamStats.last5.concat(existingData.last5)
            } else {
            //@ts-ignore
                const sorted = existingData.last5.concat(teamStats.last5).sort((a, b) => a.date > b.date ? -1 : 1)
                return sorted.slice(0, 5)
            }
        } else {
            return (teamStats[key] || 0) + (existingData[key] || 0)
        }
    }

    if (existingData) {
            //@ts-ignore
        return ({ name: teamName, ...statRows.reduce((acc, key: keyof TStats) => ({ ...acc, [key]: calculateValue(key) }), {}), matchesPlayed: existingData.matchesPlayed + 1 })
    } else {
            //@ts-ignore
        return ({ name: teamName, ...statRows.reduce((acc, key: keyof TStats) => ({ ...acc, [key]: teamStats[key] || 0 }), {}), matchesPlayed: 1 })
    }
}