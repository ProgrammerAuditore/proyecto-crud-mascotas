import React, { useState } from 'react';

function NoFound() {
  // Declara una nueva variable de estado, la cual llamaremos “count”
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Page No Found</h1>
    </div>
  );
}

export default NoFound;