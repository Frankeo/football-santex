# football-santex

Solution for football santex test

### commands:

```bash
npm start
```

Build the app (compile the typescript code) and start the app.
it has GraphiQL in the port: 4000

[GraphQL](http://localhost:4000/graphql)

```bash
npm test
```

Run all the unit tests (jest is used)

```bash
npm run format
```

Run the prettier and check the styling

```bash
npm run lint
```

Run the eslint and check the linting

It has [husky]() configure, so before any push is executed, it checks the format, linting and tests and after that, you are available to push your local changes.

## Usefull mutations and queries

### Mutation

```
mutation mainMutation($leagueCode: String) {
  importLeague(leagueCode: $leagueCode) {
    areaName
    code
    name
  }
}
```

```
{
  "leagueCode": "CL"
}
```

Have in mind that every import is going to have the limitation of 10 requests by minute. After the first one, is going to try to reuse all the teams already downloaded instead of request for them.

### Query Players by team

```
query main($teamName: String) {
  playersByTeam(teamName: $teamName) {
    name,
    position,
    dateOfBirth,
    countryOfBirth,
    nacionality
  }
}
```

```
{
  "teamName": "AS Monaco FC"
}
```

### Query Players by League

```
query main($leagueCode: String) {
  playersByLeague(leagueCode: $leagueCode) {
    name,
    position,
    dateOfBirth,
    countryOfBirth,
    nacionality
  }
}
```

```
{
  "leagueCode": "CL"
}
```

### Query Team by Name

```
query main($teamName: String) {
  teamByName(name: $teamName) {
    name,
    tla,
    shortName,
    areaName,
    email,
    players {
      name,
      position,
      dateOfBirth,
      countryOfBirth,
      nacionality
    }
  }
}
```

```
{
  "teamName": "AS Monaco FC"
}
```
