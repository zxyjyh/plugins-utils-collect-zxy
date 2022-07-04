

const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')

const chokidar = require('chokidar')

const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const {resolve} = require('path')

const readFile = (fs,file)=>{
  try {
    return fs.readFileSync(path.join(clientConfig.output.path,file),'utf-8')
  } catch (error) {
  }
}

/**
 * @param  {Express()起的服务} app
 * @param  {模版路径} templatePath
 * @param  {} cb
 *  (bundle, options) => {
  *   renderer = createRenderer(bundle, options)
  * }
 */
module.exports = function setupDevServer(app,templatePath,cb){
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r=>ready = r)
  const update = ()=>{
    if(bundle && clientManifest){
      ready()
      cb(bundle,{
        template,
        clientManifest
      })
    }
  }

  template = fs.readFileSync(templatePath,'utf-8')

  chokidar.watch(templatePath).on('change',()=>{
    template = fs.readFileSync(templatePath,'utf-8')
    update()
  })

  clientConfig.entry.app = ['webpack-hot-middleware/client',clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(), //启用HMR
    new webpack.NoEmitOnErrorsPlugin()
  )


  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler,{
    publicPath:clientConfig.output.publicPath,
    noInfo:true
  })
  app.use(devMiddleware)

  clientCompiler.hooks.done.tap('done',stats=>{
    stats = stats.toJson()
    if(stats.hasErrors()){
      stats.errors.forEach(err => console.error(err))

    }
    if(stats.hasWarnings()){
      stats.warnings.forEach(warning=>console.log(warning))
    }

    if(stats.errors.length) return

    clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json'))

    update()
  })

  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))




  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({},(err,stats)=>{
    if(err) throw err
    stats = stats.toJson()
    if(stats.errors.length) return

    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))

    update()
  })


  return readyPromise




}