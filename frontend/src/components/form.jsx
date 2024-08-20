import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Form = ({ handleSubmit, formTitle, initialdata,clearFormAfterSubmit,admin=false}) => {
  const [usermail, setUsermail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (initialdata) {
      let name=initialdata.name
      let edied=name.replace(/[#[$\]\\@]/g,'_')

      setUsermail(initialdata.email);
      setUsername(edied);
      setPassword(initialdata.password);
    }
  }, [initialdata]);

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!usermail.trim()) {
      newErrors.usermail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(usermail)) {
      newErrors.usermail = 'Email is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }


    handleSubmit({ usermail, password, username });
    if (clearFormAfterSubmit) {
      setUsermail('');
      setPassword('');
      setUsername('');
    }

  };

  return (
    <div className="login-container">
      <h2>{formTitle}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Username</label>
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <input
            type="email"
            id="usermail"
            value={usermail}
            onChange={(e) => setUsermail(e.target.value)}
            required
          />
          <label htmlFor="usermail">Email</label>
          {errors.usermail && <p className="error-message">{errors.usermail}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="link-container">
                {admin? <Link to="/admin/home" className="custom-link">Go to Admin Home</Link>:
                <Link to="/profile" className="custom-link">Back to profile</Link>}
            </div>
        <button className='submitbutton'type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
