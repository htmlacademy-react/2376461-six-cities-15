import { FormEvent, MouseEventHandler, ReactEventHandler, useState } from 'react';
import { login } from '../store/thunk/auth';
import { useAppDispatch } from '../store/helpers';

type ChangeHandler = ReactEventHandler<HTMLElement | HTMLTextAreaElement>;

export default function LoginPage() {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange: ChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (evt: FormEvent<EventTarget>) => {
    evt.preventDefault();

    dispatch(login(formData));
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" onChange={handleInputChange} value={formData.email} type="email" name="email" placeholder="Email" required/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" onChange={handleInputChange} value={formData.password} type="password" name="password" placeholder="Password" required/>
            </div>
            <button onClick={handleSubmit} className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
