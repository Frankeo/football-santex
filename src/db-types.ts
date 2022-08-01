interface Player {
  name: string;
  position: string;
  dateOfBirth: Date;
  countryOfBirth?: string;
  nacionality: string;
}

interface Team {
  name: string;
  tla: string;
  shortName: string;
  areaName: string;
  email?: string;
  players: Player[];
}

interface Competition {
  name: string;
  code: string;
  areaName: string;
  teams: Team[];
}