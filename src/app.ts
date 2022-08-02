import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { globalTypes } from './schema-generator'
import { competitionResolver } from './resolvers/competition-resolver'
import { playerResolver } from './resolvers/player-resolver'
import { teamResolver } from './resolvers/team-resolver'
import { convertError } from './error'

const executableSchema = makeExecutableSchema({
    typeDefs: globalTypes,
})

const root = {
    ...competitionResolver,
    ...playerResolver,
    ...teamResolver,
}

const app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema: executableSchema,
        rootValue: root,
        graphiql: true,
        customFormatErrorFn: convertError,
    })
)

app.listen(4000)
