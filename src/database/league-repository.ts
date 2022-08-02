import { join } from 'path'
import { Low, JSONFile } from 'lowdb-node'
import { ErrorTypes } from '../error'

export const getDB = async () => {
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)
    await db.read()
    return db
}

export const insertCompetition = async (competition: Competition) => {
    const db = await getDB()
    db.data = db.data || { competitions: [] }
    db.data?.competitions.push(competition)
    await db.write()
}

export const getCompetition = async (leagueCode: string) =>
    ((await getDB()).data?.competitions as Competition[]).filter(
        ({ code }) => code == leagueCode
    )[0]

export const getPlayersByLeague = async (
    leagueCode: string
): Promise<Player[]> => {
    const competitions = (
        (await getDB()).data?.competitions as Competition[]
    ).filter(({ code }) => code == leagueCode)

    if (!competitions.length) throw new Error(ErrorTypes.NotFound)

    return competitions
        .flatMap((comp) => comp.teams)
        .flatMap((team) => team.players)
}

export const getPlayersByTeam = async (teamName: string): Promise<Player[]> => {
    const teams = ((await getDB()).data?.competitions as Competition[])
        .flatMap(({ teams }) => teams)
        .filter(({ name }) => name == teamName)

    if (!teams.length) throw new Error(ErrorTypes.NotFound)
    return teams.flatMap(({ players }) => players)
}

export const getTeamByName = async (teamName: string): Promise<Team> => {
    const team = ((await getDB()).data?.competitions as Competition[])
        .flatMap((comp) => comp.teams)
        .filter((team) => team.name == teamName)[0]

    if (!team) throw new Error(ErrorTypes.NotFound)
    return team
}

export const getTeamsById = async (ids: number[]): Promise<Team[]> =>
    ((await getDB()).data?.competitions as Competition[])
        .flatMap((comp) => comp.teams)
        .filter((team) => ids.includes(team.id))
