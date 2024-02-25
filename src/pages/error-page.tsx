

export default function ErrorPage(){


  return(
    <main className="page__main">
      <p className="error__text">Error 404</p>
      <button
        className="replay replay--error"
        type="button"
      >
        Try again
      </button>
    </main>
  );
}

