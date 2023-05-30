<!--
 * @Author: wangfan fan.wang@uhomes.com
 * @Date: 2023-05-29 15:20:22
 * @LastEditors: wangfan fan.wang@uhomes.com
 * @LastEditTime: 2023-05-30 18:26:40
 * @FilePath: /my-utils-demo/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# my-utils-demo
一些个人自用的小工具和demo

1. replace.js

   这个js主要是利用的node的读写功能，通过正则或者其他方式匹配vue文件中的中文字符，再次遍历all.json,当中文词条匹配，将会以固定格式替换。本例子是替换成了i18n的展现形式。

2. all.json 

   这个主要是全部的中文词条。也是i18m类型的

3. hebingg.js

   这个是合并json的工具代码，将json放在一个文件夹下，会自动遍历并且生成一个新的大json

4. hebingg.js

   这个是导出某个文件下所有中文的代码，但是会被特殊字符截断，还没加兼容

5. onlykey.js

   保证key唯一

