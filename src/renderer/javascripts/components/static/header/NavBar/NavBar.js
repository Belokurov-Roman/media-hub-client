import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import LogotipIcon from 'LogoTest.svg';
import { useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';

function NavBar() {
  const [user, setUser] = useState();
  useSelector((store) => {
    try {
      setUser(store.user.id);
    } catch (error) {
      ipcRenderer.invoke('get-user')
        .then((res) => setUser(res.online));
    }
  });

  function checkOnline() {
    if (!user) ipcRenderer.send('create-win-aut');
  }

  function getEndPoint() {
    return window.location.href.replace('file://', '');
  }

  return (
    <div className="navbar">
      <LogotipIcon className="Logo" viewBox="0 0 1100 265.86" />
      <div className="links-nav-bar">
        <Link className="link TextLinks" to="/">МЕДИА</Link>
        <Link className="link TextLinks" to="/game">ИГРЫ</Link>
        <Link className="link TextLinks" onClick={checkOnline} to={user ? '/profile' : getEndPoint()}>ПРОФИЛЬ</Link>
      </div>
    </div>
  );
}
// <Link className="link" to="/">ВЫХОД</Link>

export default NavBar;
// <div className="link" />
// const NavBar = () => {
//     return (
//         <div className={styles.navBar}>
//             <img
//                 alt=""
//                 className={styles.bgcolor}
//                 src="https://static.overlay-tech.com/assets/a4c7f454-d734-4ee3-92c8-7cfca3895aca.svg"
//             />
//             <div className={styles.namenaf}>
//                 <img
//                     alt=""
//                     className={styles.logoMedia}
//                     src="https://static.overlay-tech.com/assets/8f07bf37-152c-40ca-aaa2-942defa5199f.svg"
//                 />
//                 <div className={styles.vkladki}>
//                     <div className={styles.flexWrapperOne}>
//                         <p className={styles.linlMedia}>МЕДИА</p>
//                         <div className={styles.divingLine} />
//                     </div>
//                     <p className={styles.linkGame}>ИГРЫ</p>
//                     <p className={styles.linkProfile}>ПРОФИЛЬ</p>
//                 </div>
//             </div>
//             <p className={styles.logout}>Войти</p>
//         </div>
//     );
// };
//
// export default NavBar;

// .navBar {
//     padding: 0 9px 0 0;
// }
// .bgcolor {
//     width: 100.15%;
//     height: 135.63%;
//     margin-left: -1.5px;
//     position: relative;
// }
// .namenaf {
//     display: flex;
//     align-items: flex-start;
//     position: absolute;
//     left: 148px;
//     top: 20px;
// }
// .logoMedia {
//     width: 173.33px;
//     height: 28px;
//     margin-right: 80.67px;
// }
// .vkladki {
//     margin-top: 6px;
//     display: flex;
//     align-items: flex-start;
// }
// .flexWrapperOne {
//     margin-right: 24px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// }
// .linlMedia {
//     height: 82.76%;
//     color: $white;
//     align-self: stretch;
//     margin-bottom: 3px;
// @include montserrat-20-medium;
// }
// .divingLine {
//     width: 96.3%;
//     height: 6.9%;
//     background-color: $medium-violet-red;
//     border-radius: 7px;
// }
// .linkGame {
//     width: 20.39%;
//     height: 82.76%;
//     color: $white;
//     margin-right: 24px;
// @include montserrat-20-medium;
// }
// .linkProfile {
//     width: 37.17%;
//     height: 82.76%;
//     color: $white;
// @include montserrat-20-medium;
// }
// .logout {
//     width: 5.15%;
//     height: 25%;
//     color: $gainsboro;
//     position: absolute;
//     right: 73px;
//     top: -7px;
// @include montserrat-16-regular;
// }
