const { Boxview, Boxposition } = require('../model')
module.exports = async (ctx, next) => {
  const { id } = ctx.query
  const res = await Boxview.findByPk(id)
  const res2 = await Boxposition.findOne({
    where: {
      BoxID: id
    }
  })
  console.log(res)
  let body
  if (res && res2) {
    body = {
      error_code: 0,
      message: 'success',
      ...res.dataValues,
      ...res2.dataValues
    }
  } else {
    body = {
      error_code: 10010,
      message: '非法id'
    }
  }

  ctx.body = body
}
