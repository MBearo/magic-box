const { Boxposition } = require('../model')
module.exports = async (ctx, next) => {
  const { id, position } = ctx.request.body
  console.log(id, position)
  const res2 = await Boxposition.update({
    BoxPosition: position
  }, {
    where: {
      BoxID: id
    }
  })
  ctx.body = {
    error_code: 0,
    message: 'success',
    res2
  }
}
