export const competitionAdapter = ({
    area,
    code,
    name,
}: CompetitionAPI): Competition => ({
    areaName: area.name,
    code: code,
    name: name,
    teams: [],
})

const playerAdapter = ({
    nacionality,
    name,
    dateOfBirth,
    position,
    countryOfBirth,
}: PlayerAPI): Player => ({
    name: name,
    nacionality: nacionality,
    dateOfBirth: new Date(dateOfBirth),
    position: position,
    countryOfBirth: countryOfBirth,
})

export const teamAdapter = ({
    area,
    name,
    shortName,
    tla,
    email,
    squad,
}: TeamAPI): Team => ({
    areaName: area.name,
    email: email,
    name: name,
    players: squad.map(playerAdapter),
    shortName: shortName,
    tla: tla,
})
