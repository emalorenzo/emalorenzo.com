export const Figure = ({ children, figcaption }) => {
  return (
    <figure className="mt-2 mb-2">
      <video autoPlay muted loop playsInline>
        {children}
      </video>
      {figcaption && <figcaption className="text-sm leading-loose mb-10">{figcaption}</figcaption>}
    </figure>
  );
};
