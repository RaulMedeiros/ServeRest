'use strict'

require('express-async-errors')

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const queryParser = require('express-query-int')
const timeout = require('connect-timeout')
const { join } = require('path')
const ddTrace = require('dd-trace')
const ipfilter = require('express-ipfilter').IpFilter

const {
  aplicacaoExecutandoLocalmente,
  formaDeExecucao,
  urlDocumentacao,
  ehAmbienteDeTestes
} = require('./utils/ambiente')
const { conf } = require('./utils/conf')
const { setupSwaggerUI } = require('./docs/customization/swagger-config')
const errorHandler = require('./middlewares/error-handler')
const moesifMiddleware = require('./middlewares/moesif-monitor-middleware')
const { version } = require('../package.json')
const swaggerDocument = require('../docs/swagger.json')
const rateLimiter = require('./middlewares/rate-limiter')

const app = express()

/* istanbul ignore next */
if (!aplicacaoExecutandoLocalmente()) {
  ddTrace.init()
  ddTrace.use('express')
}

/* istanbul ignore if */
if (process.env.BLOCKED_IPS) {
  app.use(ipfilter(process.env.BLOCKED_IPS.split(','), {
    mode: 'deny',
    log: false
  }))
}

app.set('json spaces', 4)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(queryParser())
app.use(timeout())
app.use(cors())
app.use(moesifMiddleware)
app.use(rateLimiter)

app.disable('etag')

/* istanbul ignore else */
if (!conf.semHeaderDeSeguranca) {
  app.disable('x-powered-by')
  app.disable('Server')
  app.disable('X-Cloud-Trace-Context')
  app.use((req, res, next) => {
    res.set('x-dns-prefetch-control', 'off')
    res.set('x-frame-options', 'SAMEORIGIN')
    res.set('strict-transport-security', 'max-age=15552000; includeSubDomains')
    res.set('x-download-options', 'noopen')
    res.set('x-content-type-options', 'nosniff')
    res.set('x-xss-protection', '1; mode=block')
    next()
  })
}

/* istanbul ignore next */
if (aplicacaoExecutandoLocalmente() && !ehAmbienteDeTestes) {
  app.use(require('express-status-monitor')({ title: 'ServeRest Status' }))
}

const hostMapping = {
  'serverest.dev': 'serverest.dev',
  'staging.serverest.dev': 'staging.serverest.dev',
  agilizei: 'agilizei.serverest.dev',
  compassuol: 'compassuol.serverest.dev',
  cesarschool: 'cesarschool.serverest.dev'
}

// Configura o Swagger UI com personalizações avançadas
setupSwaggerUI(app, swaggerDocument, hostMapping, formaDeExecucao)
app.use('/favicon.ico', express.static(join(__dirname, '../docs/favicon.png')))
app.get('/version', (req, res) => { res.status(200).send({ version }) })

/* istanbul ignore if */
if (!ehAmbienteDeTestes) {
  app.use(morgan('dev'))
}

app.use('/login', require('./routes/login-route'))
app.use('/usuarios', require('./routes/usuarios-route'))
app.use('/produtos', require('./routes/produtos-route'))
app.use('/carrinhos', require('./routes/carrinhos-route'))

app.use(errorHandler)
app.use((req, res) => {
  res.status(405).send({
    message: `Não é possível realizar ${req.method} em ${req.url}. Acesse ${urlDocumentacao()} para ver as rotas disponíveis e como utilizá-las.`
  })
})

module.exports = app
