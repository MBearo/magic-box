const Koa = require('koa')
const Router = require('koa-router')
const cors = require('./utils/cors')
const koaBody = require('koa-body')
const app = new Koa()
const router = new Router()

const home = require('./api/home')
const createBoxView = require('./api/createBoxView')

router.get('', home)
router.get('/createBoxView', createBoxView)

app
  .use(cors())
  .use(koaBody({ multipart: true }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    try {
      await next()
      if (ctx.status === 404) {
        ctx.body = '404'
      }
    } catch (err) {
      // handle error
    }
  })
app.listen(7777)
