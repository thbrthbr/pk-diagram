import { styled } from 'styled-components';
import { useRef } from 'react';
import PreferDiagram from './PreferDiagram';
import { Header } from './Header';
import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom';

const Main = () => {
  const logoRef = useRef();
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();
  const whereAmI = useLocation();

  const buttonAnimation1 = () => {
    if (buttonRef1.current) {
      buttonRef1.current.style.animation = 'jelly 0.5s linear';
      setTimeout(() => {
        buttonRef1.current.style.animation = 'none';
      }, 510);
    }
  };
  const buttonAnimation2 = () => {
    if (buttonRef2.current) {
      buttonRef2.current.style.animation = 'jelly 0.5s linear';
      setTimeout(() => {
        buttonRef2.current.style.animation = 'none';
      }, 510);
    }
  };
  return (
    <$Area id="logo">
      <Header logoRef={logoRef} />
      <div style={{ display: 'flex' }}>
        <Link to="prefer">
          <$GenerateButton ref={buttonRef1} onClick={buttonAnimation1}>
            PreferDiagram
          </$GenerateButton>
        </Link>
        <div style={{ width: '5px' }}></div>
        <Link to="tiermaker">
          <$GenerateButton ref={buttonRef2} onClick={buttonAnimation2}>
            TierGenerator
          </$GenerateButton>
        </Link>
      </div>
      {whereAmI.pathname == '/' && <PreferDiagram />}
      <Outlet />
    </$Area>
  );
};

const $GenerateButton = styled.button`
  @font-face {
    font-family: 'Giants-Inline';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Inline.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  padding: 4px;
  border-radius: 5px;
  border-style: none;
  font-family: 'Giants-Inline';
  background-color: #282828;
  color: white;
  font-size: 12px;
  animation: none;
  cursor: pointer;
  @keyframes jelly {
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
`;

const $Area = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  position: relative;
`;
export { Main };
