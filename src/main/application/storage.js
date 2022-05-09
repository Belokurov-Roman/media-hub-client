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
    return writeFileSync(this.file(key), JSON.stringify([...this.get(key), { ...data }]));
  }

  rewrite(key, data) {
    return writeFileSync(this.file(key), JSON.stringify([...data]));
  }

  delete(key, data) {
    return writeFileSync(
      this.file(key),
      JSON.stringify([...this.get(key)].filter((el) => el.name !== data)),
    );
  }

  updateOne(key, elName, kluch, znachenie) {
    const updatedArr = this.read(key).map((el) => {
      if (el.name === elName) {
        if (el.totalTime) {
          return { ...el, [kluch]: el[kluch] + znachenie };
        }
        return { ...el, [kluch]: znachenie };
      }
      return el;
    });
    console.log(updatedArr);
    this.rewrite(key, updatedArr);
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
