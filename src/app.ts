const express = require('express')
const { graphqlHTTP } = require('express-graphql')
import { makeExecutableSchema } from '@graphql-tools/schema'
import { globalTypes } from './global-types'
import { competitionResolver } from './resolvers/competition-resolver'

const executableSchema = makeExecutableSchema({
    typeDefs: globalTypes,
    resolvers: [competitionResolver],
})

var app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema: executableSchema,
        graphiql: true,
    })
)

app.listen(4000)
