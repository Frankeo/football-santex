import { insertCompetition } from '../database/league-repository'
import { getLeagueByCode, getTeamById, getTeamIdsByLeague } from '../football-client'

export const competitionResolver = {
    async importLeague({ leagueCode }: { leagueCode: string }): Promise<Competition> {
        const league = await getLeagueByCode(leagueCode);
        const teamIds = await getTeamIdsByLeague(leagueCode);
        league.teams = await Promise.all(teamIds.map(await getTeamById));
        await insertCompetition(league);
        return league
    }
}
