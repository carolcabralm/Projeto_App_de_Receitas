import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userEmail, userPassword } from '../redux/reducers/userReducer';

function Login(props) {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.user);
  console.log(globalState);

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = ({ target: { id, value } }) => (
    setState({ ...state, [id]: value })
  );

  const isDisabled = () => {
    const PASSWORD_LENGTH = 6;
    const REGEX_EMAIL = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm);
    if (state.email.length <= 0
    || !REGEX_EMAIL.test(state.email)
    || state.password.length <= PASSWORD_LENGTH) {
      return true;
    } return false;
  };

  const onButtonSubmit = async () => {
    dispatch(userEmail(state.email));
    dispatch(userPassword(state.password));
    const { history } = props;
    history.push('/foods');
  };

  return (
    <div>
      <form>
        <label htmlFor="userEmail">
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="Email:"
            value={ state.email }
            onChange={ handleInputChange }
            required
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="Senha:"
            value={ state.password }
            onChange={ handleInputChange }
            required
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled() }
          onClick={ () => onButtonSubmit() }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
