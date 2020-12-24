import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { axiosPost } from '../../helpers/api';
import Axios from 'axios';

function Log({ setIsAuth, url }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    await Axios.post(url, form)
    .then(res => {
      console.log(res);
      setIsAuth(true);
    })
    .catch(err => console.log(err));
  }

  return (
    <form method="post" onSubmit={submitHandler}>
      <p>Username: </p>
      <input name="username" type="text" className="username" placeholder="Username" onChange={changeHandler} />
      <p>Password: </p>
      <input name="password" type="password" className="password" placeholder="Password" onChange={changeHandler} />
      <button className="pink" type="submit">
        Submit
      </button>
    </form>
  );
}

Log.propTypes = {
  setIsAuth: PropTypes.func,
  url: PropTypes.string,
};

export default Log;
