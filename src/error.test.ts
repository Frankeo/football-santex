import { convertError, ErrorTypes } from './error'

describe('convertError Func', () => {
    it('should return an specific status and message for known errors', () => {
        const errorMessage = convertError(new Error(ErrorTypes.NotFound))

        expect(errorMessage.message).toBe(ErrorTypes.NotFound.toString())
        expect(errorMessage.statusCode).toBe(400)
    })

    it('should return a 500 error with message UNKNOWN for unknown errors', () => {
        const errorMessage = convertError(new Error('OOOPS!'))

        expect(errorMessage.message).toBe(ErrorTypes.UNKNOWN.toString())
        expect(errorMessage.statusCode).toBe(500)
    })
})
