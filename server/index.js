const Koa = require('koa')
const Router = require('koa-router')
const cors = require('./utils/cors')
const koaBody = require('koa-body')
const serve = require('koa-static')
const path = require('path')
const app = new Koa()
const router = new Router()

// const home = require('./api/home')
const createBoxView = require('./api/createBoxView')
const getPosition = require('./api/getPosition')
const updatePosition = require('./api/updatePosition')

// router.get('', home)
router.get('/createBoxView', createBoxView)
router.get('/getPosition', getPosition)
router.post('/updatePosition', updatePosition)

app
  .use(serve(path.join(__dirname, '../dist')))
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
