import * as repository from '../database/league-repository'
import { playerResolver } from './player-resolver'
import { teamResolver } from './team-resolver'

describe('Testing Resolvers', () => {
    it('team resolver should call repository func only 1', async () => {
        const spy = jest.spyOn(repository, 'getTeamByName')
        const team: Team = {
            areaName: 'areaName',
            id: 12,
            name: 'name',
            shortName: 'sort',
            tla: 'tla',
            players: [],
        }
        spy.mockResolvedValue(team)
        const key = { name: 'name' }
        await teamResolver.teamByName(key)
        expect(spy).toBeCalledTimes(1)
    })

    const players: Player[] = [
        {
            dateOfBirth: new Date('2015-01-01'),
            nacionality: 'Blabla',
            name: 'name',
            position: 'position',
            countryOfBirth: 'country',
        },
    ]

    it('playersByLeague resolver should call repository func only 1', async () => {
        const spy = jest.spyOn(repository, 'getPlayersByLeague')
        spy.mockResolvedValue(players)
        const key = { leagueCode: 'leagueCode' }
        await playerResolver.playersByLeague(key)
        expect(spy).toBeCalledTimes(1)
    })

    it('playersByTeam resolver should call repository func only 1', async () => {
        const spy = jest.spyOn(repository, 'getPlayersByTeam')
        spy.mockResolvedValue(players)
        const key = { teamName: 'teamName' }
        await playerResolver.playersByTeam(key)
        expect(spy).toBeCalledTimes(1)
    })
})
