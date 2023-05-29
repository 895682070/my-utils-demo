/*
 * @Author: wangfan fan.wang@uhomes.com
 * @Date: 2023-05-29 15:14:12
 * @LastEditors: wangfan fan.wang@uhomes.com
 * @LastEditTime: 2023-05-29 15:14:18
 * @FilePath: /my-utils-demo/hebing.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs');
const path = require('path');

// 大文件夹路径
const folderPath = '../json-tran';

// 合并en.json
const mergeEnJson = () => {
  const output = {};

  // 读取大文件夹中的所有子文件夹
  const subFolders = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // 遍历每个子文件夹
  subFolders.forEach(subFolder => {
    const filePath = path.join(folderPath, subFolder, 'en.json');

    // 读取en.json内容
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // 合并到输出对象
    Object.assign(output, data);
  });

  // 写入合并后的en.json到新文件
  fs.writeFileSync('merged_en.json', JSON.stringify(output, null, 2));
};

// 合并zh-cn.json
const mergeZhCnJson = () => {
  const output = {};

  // 读取大文件夹中的所有子文件夹
  const subFolders = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // 遍历每个子文件夹
  subFolders.forEach(subFolder => {
    const filePath = path.join(folderPath, subFolder, 'zh-cn.json');

    // 读取zh-cn.json内容
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    // 合并到输出对象
    Object.assign(output, data);
  });

  // 写入合并后的zh-cn.json到新文件
  fs.writeFileSync('merged_zh-cn.json', JSON.stringify(output, null, 2));
};

// 执行合并操作
mergeEnJson();
mergeZhCnJson();
