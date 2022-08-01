import { join } from 'path'
import { Low, JSONFile } from 'lowdb-node'

const getDB = () => {
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    return new Low(adapter)
}

export const insertCompetition = async (competition: Competition) => {
    const db = getDB()
    db.data = db.data || { competitions: [] }
    db.data?.competitions.push(competition)
    await db.write()
}

export const getPlayersByLeague = async (
    leagueCode: string
): Promise<Player[]> => {
    const db = getDB()
    await db.read()
    return (db.data?.competitions as Competition[])
        .filter((comp) => comp.code == leagueCode)
        .flatMap((comp) => comp.teams)
        .flatMap((team) => team.players)
}

export const getPlayersByTeam = async (teamName: string): Promise<Player[]> => {
    const db = getDB()
    await db.read()
    return (db.data?.competitions as Competition[])
        .flatMap((comp) => comp.teams)
        .filter((team) => team.name == teamName)
        .flatMap((team) => team.players)
}

export const getTeamByName = async (teamName: string): Promise<Team> => {
    const db = getDB()
    await db.read()
    return (db.data?.competitions as Competition[])
        .flatMap((comp) => comp.teams)
        .filter((team) => team.name == teamName)[0]
}
