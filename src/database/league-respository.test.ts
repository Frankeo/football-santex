import { ErrorTypes } from '../error'
import * as repository from './league-repository'
import {
    getPlayersByLeague,
    getPlayersByTeam,
    getTeamByName,
    getTeamsById,
} from './league-repository'

const leagueCode = 'CL'
const players = [
    {
        name: 'Alexander Nübel',
        dateOfBirth: '1996-09-30T00:00:00.000Z',
        position: 'Goalkeeper',
        countryOfBirth: 'Germany',
    },
]
const teamName = 'AS Monaco FC'
const teamId = 1
const teams = [
    {
        id: teamId,
        areaName: 'Monaco',
        email: null,
        name: teamName,
        players,
        shortName: 'Monaco',
        tla: 'ASM',
    },
]
const db = {
    data: {
        competitions: [
            {
                areaName: 'Europe',
                code: leagueCode,
                name: 'UEFA Champions League',
                teams,
                shortName: 'PSV',
                tla: 'PSV',
            },
        ],
    },
}

describe('all the repository functions', () => {
    beforeEach(() => {
        const spy = jest.spyOn(repository, 'getDB')
        spy.mockResolvedValue(db)
    })

    describe('getPlayersByLeague function', () => {
        it('should all the players of a league when the league exists on DB', async () => {
            const result = await getPlayersByLeague(leagueCode)
            expect(result).toStrictEqual(players)
        })

        it('should thrown an specific error when the league NOT exists on DB', () => {
            const func = async () => await getPlayersByLeague('Random')
            expect(func()).rejects.toThrowError(ErrorTypes.NotFound)
        })
    })

    describe('getPlayersByTeam function', () => {
        it('should all the players of a team when the team exists on DB', async () => {
            const result = await getPlayersByTeam(teamName)
            expect(result).toStrictEqual(players)
        })

        it('should thrown an specific error when the team NOT exists on DB', () => {
            const func = async () => await getPlayersByTeam('Random')
            expect(func()).rejects.toThrowError(ErrorTypes.NotFound)
        })
    })

    describe('getTeamByName function', () => {
        it('should get a team by teamName when the team exists on DB', async () => {
            const result = await getTeamByName(teamName)
            expect(result).toStrictEqual(teams[0])
        })

        it('should thrown an specific error when the team NOT exists on DB', () => {
            const func = async () => await getTeamByName('Random')
            expect(func()).rejects.toThrowError(ErrorTypes.NotFound)
        })
    })

    describe('getTeamsById function', () => {
        it('should get teams by ids on DB', async () => {
            const result = await getTeamsById([teamId])
            expect(result).toStrictEqual(teams)
        })
    })
})
