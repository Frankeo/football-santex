interface PlayerAPI {
    name: string
    position: string
    dateOfBirth: string
    countryOfBirth?: string
    nacionality: string
}

interface CompetitionAPI {
    name: string
    code: string
    area: {
        name: string
    }
}

interface CompetitionTeamsAPI {
    teams: TeamAPI[]
}

interface TeamAPI {
    id: number
    name: string
    tla: string
    shortName: string
    area: {
        name: string
    }
    email?: string
    squad: PlayerAPI[]
}
