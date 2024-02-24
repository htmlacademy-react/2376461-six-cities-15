

export default function ErrorPage(){


  return(
    <>
      <p className="error__text">Error 404</p>
      <button
        className="replay replay--error"
        type="button"
      >
        Try again
      </button>
    </>
  );
}

