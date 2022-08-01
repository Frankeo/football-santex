import { getTeamByName } from '../database/league-repository'

export const teamResolver = {
    async teamByName({ name }: { name: string }): Promise<Team> {
        return getTeamByName(name)
    },
}
