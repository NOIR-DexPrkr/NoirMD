import backgroundUrl from '../background.svg';

const Background = () => {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8,
      }}
      aria-hidden="true"
    />
  );
};

export default Background;