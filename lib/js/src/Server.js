// Generated by BUCKLESCRIPT VERSION 2.0.0, PLEASE EDIT WITH CARE
'use strict'

var Cors = require('cors')
var Chalk = require('chalk')
var Config = require('./Config.js')
var Router = require('./Router.js')
var Morgan = require('morgan')
var Express = require('bs-express/lib/js/src/express.js')
var Make = require('express')
var Process = require('process')
var Js_option = require('bs-platform/lib/js/js_option.js')
var BodyParser = require('body-parser')
var DataProvider = require('./data/DataProvider.js')
var Js_primitive = require('bs-platform/lib/js/js_primitive.js')
var ApolloServerExpress = require('bs-apollo-server-express/lib/js/src/ApolloServerExpress.js')

var graphiqlMiddleware = ApolloServerExpress.createGraphiQLExpressMiddleware(
  /* None */ 0,
  /* None */ 0,
  /* None */ 0,
  /* None */ 0,
  '/graphql'
)

function onListen (exn) {
  if (exn == null) {
    console.log(
      Chalk.blue('telepathic') +
        ' is listening on port ' +
        Chalk.green(Config.Server[/* port */ 0].toString())
    )
    return /* () */ 0
  } else {
    console.log(
      Chalk.red('Express listen error: ') +
        Js_option.getWithDefault(
          '(no message)',
          Js_primitive.undefined_to_opt(exn.message)
        )
    )
    return /* () */ 0
  }
}

function start (graphRouter) {
  var app = Make()
  var match = Config.Server[/* isDev */ 3]
  if (match !== 0) {
    app.use(Morgan('dev'))
  } else {
    app.use(Morgan('combined'))
  }
  app.use(
    Cors({
      exposedHeaders: Config.Server[/* corsHeaders */ 2],
    })
  )
  app.use(
    BodyParser.json({
      limit: Config.Server[/* bodyLimit */ 1],
    })
  )
  app.use('/graphql', graphRouter)
  if (Config.Server[/* isDev */ 3]) {
    app.use('/graphiql', graphiqlMiddleware)
  }
  app.use(Router.Web[/* make */ 0](/* () */ 0))
  return Express.App[/* listen */ 0](
    app,
    /* Some */ [Config.Server[/* port */ 0]],
    /* Some */ [onListen],
    /* () */ 0
  )
}

function main () {
  return DataProvider.make(/* () */ 0)
    .then(function (dataProvider) {
      var graphRouter = Router.GraphQL[/* make */ 1](dataProvider)
      start(graphRouter)
      return Promise.resolve(/* () */ 0)
    })
    .catch(function (error) {
      console.log(
        Chalk.red(
          Js_option.getWithDefault(
            '(no message)',
            Js_primitive.null_undefined_to_opt(error.message)
          )
        )
      )
      Process.exit(1)
      return Promise.resolve(/* () */ 0)
    })
}

if (require.main === module) {
  main(/* () */ 0)
}

exports.graphiqlMiddleware = graphiqlMiddleware
exports.onListen = onListen
exports.start = start
exports.main = main
/* graphiqlMiddleware Not a pure module */