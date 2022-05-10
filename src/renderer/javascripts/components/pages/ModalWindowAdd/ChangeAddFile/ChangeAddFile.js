import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { us } from 'yarn/lib/cli';
import { useNavigate } from 'react-router-dom';

function ChangeAddFile({ currentFile, setCurrentFile }) {
  const [nameFile, setNameFile] = useState(currentFile.name);
  const [savedFile, setSavedFile] = useState('');
  const navigate = useNavigate();

  function changeName(e) {
    console.log(currentFile);
    setNameFile(e.target.value);
    setCurrentFile({ ...currentFile, name: e.target.value });
  }

  function saveFile() {
    ipcRenderer.invoke('save-video-file', currentFile)
      .then((res) => {
        if (res) {
          ipcRenderer.send('video-added');
        }
      });
  }
  return (
    <div>
      <div>
        <h4>Change name?</h4>
        <input onChange={(e) => changeName(e)} value={nameFile} />
      </div>
      <div>
        <h4>Add tag?</h4>
        <input placeholder="tag" />
      </div>
      <button onClick={() => saveFile(nameFile)} type="button">Сохранить</button>
    </div>
  );
}
export default ChangeAddFile;
