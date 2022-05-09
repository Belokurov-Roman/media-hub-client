import React, { useEffect } from 'react';

function ModalWindowAdd() {
  const isModalView = new URL(location.href);
  useEffect(() => {
    console.log(isModalView);
  }, []);
  return (
    <div style={{ color: 'white' }}>Modal Window</div>
  );
}

export default ModalWindowAdd;
