import { Link } from 'react-router-dom';
import { AppRoute } from '../constants';


export default function ErrorPage(){


  return(
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      className="page__main"
    >
      <p style={{ fontSize: '24px', marginBottom: '20px',fontWeight: 'bold' }} className="error__text">
        Error 404
      </p>
      <Link to={`${AppRoute.Main}`}>
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          className="login__submit form__submit button"
          type="button"
        >
          Back
        </button>
      </Link>
    </main>
  );
}

