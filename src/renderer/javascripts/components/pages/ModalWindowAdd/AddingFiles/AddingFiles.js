import React from 'react';

function AddingFiles({
  callDialog, startDragHandler, onDropHandler, offDropHandler, DropHandler, onZone, drag,
}) {
  return (
    <div className="ModalWindowAdd">
      <h4>Добавление файла</h4>
      <button type="button" onClick={callDialog} className="buttonAdd TextLinks AddingBut ">Выберете видео или игру или перетащите</button>
      <div
        onDragEnter={(e) => startDragHandler(e)}
      >
        {drag ? '' : (
          <div className="DropZona">
            <span>Перетените файл</span>
          </div>
        )}
        {drag
              && (
              <div
                onDragOver={(e) => onDropHandler(e)}
                onDragLeave={(e) => offDropHandler(e)}
                onDrop={(e) => {
                  DropHandler(e);
                  offDropHandler(e);
                }}
                className={`DropZona ${onZone ? 'onDropZone' : 'DropZona'}`}
              >
                <span>Перетените файл</span>
              </div>
              )}
      </div>
    </div>
  );
}
export default AddingFiles;
