#! /usr/bin/env node

const yargs = require('yargs/yargs')

const cli = yargs()
const dedent = require('dedent')

const pkg = require('../package.json')

const context = {
  lernaTestVersion: pkg.version
}

const processArgv = process.argv.slice(2)

cli
  // 输出用法的提示
  .usage('Usage: lerna-test [command] <options>')
  // 设置最小要输入一个命令，以及不满足时的提示
  .demandCommand(1, 'A command is required.Pass --help to see all available commands and options.')
  // 提示
  .recommendCommands()
  // 定制错误时的执行
  .fail((err, msg) => {
    console.log(err)
  })
  // 设置参数的别名
  .alias('h', 'help')
  .alias(['v', 'V'], 'version')
  // 增加全局的选项
  .options({
    debug: {
      type: 'boolean',
      defaultDescription: false,
      describe: '启动debug模式',
      alias: 'd', // 设置别名
    }
  })
  // 也可以单独定义一个全局option
  .option('ci', {
    type: 'boolean',
    hidden: true
  })
  // 分组，可以把一些选项聚合到一个组内
  .group(['debug'], 'Dev options:')
  // 定义命令，第一种方法是用4个参数
  .command(
    'init [name]', // 命令的格式
    'Do init a project.', // 命令的描述
    // builder，可以定义命令独有的选项的配置
    (yargs) => {
      yargs.option('name', {
        type: 'string',
        describe: 'Name of a project.'
      })
    },
    // handler
    (argv) => {
      console.log(argv)
    }
  )
  // 也可以用对象来定义命令s
  .command({
    command: 'list',
    aliases: ['ls', 'll', 'la'],
    describe: '随便定义的一个命令：list',
    builder: (yargs) => {

    },
    handler: (argv) => { }
  })
  // 设置在控制台文本的宽度，cli.terminalWidth()可以获取控制台的宽度
  .wrap(cli.terminalWidth())
  // 设置结尾时输出的话，dedent可以让首行顶格显示，其他行也消去对应个数的空格这里是一种标签模板的用法
  .epilogue(dedent`   lerna-test 运行结束


    22222`)
  // 严格模式，不能识别输入时会给予反馈
  .strict()
  // 这里会把参数和context进行合并
  .parse(processArgv,context)