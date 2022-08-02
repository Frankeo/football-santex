import mockAxios from 'jest-mock-axios'
import {
    competitionAdapter,
    teamAdapter,
} from '../adapters/competition-adapter'
import {
    getLeagueByCode,
    getTeamById,
    getTeamIdsByLeague,
} from './football-client'

describe('football-client-api Test', () => {
    const generalHeader = {
        headers: { 'X-Auth-Token': '8fadfda7b8834172893c2683be2c8c0c' },
        method: 'GET',
    }
    const baseUrl = 'http://api.football-data.org/v2'

    it('getLeagueByCode Func should call get method with specific url and general options', async () => {
        const competitionAPI: CompetitionAPI = {
            name: 'name',
            code: 'code',
            area: {
                name: 'areaName',
            },
        }

        mockAxios.get.mockResolvedValueOnce({ data: competitionAPI })
        const code = 'league'
        const result = await getLeagueByCode(code)
        expect(mockAxios.get).toHaveBeenCalledWith(
            `${baseUrl}/competitions/${code}`,
            generalHeader
        )
        expect(result).toStrictEqual(competitionAdapter(competitionAPI))
    })

    it('getTeamIdsByLeague Func should call get method with specific url and general options', async () => {
        const id = 12
        const competitionTeamAPI: CompetitionTeamsAPI = {
            teams: [
                {
                    area: {
                        name: 'name',
                    },
                    id,
                    name: 'name',
                    shortName: 'short',
                    squad: [],
                    tla: 'tla',
                },
            ],
        }

        mockAxios.get.mockResolvedValueOnce({ data: competitionTeamAPI })
        const code = 'league'
        const result = await getTeamIdsByLeague(code)
        expect(mockAxios.get).toHaveBeenCalledWith(
            `${baseUrl}/competitions/${code}/teams`,
            generalHeader
        )
        expect(result).toStrictEqual([id])
    })

    it('getTeamById Func should call get method with specific url and general options', async () => {
        const id = 12
        const teamAPI: TeamAPI = {
            area: {
                name: 'name',
            },
            id,
            name: 'name',
            shortName: 'short',
            squad: [],
            tla: 'tla',
        }

        mockAxios.get.mockResolvedValueOnce({ data: teamAPI })
        const result = await getTeamById(id)
        expect(mockAxios.get).toHaveBeenCalledWith(
            `${baseUrl}/teams/${id}`,
            generalHeader
        )
        expect(result).toStrictEqual(teamAdapter(teamAPI))
    })
})
