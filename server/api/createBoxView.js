
const { Boxview } = require('../model')

module.exports = async (ctx, next) => {
  const { BoxName, Comment } = ctx.query
  const res = await Boxview.create({
    BoxName,
    Comment,
    CreateTime: new Date()
  })
  ctx.body = res
}
