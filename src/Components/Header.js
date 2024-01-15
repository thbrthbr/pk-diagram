import styled from 'styled-components';
import Logo from '../Logo/PK-DIAGRAM.png';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  let { logoRef } = props;

  return (
    <$Logo
      ref={logoRef}
      onClick={() => {
        window.location.reload();
      }}
    >
      <img id="logo" src={Logo}></img>
      <div>PK-DIAGRAM</div>
    </$Logo>
  );
};

const $Home = styled(Link)`
  text-decoration: none;
`;

const $Logo = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  font-family: 'monoton';
  font-size: 30px;
  color: #cb6ce6;
  cursor: pointer;
  & img {
    width: 250px;
  }
  & div {
    margin-top: -20px;
  }
`;
export { Header };
