import styled from 'styled-components';

import sprites from '../Default/spritesheet.png';
import db from './PKDB';

const imageContext = require.context(
  '../Default',
  false,
  /\.(jpg|jpeg|png|webp)$/,
);
const categoryData = imageContext.keys().map(imageContext);

console.log(categoryData);
console.log(categoryData[0]);

const $Container = styled.div`
  display: flex;
  justify-content: 'center';
  flex-wrap: wrap;
`;

const $Diagram = styled.div`
  width: 90vw;
  margin: 5px 5px 5px 5px;
  border: 1px black solid;
  border-radius: 5px;
  display: flex;
  justify-content: 'center';
`;

const $Card = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
`;

const $Card2 = styled.div`
  width: 16vw;
  height: 23vw;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
`;

const PreferDiagram = () => {
  const types = [
    { type: '풀', color: '#008000', engType: 'grass', list: [] },
    { type: '물', color: '#2771fb', engType: 'water', list: [] },
    { type: '불꽃', color: '#ff0000', engType: 'fire', list: [] },
    { type: '바위', color: '#cbb76f', engType: 'rock', list: [] },
    { type: '전기', color: '#fffb00', engType: 'electric', list: [] },
    { type: '땅', color: '#ffe8ac', engType: 'ground', list: [] },
    { type: '악', color: '#4b4b4b', engType: 'dark', list: [] },
    { type: '페어리', color: '#ffc0cb', engType: 'fairy', list: [] },
    { type: '격투', color: '#8e0018', engType: 'fighting', list: [] },
    { type: '에스퍼', color: '#ff109b', engType: 'psychic', list: [] },
    { type: '강철', color: '#bed3d6', engType: 'steel', list: [] },
    { type: '벌레', color: '#74d200', engType: 'bug', list: [] },
    { type: '독', color: '#8f018a', engType: 'posion', list: [] },
    { type: '고스트', color: '#480146', engType: 'ghost', list: [] },
    { type: '노말', color: '#eeeeee', engType: 'normal', list: [] },
    { type: '얼음', color: '#94faff', engType: 'ice', list: [] },
    { type: '드래곤', color: '#3051ca', engType: 'dragon', list: [] },
    { type: '비행', color: '#e7f9ff', engType: 'flying', list: [] },
  ];

  return (
    <>
      <$Container>
        {types.map((x) => {
          return (
            <$Card style={{ backgroundColor: x.color }}>
              <select style={{ width: '90%' }}>
                <option>{x.type}</option>
              </select>
              <div
                style={{
                  height: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  style={{ width: '128px', height: '128px' }}
                  src="https://archives.bulbagarden.net/media/upload/a/a0/Menu_HOME_Egg.png"
                ></img>
              </div>
            </$Card>
          );
        })}
      </$Container>
      <div style={{ width: '128px', height: '128px', overflow: 'hidden' }}>
        <img style={{ margin: '0px 0px 0px -512px' }} src={sprites}></img>
      </div>
      {/* <img
        alt="failbaby"
        src="https://archives.bulbagarden.net/media/upload/4/48/Menu_HOME_0999-Roaming.png"
      ></img> */}
      <img alt="failbaby" src={categoryData[0]}></img>
      {/* {db.map((x) => {
        return <img src={x.url} />;
      })} */}
      <$Diagram>
        {types.map((x) => {
          return (
            <$Card2 style={{ backgroundColor: x.color }}>
              <h2 style={{ margin: 0 }}>{x.engType}</h2>
              <div
                style={{
                  height: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  style={{ width: '128px', height: '128px' }}
                  src="https://archives.bulbagarden.net/media/upload/a/a0/Menu_HOME_Egg.png"
                ></img>
              </div>
            </$Card2>
          );
        })}
      </$Diagram>
    </>
  );
};

export default PreferDiagram;
