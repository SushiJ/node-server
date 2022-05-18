import { IncomingMessage } from 'http';
import path from 'path';

interface Items {
  [key: string]: string;
}
[];

const contentTypes: Items = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.jpg': 'image/jpg',
  '.png': 'image/png',
  '.txt': 'text/plain',
};

export const getExtentionType = (
  extension: string,
  defaultValue = 'text/html'
) => contentTypes[extension] ?? defaultValue;

// const switchCase =
//   (contentTypes: any, defaultValue = "_default") =>
//   (value: string) => {
//     return contentTypes[value] || defaultValue;
//   };

// const getExtentionType =
//   (extention: string) => (contentTypes: Record<string, any>) =>
//     contentTypes[extention];

// const getExtentionType =
//   <T extends object, U extends keyof T>(extension: U) =>
//   (contentTypes: T) =>
//     contentTypes[extension];

// console.log(getExtentionType(".css"));

const _getFilePath = (contentType: string, req: IncomingMessage) => {
  let filePath =
    contentType === 'text/html' && req.url! === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url!.slice(-1) === '/'
      ? path.join(__dirname, 'views', req.url!, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', req.url!)
      : path.join(__dirname, req.url!);

  return filePath;
};

const getFilePath = (req: IncomingMessage, contentType: string) => {
  let file_Path = {
    0: path.join(__dirname, 'views', 'index.html'),
    1: path.join(__dirname, 'views', req.url!, 'index.html'),
    2: path.join(__dirname, 'views', req.url!),
    3: path.join(__dirname, req.url!),
  };
  const first = req.url === '/' && contentType === 'text/html';
  const second = req.url!.slice(-1) === '/' && contentType === 'text/html';
  const third = contentType === 'text/html';

  const filePath = first
    ? file_Path[0]
    : second
    ? file_Path[1]
    : third
    ? file_Path[2]
    : file_Path[3];

  //@ts-ignore
  //@ts-nocheck
  // return filePath[contentType];
};
