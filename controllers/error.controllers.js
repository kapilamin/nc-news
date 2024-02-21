
exports.handleCustomErrors = (error, req, res, next) => {
  if (error.status && error.msg) {
      return res.status(error.status).send({ msg: error.msg });
  }
  next(error);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    return res.status(400).send({msg:'invalid Id supplied'})
  }
  else if (err.code === '23503') {
    return res.status(400).send({msg:'username does not exist'})
  }
  else if (err.code === '23502'){
    return res.status(400).send({ msg: 'body missing required field' })
  }
  else {return res.status(404).send({ msg: 'requested Id not found' })}
}


exports.handleServerErrors = (err,req,res,next) => {
  return res.status(500).send({msg:'internal error'})
}
