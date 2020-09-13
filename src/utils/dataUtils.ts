import { TRound, TTeamData } from "./types";

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