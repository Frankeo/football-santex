const express = require('express')
const { graphqlHTTP } = require('express-graphql')
import { makeExecutableSchema } from '@graphql-tools/schema'
import { globalTypes } from './graphql-types'
import { competitionResolver } from './resolvers/competition-resolver'
import { playerResolver } from './resolvers/player-resolver'
import { teamResolver } from './resolvers/team-resolver'

const executableSchema = makeExecutableSchema({
    typeDefs: globalTypes
})

const root = {
    ...competitionResolver,
    ...playerResolver,
    ...teamResolver
}

var app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema: executableSchema,
        rootValue: root,
        graphiql: true,
    })
)

app.listen(4000)