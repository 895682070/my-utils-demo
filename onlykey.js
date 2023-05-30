const fs = require('fs');

// 读取 txt 文件内容
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件时出错：', err);
    return;
  }

  const keyValuePairs = []; // 存储键值对

  // 提取键值对
  const regex = /<([^>]+)>:\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(data))) {
    const key = match[1];
    const value = match[2];
    keyValuePairs.push({ key, value });
  }

  const processedKeys = {}; // 已处理的键
  const processedPairs = []; // 已处理的键值对

  // 处理键值对
  keyValuePairs.forEach(pair => {
    const { key, value } = pair;
    let processedKey = key;

    // 如果键已经处理过，添加序号后缀
    if (processedKeys[key]) {
      processedKeys[key]++;
      processedKey = `${key}_${processedKeys[key]}`;
    } else {
      processedKeys[key] = 1;
    }

    processedPairs.push({ key: processedKey, value });
  });

  // 生成新的文件内容
  let newContent = '';
  processedPairs.forEach(pair => {
    newContent += `<${pair.key}>: '${pair.value}',\n`;
  });

  // 写入新的文件
  fs.writeFile('new_data.txt', newContent, 'utf8', err => {
    if (err) {
      console.error('写入文件时出错：', err);
      return;
    }

    console.log('新文件已生成！');
  });
});
