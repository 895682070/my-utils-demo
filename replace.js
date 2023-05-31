/*
 * @Author: wangfan 
 * @Date: 2023-05-18 19:30:58
 * @LastEditors: wangfan fan.wang@uhomes.com
 * @LastEditTime: 2023-05-31 10:16:40
 * @FilePath: /trans/replace.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs');

// 读取JSON文件
const translations = require('./all.json');

// 定义Vue文件路径
const vueFilePath = './index.vue';

// 读取Vue文件内容
const vueContent = fs.readFileSync(vueFilePath, 'utf8');

// 遍历JSON文件中的文案
let modifiedVueContent = vueContent;
Object.keys(translations).forEach(key => {
  const searchPattern = new RegExp(`(?<=>)(${translations[key]})[：:]?(?=\\s*<\\/\\w+>)`, 'g');
  const replacePattern = `{{$t('all.${key}')}}`;
  modifiedVueContent = modifiedVueContent.replace(searchPattern, (match) => {
    return replacePattern;
  });
});

// 遍历Vue文件中的属性
Object.keys(translations).forEach(key => {
  const attributePattern = `(label|placeholder|title|start-placeholder|end-placeholder)\\s*=\\s*["']${translations[key]}["']`;
  const searchPattern = new RegExp(attributePattern, 'g');
  modifiedVueContent = modifiedVueContent.replace(searchPattern, (match, p1) => {
    return `:${p1}="$t('all.${key}')"`;
  });
});

// 遍历Vue文件中的标签
Object.keys(translations).forEach(key => {
  const searchPattern = new RegExp(`<([^>]+)>(\\s*)(${translations[key]})[：:]?(\\s*)<\\/\\1>`, 'g');
  const replacePattern = `<$1>{{$t('all.${key}')}}$2:</$1>`;
  modifiedVueContent = modifiedVueContent.replace(searchPattern, (match) => {
    return replacePattern;
  });
});


// 替换Vue文件中的JavaScript部分
modifiedVueContent = modifiedVueContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, match => {
  const jsContent = match.replace(/<\/?script[^>]*>/gi, ''); // 提取JavaScript代码
  const replacedJsContent = replaceJavaScriptText(jsContent); // 替换JavaScript中的中文文本
  return `<script>${replacedJsContent}</script>`;
});

// 创建新的Vue文件路径和文件名
const newVueFilePath = './demo.vue';

// 将修改后的内容写入新的Vue文件
fs.writeFileSync(newVueFilePath, modifiedVueContent, 'utf8');

console.log('生成新的Vue文件完成！');

// JavaScript文本替换函数
function replaceJavaScriptText(content) {
  Object.keys(translations).forEach(key => {
    const searchPattern = new RegExp(`(['"])${translations[key]}(['"])`, 'g');
    const replacePattern = `this.$t('all.${key}')`;
    content = content.replace(searchPattern, replacePattern);
  });
  return content;
}



