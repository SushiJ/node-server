import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import fs from "fs";
import path from "path";

const fsPromises = fs.promises;

const logEvent = async (message: string) => {
  const dataTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dataTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "../logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "../logs"));
    }
    // test
    await fsPromises.appendFile(
      path.join(__dirname, "../logs", "eventLog.txt"),
      logItem,
      { encoding: "utf-8" }
    );
  } catch (e) {
    console.log(e);
  }
};

export default logEvent;
