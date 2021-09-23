// Wrapper function for catching async/await error handling
module.exports = fun => {
  return (req, res, next) => {
    fun(req,res,next).catch(next);
  }
}