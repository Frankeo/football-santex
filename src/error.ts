interface GraphqlError {
    message: string
    statusCode: number
}

type GraphqlErrorDictionary = {
    [id: string]: GraphqlError
}

export enum ErrorTypes {
    NotFound = 'Element not found in the DB',
    UNKNOWN = 'UNKNOWN',
}

const errorCodes: GraphqlErrorDictionary = {
    [ErrorTypes.NotFound]: {
        message: ErrorTypes.NotFound.toString(),
        statusCode: 400,
    },
}

export const convertError = (err: Error) =>
    errorCodes[err.message as ErrorTypes] ?? {
        message: ErrorTypes.UNKNOWN.toString(),
        statusCode: 500,
    }
