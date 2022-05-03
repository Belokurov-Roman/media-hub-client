import React from 'react';

import { Link } from 'react-router-dom';

function LinkFromPage({ name, path }) {
  return (
    <Link style={{ margin: '5px' }} to={path}>{name}</Link>
  );
}
export default LinkFromPage;
