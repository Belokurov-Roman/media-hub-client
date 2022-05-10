import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';
import './ChangeAddFile.css';
import { re } from '@babel/core/lib/vendor/import-meta-resolve';

function ChangeAddFile({ currentFile, setCurrentFile }) {
  const [nameFile, setNameFile] = useState(currentFile.name);
  const [savedFile, setSavedFile] = useState('');
  const [tag, setTag] = useState('');
  const navigate = useNavigate();

  function changeTag(e) {
    setTag(e.target.value);
    setCurrentFile({ ...currentFile, tag: e.target.value });
  }

  function changeName(e) {
    setNameFile(e.target.value);
    setCurrentFile({ ...currentFile, name: e.target.value });
  }

  function saveFile() {
    if (currentFile.name) {
      ipcRenderer.invoke('save-video-file', currentFile)
        .then((res) => {
          if (res) {
            ipcRenderer.send('video-added');
          }
        });
    }
  }
  return (
    <div className="ModalWindowAdd styleThisBlock">
      <h3>Подтвердите добавление</h3>
      <div className="blockInputChange">
        <span>Имя файла</span>
        <input className="styleChange inputSearch" onChange={(e) => changeName(e)} value={nameFile} />
      </div>
      <div className="blockInputChange">
        <span>Добавить тег (не обязательно)</span>
        <input onChange={(e) => changeTag(e)} className="styleChange inputSearch" placeholder="Введите тег (не обязательно)" />
      </div>
      <button className="buttonAdd TextLinks AddingBut" onClick={() => saveFile(nameFile)} type="button">Сохранить</button>
    </div>
  );
}
export default ChangeAddFile;
