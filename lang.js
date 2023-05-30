const VueCompile = require('vue-template-compiler');
const path = require('path');
const { readFileSync, writeFileSync, readdirSync, statSync } = require('fs');

// 中文字符匹配规则
const zfRegs = /['|"|`]?([a-zA-Z]*?[\u4e00-\u9fa5]+[|，|？|：|；|。|！|\u2026|、|-|\/|_|\s|\d+|“|”]*)+['|"|`]?/ig;

// 要提取的文件夹或文件列表
const srcDirs = [
  path.resolve(__dirname, './src/views/operate-manage/evaluate-manage/index.vue'),
  path.resolve(__dirname, './src/views/house-library/storehouse'),
  path.resolve(__dirname, './src/views/house-library/personal-house-list.vue'),
  path.resolve(__dirname, './src/views/house-library/house-library-list'),
];

// 输出的暂存对象
const Output = {};
const OutputName = '临时翻译';

start(srcDirs);

// 写入结果
writeFileSync(path.resolve(`./${OutputName}.json`), JSON.stringify(Output), 'utf-8');

/**
 * 依据输入的文件或文件夹路径执行不同的处理逻辑
 * @param {array} list 输入的文件或文件夹路径
 * @return {number}
 */
function start(list) {
  try {
    list.forEach(inputPath => {
      const Stats = statSync(inputPath);

      if (Stats.isDirectory()) {
        // 当前文件夹下的文件列表
        const dirFiles = readdirSync(inputPath);
        const paths = dirFiles.map(fileName => path.resolve(inputPath, fileName));
        start(paths);
      } else if (Stats.isFile() && inputPath.endsWith('.vue')) {
        readFileFn(inputPath);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// 读取文件开始执行
function readFileFn(dirPath) {
  const strs = readFileSync(dirPath, 'utf-8');

  // vue sfc 文件读取
  const sfc = VueCompile.parseComponent(strs);

  // 取出 template 内容
  if (sfc.template && sfc.template.content) {
    const templateAst = VueCompile.compile(sfc.template.content);
    // 转换-为了去掉注释等
    if (templateAst.render) {
      const newTemplate = templateTrans(templateAst.render);
    }
  }

  // 取出 script 内容
  if (sfc.script && sfc.script.content) {
    const newScript = scriptTrans(sfc.script.content);
  }

  // 源文件替换
}

function createValue(value) {
  value = value.replace(/["|'|`]/g, '').replace(/\n\s+/, '');

  Output[value] = value;
}

// 转换 template 的内容多语言
function templateTrans(content = '') {
  if (!content) return '';
  return content.replace(zfRegs, function (value) {
    createValue(value);
    return value;
  });
}

// 转换 script 的内容多语言
function scriptTrans(content = '') {
  if (!content) return '';

  // 剔除console
  content = content.replace(/console.log\(.*\)/g, '');
  // 剔除注释的
  content = content.replace(/\/\/.*\n/g, '').replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '');

  return content.replace(zfRegs, function (value) {
    createValue(value);
    return value;
  });
}

