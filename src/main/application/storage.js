import path from 'path';
import {
  mkdirSync, existsSync, readFileSync, writeFileSync,
} from 'fs';
import { app } from 'electron';

export default class Storage {
  constructor() {
    this.directory = path.join(app.getPath('userData'), 'storage');
    if (!existsSync(this.directory)) {
      mkdirSync(this.directory);
    }
  }

  get(key) {
    return this.read(key);
  }

  set(key, data) {
    return this.write(key, data);
  }

  read(key) {
    if (readFileSync(this.file(key)).toString() === '') {
      return '';
    }
    return JSON.parse(readFileSync(this.file(key)).toString());
  }

  write(key, data) {
    return writeFileSync(this.file(key), JSON.stringify([...this.read(key), { ...data }]));
  }

  rewrite(key, data) {
    return writeFileSync(this.file(key), JSON.stringify([...data]));
  }

  file(key) {
    const file = path.join(this.directory, `${key}.json`);
    if (!existsSync(file)) {
      writeFileSync(file, '[]', { flag: 'wx' });
    }
    console.log(file);
    return file;
  }
}
