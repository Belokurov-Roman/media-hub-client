// import page from '../../../../../../UsersDownloads/2022-04-10 20.17.46.jpg';
// import tee from '../../../../../../Users/danakusev/Downloads/22222.jpg';
// const tree = './../../../../../../Users/danakusev/Downloads/22222.jpg';
// console.log(tee);

function Img({ path }) {
  return (
    <>
      <img
        style={{ width: '300px' }}
        src={`${path}`}
        alt="..."
      />
      <p>{path}</p>
    </>
  );
}
export default Img;
