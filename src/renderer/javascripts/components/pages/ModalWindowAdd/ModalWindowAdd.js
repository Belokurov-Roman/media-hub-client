import React, { useEffect, useState, useContext } from 'react';
import './ModalWindowAdd.css';
import { ipcRenderer } from 'electron';
import GameCard from '../../common/GameCard/GameCard';
import { Context } from '../../../context/GameContext';
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
    console.log('123');
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
    console.log(event);
  }
  return (
    addedFile
      ? <ChangeAddFile currentFile={currentFile} setCurrentFile={setCurrentFile} />
      : <AddingFiles callDialog={callDialog} drag={drag} onZone={onZone} DropHandler={DropHandler} offDropHandler={offDropHandler} onDropHandler={onDropHandler} startDragHandler={startDragHandler} />
  );
}

export default ModalWindowAdd;
