import React, { useState } from 'react';
import './ModalWindowAdd.css';
import { ipcRenderer } from 'electron';

import AddingFiles from './AddingFiles/AddingFiles';
import ChangeAddFile from './ChangeAddFile/ChangeAddFile';

function ModalWindowAdd() {
  const [drag, setDrag] = useState(false);
  const [onZone, setOnZone] = useState(false);

  const [addedFile, setAddedFile] = useState(false);
  const [currentFile, setCurrentFile] = useState({});

  function callDialog() {
    ipcRenderer.invoke('call-dialog')
      .then((res) => {
        setCurrentFile(res);
        setAddedFile(true);
      });
  }

  function startDragHandler() {
    setDrag(true);
  }

  function onDropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setOnZone(true);
  }

  function offDropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setOnZone(false);
    setDrag(false);
  }

  async function DropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  return (
    addedFile
      ? <ChangeAddFile currentFile={currentFile} setCurrentFile={setCurrentFile} />
      : <AddingFiles callDialog={callDialog} drag={drag} onZone={onZone} DropHandler={DropHandler} offDropHandler={offDropHandler} onDropHandler={onDropHandler} startDragHandler={startDragHandler} />
  );
}

export default ModalWindowAdd;
