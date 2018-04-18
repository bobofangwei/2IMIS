export function isEmptyObject(obj) {
  if (typeof obj !== 'object') {
    return false;
  }
  for (let key in obj) {
    return false;
  }
  return true;
};
// 计算使用utf-8编码的字符串占用多少个字节
// 根据utf8的规定，utf8是 一种可变长度的unicode编码格式，可以使用一到四个字节进行字符编码
// 0000-007F之间的字符，用一个字节编码
// 0080-07FF之间的字符，使用两个字节
// 0800-D7FF之间的字符，使用三个字节
// 10000-10FFFF之间使用4个字节
// 如果是GBK编码，汉字占用两个定长字节
export function sizeOf(str) {};
