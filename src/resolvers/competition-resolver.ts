import { getTeamsById, insertCompetition } from '../database/league-repository'
import {
    getLeagueByCode,
    getTeamById,
    getTeamIdsByLeague,
} from '../api/football-client'

export const competitionResolver = {
    async importLeague({
        leagueCode,
    }: {
        leagueCode: string
    }): Promise<Competition> {
        const league = await getLeagueByCode(leagueCode)
        const teamIds = await getTeamIdsByLeague(leagueCode)
        const existingTeams = await getTeamsById(teamIds)
        const remainingIds = teamIds.filter(
            (id) => !existingTeams.map((e) => e.id).includes(id)
        )
        league.teams = await Promise.all(remainingIds.map(await getTeamById))
        league.teams.push(...existingTeams)
        await insertCompetition(league)
        return league
    },
}
