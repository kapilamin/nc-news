
exports.handleCustomErrors = (error, req, res, next) => {
  if (error.status && error.msg) {
      return res.status(error.status).send({ msg: error.msg });
  }
  next(error);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    return res.status(400).send({msg:'invalid id supplied'})
  }
  next(err)
}

exports.handleServerErrors = (err,req,res,next) => {
  return res.status(500).send({msg:'internal error'})
}
