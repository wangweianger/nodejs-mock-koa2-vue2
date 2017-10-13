import Koa from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import KoaLogger from 'koa-logger'
import cors from 'koa-cors'
import cookie from 'koa-cookie'
import session from 'koa-session'
import koa2Common from 'koa2-common'
import {
    SYSTEM
} from './config'
import path from 'path'
import router from './routes'

const app = new Koa()
const env = process.env.NODE_ENV || 'development'


app.keys = ['suid']
app
    .use(KoaBody({
        formidable: {
            uploadDir: path.join(__dirname, '../assets')
        }
    }))
    // .use(KoaLogger())
    .use(cookie())
    .use(session(app))
    .use(KoaStatic('assets', path.resolve(__dirname, '../assets'),{
        maxage: 365 * 24 * 60 * 60
    }))
    .use(koa2Common())
    .use(cors({
        origin: SYSTEM.ORIGIN,
        headers: 'Origin, X-Requested-With, Content-Type, Accept,token',
        methods: ['GET', 'PUT', 'POST'],
        credentials: true,
    }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use((ctx, next) => {
        const start = new Date()
        return next().then(() => {
            const ms = new Date() - start
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        })
    })

app.listen(SYSTEM.PROT);

console.log(`服务启动了：路径为：127.0.0.1:${SYSTEM.PROT}`)

export default app