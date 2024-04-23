function handlePSQLErrors(error, request, response, next)
{
    if (error.code === '22P02' || error.code === '23502' || error.code === '42703')
    {
        response.status(400).send({msg: 'Bad Request'});
    }
    // 23503: FOREIGN KEY VIOLATION
    else if (error.code === '23503')
    {
        response.status(404).send({msg: 'Not Found'});
    }
    else
    {
        next(error);
    }
};

module.exports = handlePSQLErrors;