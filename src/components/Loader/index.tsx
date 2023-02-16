import './styles.css';

export default function Loader({ loader }: { loader: boolean }) {
  if (!loader) return null;

  return (
    <div className='loader-container'>
      <span className='loader'></span>;
    </div>
  );
}
