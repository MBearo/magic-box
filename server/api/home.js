const { Boxview } = require('../model')

module.exports = async (ctx, next) => {
  const { id } = ctx.query
  const res = await Boxview.findAll({
    where: {
      BoxID: id
    }
  })
  ctx.body = res
}
