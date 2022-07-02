
type plainObj = Record<string,any>
const devConfig = require('./config/webpack.dev.ts')
const prodConfig = require('./config/webpack.prod.ts')
const libraryTargetConfig = require('./config/webpack.target');

module.exports =(env:plainObj,argv:plainObj)=> {
  console.log('env argv', env, argv);
  // 开发环境 argv会获取package.json中设置--mode的值

  if(argv.mode === 'development'){
    return devConfig
  }
  return libraryTargetConfig.has(argv.env.target) ? libraryTargetConfig.get(argv.env.target) : libraryTargetConfig.get('umd')

}
