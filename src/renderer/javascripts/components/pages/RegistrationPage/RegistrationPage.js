import React, { useState } from 'react';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    // console.log(name, email, password);
    console.log(response);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="name" />
        <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="email" />
        <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default RegistrationPage;
