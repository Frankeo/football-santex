import { competitionAdapter, teamAdapter } from './competition-adapter'

describe('competitionAdapter Function', () => {
    it('should create a Competition with empty Teams when passing a CompetitionAPI', () => {
        const input: CompetitionAPI = {
            area: {
                name: 'AREANAME',
            },
            code: 'CODE',
            name: 'NAME',
        }
        const result = competitionAdapter(input)
        expect(result.areaName).toBe(input.area.name)
        expect(result.code).toBe(input.code)
        expect(result.name).toBe(input.name)
        expect(result.teams).toStrictEqual([])
    })
})

describe('teamAdapter Function', () => {
    let input: TeamAPI

    beforeEach(() => {
        input = {
            id: 1,
            area: {
                name: 'AREANAME',
            },
            name: 'NAME',
            shortName: 'short',
            tla: 'TLA',
            email: 'EMAIL',
            squad: [],
        }
    })

    it('should create a Team without Players when passing a TeamAPI with no players', () => {
        const result = teamAdapter(input)
        expect(result.areaName).toBe(input.area.name)
        expect(result.shortName).toBe(input.shortName)
        expect(result.name).toBe(input.name)
        expect(result.players).toStrictEqual([])
        expect(result.email).toStrictEqual(input.email)
        expect(result.tla).toStrictEqual(input.tla)
        expect(result.id).toStrictEqual(input.id)
    })

    it('should create a Team with Players when passing a TeamAPI with squad', () => {
        input.squad = [
            {
                dateOfBirth: '2015-05-11',
                nacionality: 'nacionality',
                name: 'PEPE',
                position: 'PEPE',
                countryOfBirth: 'countryOfBirth',
            },
        ]
        const player: Player = {
            dateOfBirth: new Date('2015-05-11'),
            nacionality: 'nacionality',
            name: 'PEPE',
            position: 'PEPE',
            countryOfBirth: 'countryOfBirth',
        }
        const result = teamAdapter(input)
        expect(result.players).toContainEqual(player)
    })
})
