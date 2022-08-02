import {
    competitionAdapter,
    teamAdapter,
} from '../adapters/competition-adapter'
import axios from 'axios'
import rateLimit from 'axios-rate-limit'

const api = rateLimit(axios.create(), {
    maxRequests: 10,
    perMilliseconds: 60000,
})
const APIToken = '8fadfda7b8834172893c2683be2c8c0c'
const baseUrl = 'http://api.football-data.org'
const version = 'v2'

const getUrl = (...parts: string[]) => parts.join('/')

const getOptions = () => ({
    method: 'GET',
    headers: {
        'X-Auth-Token': APIToken,
    },
})

export const getLeagueByCode = (leagueCode: string): Promise<Competition> => {
    const url = getUrl(baseUrl, version, 'competitions', leagueCode)
    return api
        .get(url, getOptions())
        .then(({ data }) => competitionAdapter(data))
}

export const getTeamIdsByLeague = (leagueCode: string): Promise<number[]> => {
    const url = getUrl(baseUrl, version, 'competitions', leagueCode, 'teams')
    return api
        .get(url, getOptions())
        .then(({ data }: { data: CompetitionTeamsAPI }) =>
            data.teams.map((team) => team.id)
        )
}

export const getTeamById = (teamId: number): Promise<Team> => {
    const url = getUrl(baseUrl, version, 'teams', teamId.toString())
    return api.get(url, getOptions()).then(({ data }) => teamAdapter(data))
}
