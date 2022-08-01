import { getPlayersByLeague, getPlayersByTeam } from '../database/league-repository'

export const playerResolver = {
    async playersByLeague({ leagueCode }: { leagueCode: string }): Promise<Player[]> {
        return getPlayersByLeague(leagueCode);
    },
    async playersByTeam({ teamName }: { teamName: string }): Promise<Player[]> {
        return getPlayersByTeam(teamName);
    }
}
