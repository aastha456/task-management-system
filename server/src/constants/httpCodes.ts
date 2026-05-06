const httpCodes = {
    RESOURCE_CREATED: {
        statusCode: 201,
        message: "Resource created successfully"
    },
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Internal server error"
    },
    UNAUTHORIZED: { 
        statusCode: 401, 
        message: "Unauthorized" 
    }, 
    FORBIDDEN: { 
        statusCode: 403, 
        message: "Forbidden" 
    }, 
    NOT_FOUND: { 
        statusCode: 404, 
        message: "Not found" 
    }, 
    BAD_REQUEST: { 
        statusCode: 400, 
        message: "Bad request" 
    }, 
    CONFLICT: {
         statusCode: 409, 
         message: "Conflict" 
    }, 
    UNPROCESSABLE_ENTITY: { 
        statusCode: 422, 
        message: "Unprocessable entity" 
    }, 
    OK: { 
        statusCode: 200, 
        message: "OK"
    }
}

export default httpCodes;