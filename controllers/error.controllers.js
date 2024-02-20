
exports.handleCustomErrors = (error, request, response, next) => {
  if (error.status && error.msg) {
      response.status(error.status).send({ msg: error.msg });
  } else next(error);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    return res.status(400).send({msg:'invalid id supplied'})
  }
  console.log('Error in getArticleById:', err);
  next(err)
}

exports.handleServerErrors = (err,req,res,next) => {
  return res.status(500).send({msg:'internal error'})
}
