import { TRound } from "./types";

export const getTeams = (rounds: TRound[]) => {
    const teams = new Set<string>();
    rounds.forEach(round => round.matches.forEach(match => {
        teams.add(match.team1);
        teams.add(match.team2);
    }))
    return Array.from(teams);
}