import styled from 'styled-components';
import react, { useState, useRef } from 'react';
import sprites from '../Default/spritesheet.png';
import { db, categoryData } from './PKDB';
import { toPng } from 'html-to-image';
import { DataShow } from './DataShow';

// const imageContext = require.context(
//   '../Default',
//   false,
//   /\.(jpg|jpeg|png|webp)$/,
// );
// const categoryData = imageContext.keys().map(imageContext);

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
  const elementRef = useRef();

  const [grass, setGrass] = useState(db[0].url);
  const [water, setWater] = useState(db[0].url);
  const [fire, setFire] = useState(db[0].url);
  const [rock, setRock] = useState(db[0].url);
  const [electric, setElectric] = useState(db[0].url);
  const [ground, setGround] = useState(db[0].url);
  const [dark, setDark] = useState(db[0].url);
  const [fairy, setFairy] = useState(db[0].url);
  const [fighting, setFighting] = useState(db[0].url);
  const [psychic, setPsychic] = useState(db[0].url);
  const [steel, setSteel] = useState(db[0].url);
  const [bug, setBug] = useState(db[0].url);
  const [poison, setPoison] = useState(db[0].url);
  const [ghost, setGhost] = useState(db[0].url);
  const [normal, setNormal] = useState(db[0].url);
  const [ice, setIce] = useState(db[0].url);
  const [dragon, setDragon] = useState(db[0].url);
  const [flying, setFlying] = useState(db[0].url);

  const types = [
    {
      type: '풀',
      color: '#008000',
      engType: 'grass',
      list: [],
      func: setGrass,
      cur: grass,
    },
    {
      type: '물',
      color: '#2771fb',
      engType: 'water',
      list: [],
      func: setWater,
      cur: water,
    },
    {
      type: '불꽃',
      color: '#ff0000',
      engType: 'fire',
      list: [],
      func: setFire,
      cur: fire,
    },
    {
      type: '바위',
      color: '#cbb76f',
      engType: 'rock',
      list: [],
      func: setRock,
      cur: rock,
    },
    {
      type: '전기',
      color: '#fffb00',
      engType: 'electric',
      list: [],
      func: setElectric,
      cur: electric,
    },
    {
      type: '땅',
      color: '#ffe8ac',
      engType: 'ground',
      list: [],
      func: setGround,
      cur: ground,
    },
    {
      type: '악',
      color: '#4b4b4b',
      engType: 'dark',
      list: [],
      func: setDark,
      cur: dark,
    },
    {
      type: '페어리',
      color: '#ffc0cb',
      engType: 'fairy',
      list: [],
      func: setFairy,
      cur: fairy,
    },
    {
      type: '격투',
      color: '#8e0018',
      engType: 'fighting',
      list: [],
      func: setFighting,
      cur: fighting,
    },
    {
      type: '에스퍼',
      color: '#ff109b',
      engType: 'psychic',
      list: [],
      func: setPsychic,
      cur: psychic,
    },
    {
      type: '강철',
      color: '#bed3d6',
      engType: 'steel',
      list: [],
      func: setSteel,
      cur: steel,
    },
    {
      type: '벌레',
      color: '#74d200',
      engType: 'bug',
      list: [],
      func: setBug,
      cur: bug,
    },
    {
      type: '독',
      color: '#8f018a',
      engType: 'posion',
      list: [],
      func: setPoison,
      cur: poison,
    },
    {
      type: '고스트',
      color: '#480146',
      engType: 'ghost',
      list: [],
      func: setGhost,
      cur: ghost,
    },
    {
      type: '노말',
      color: '#eeeeee',
      engType: 'normal',
      list: [],
      func: setNormal,
      cur: normal,
    },
    {
      type: '얼음',
      color: '#94faff',
      engType: 'ice',
      list: [],
      func: setIce,
      cur: ice,
    },
    {
      type: '드래곤',
      color: '#3051ca',
      engType: 'dragon',
      list: [],
      func: setDragon,
      cur: dragon,
    },
    {
      type: '비행',
      color: '#e7f9ff',
      engType: 'flying',
      list: [],
      func: setFlying,
      cur: flying,
    },
  ];

  for (let i = 0; i < db.length; i++) {
    if (db[i].type.includes('grass')) {
      types[0].list.push(db[i]);
    }
    if (db[i].type.includes('water')) {
      types[1].list.push(db[i]);
    }
    if (db[i].type.includes('fire')) {
      types[2].list.push(db[i]);
    }
    if (db[i].type.includes('rock')) {
      types[3].list.push(db[i]);
    }
    if (db[i].type.includes('electric')) {
      types[4].list.push(db[i]);
    }
    if (db[i].type.includes('ground')) {
      types[5].list.push(db[i]);
    }
    if (db[i].type.includes('dark')) {
      types[6].list.push(db[i]);
    }
    if (db[i].type.includes('fairy')) {
      types[7].list.push(db[i]);
    }
    if (db[i].type.includes('fighting')) {
      types[8].list.push(db[i]);
    }
    if (db[i].type.includes('psychic')) {
      types[9].list.push(db[i]);
    }
    if (db[i].type.includes('steel')) {
      types[10].list.push(db[i]);
    }
    if (db[i].type.includes('bug')) {
      types[11].list.push(db[i]);
    }
    if (db[i].type.includes('poison')) {
      types[12].list.push(db[i]);
    }
    if (db[i].type.includes('ghost')) {
      types[13].list.push(db[i]);
    }
    if (db[i].type.includes('normal')) {
      types[14].list.push(db[i]);
    }
    if (db[i].type.includes('ice')) {
      types[15].list.push(db[i]);
    }
    if (db[i].type.includes('dragon')) {
      types[16].list.push(db[i]);
    }
    if (db[i].type.includes('flying')) {
      types[17].list.push(db[i]);
    }
  }

  const exportElementAsPNG = () => {
    toPng(elementRef.current).then((image) => {
      const link = window.document.createElement('a');
      link.download = 'test.png';
      link.href = image;
      link.click();
    });
  };

  return (
    <>
      {/* <DataShow /> */}
      <$Container>
        {types.map((x) => {
          return (
            <$Card style={{ backgroundColor: x.color }}>
              <select
                style={{ width: '90%' }}
                onChange={(e) => {
                  let flag = 0;
                  for (let i = 0; i < x.list.length; i++) {
                    if (x.list[i].nameKo == e.target.value.split(' ')[1]) {
                      x.func(x.list[i].url);
                      flag++;
                      break;
                    }
                  }
                  if (flag == 0) x.func(db[0].url);
                }}
              >
                <option>{x.type}</option>
                {x.list.map((y) => {
                  return (
                    <option>
                      {y.code} {y.nameKo}
                    </option>
                  );
                })}
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
                  src={x.cur}
                ></img>
              </div>
            </$Card>
          );
        })}
      </$Container>
      <div ref={elementRef}>
        {db.map((x) => {
          return (
            <img style={{ width: '128px', height: '128px' }} src={x.url} />
          );
        })}
      </div>
      <$Diagram ref={elementRef}>
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
                  src={x.cur}
                ></img>
              </div>
            </$Card2>
          );
        })}
      </$Diagram>
      <button onClick={exportElementAsPNG}>Download</button>
    </>
  );
};

export default PreferDiagram;
