import React, { useState } from 'react';

function About() {
  // Declara una nueva variable de estado, la cual llamaremos “count”
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Page About</h1>
    </div>
  );
}

export default About;