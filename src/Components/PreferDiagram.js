import styled from 'styled-components';
import react, { useState, useRef, useEffect } from 'react';
import sprites from '../Default/spritesheet.png';
import { db, categoryData } from './PKDB';
import { toPng } from 'html-to-image';
import { DataShow } from './DataShow';
import { FaLanguage } from 'react-icons/fa';
import Select from 'react-select';

// const imageContext = require.context(
//   '../Default',
//   false,
//   /\.(jpg|jpeg|png|webp)$/,
// );
// const categoryData = imageContext.keys().map(imageContext);

const PreferDiagram = () => {
  const elementRef = useRef();
  const isMounted = useRef(false);
  let option = [
    { value: 'korean', label: '한국어' },
    { value: 'english', label: 'English' },
  ];

  const [toggler, setToggler] = useState(false);
  const [language, setLanguage] = useState('korean');
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
      type: '노말',
      color: '#999999',
      engType: 'normal',
      list: [],
      func: setNormal,
      cur: normal,
    },
    {
      type: '불꽃',
      color: '#FF612C',
      engType: 'fire',
      list: [],
      func: setFire,
      cur: fire,
    },
    {
      type: '물',
      color: '#2992FF',
      engType: 'water',
      list: [],
      func: setWater,
      cur: water,
    },
    {
      type: '풀',
      color: '#42BF24',
      engType: 'grass',
      list: [],
      func: setGrass,
      cur: grass,
    },
    {
      type: '전기',
      color: '#FFDB00',
      engType: 'electric',
      list: [],
      func: setElectric,
      cur: electric,
    },
    {
      type: '얼음',
      color: '#42D8FF',
      engType: 'ice',
      list: [],
      func: setIce,
      cur: ice,
    },
    {
      type: '격투',
      color: '#FFA202',
      engType: 'fighting',
      list: [],
      func: setFighting,
      cur: fighting,
    },
    {
      type: '독',
      color: '#994DCF',
      engType: 'posion',
      list: [],
      func: setPoison,
      cur: poison,
    },
    {
      type: '땅',
      color: '#AB7939',
      engType: 'ground',
      list: [],
      func: setGround,
      cur: ground,
    },
    {
      type: '비행',
      color: '#95C9FF',
      engType: 'flying',
      list: [],
      func: setFlying,
      cur: flying,
    },
    {
      type: '에스퍼',
      color: '#FF637F',
      engType: 'psychic',
      list: [],
      func: setPsychic,
      cur: psychic,
    },
    {
      type: '벌레',
      color: '#9FA424',
      engType: 'bug',
      list: [],
      func: setBug,
      cur: bug,
    },
    {
      type: '바위',
      color: '#BCB889',
      engType: 'rock',
      list: [],
      func: setRock,
      cur: rock,
    },
    {
      type: '고스트',
      color: '#6E4570',
      engType: 'ghost',
      list: [],
      func: setGhost,
      cur: ghost,
    },
    {
      type: '드래곤',
      color: '#5462D6',
      engType: 'dragon',
      list: [],
      func: setDragon,
      cur: dragon,
    },
    {
      type: '악',
      color: '#4F4747',
      engType: 'dark',
      list: [],
      func: setDark,
      cur: dark,
    },
    {
      type: '강철',
      color: '#6AAED3',
      engType: 'steel',
      list: [],
      func: setSteel,
      cur: steel,
    },
    {
      type: '페어리',
      color: '#FFB1FF',
      engType: 'fairy',
      list: [],
      func: setFairy,
      cur: fairy,
    },
  ];

  for (let i = 0; i < db.length; i++) {
    if (db[i].type.includes('normal')) {
      types[0].list.push(db[i]);
    }
    if (db[i].type.includes('fire')) {
      types[1].list.push(db[i]);
    }
    if (db[i].type.includes('water')) {
      types[2].list.push(db[i]);
    }
    if (db[i].type.includes('grass')) {
      types[3].list.push(db[i]);
    }
    if (db[i].type.includes('electric')) {
      types[4].list.push(db[i]);
    }
    if (db[i].type.includes('ice')) {
      types[5].list.push(db[i]);
    }
    if (db[i].type.includes('fighting')) {
      types[6].list.push(db[i]);
    }
    if (db[i].type.includes('poison')) {
      types[7].list.push(db[i]);
    }
    if (db[i].type.includes('ground')) {
      types[8].list.push(db[i]);
    }
    if (db[i].type.includes('flying')) {
      types[9].list.push(db[i]);
    }
    if (db[i].type.includes('psychic')) {
      types[10].list.push(db[i]);
    }
    if (db[i].type.includes('bug')) {
      types[11].list.push(db[i]);
    }
    if (db[i].type.includes('rock')) {
      types[12].list.push(db[i]);
    }
    if (db[i].type.includes('ghost')) {
      types[13].list.push(db[i]);
    }
    if (db[i].type.includes('dragon')) {
      types[14].list.push(db[i]);
    }
    if (db[i].type.includes('dark')) {
      types[15].list.push(db[i]);
    }
    if (db[i].type.includes('steel')) {
      types[16].list.push(db[i]);
    }
    if (db[i].type.includes('fairy')) {
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

  const languageChanger = (e) => {
    if (e.value.length < 0) return;
    if (e.value === 'korean') {
      setLanguage('korean');
    } else if (e.value === 'english') {
      setLanguage('english');
    }
  };

  const picker = (x, e) => {
    console.log(e);
    let flag = 0;
    for (let i = 0; i < x.list.length; i++) {
      if (language == 'korean') {
        if (x.list[i].nameKo == e.target.value.split(' ')[1]) {
          x.func(x.list[i].url);
          flag++;
          break;
        }
      } else if (language == 'english') {
        if (x.list[i].name == e.target.value.split(' ')[1]) {
          x.func(x.list[i].url);
          flag++;
          break;
        }
      }
    }
    if (flag == 0) x.func(db[0].url);
  };

  const picker2 = (x, e) => {
    console.log(e);
    let flag = 0;
    for (let i = 0; i < x.list.length; i++) {
      if (language == 'korean') {
        if (x.list[i].nameKo == e.value.split(' ')[1]) {
          x.func(x.list[i].url);
          flag++;
          break;
        }
      } else if (language == 'english') {
        if (x.list[i].name == e.value.split(' ')[1]) {
          x.func(x.list[i].url);
          flag++;
          break;
        }
      }
    }
    if (flag == 0) x.func(db[0].url);
  };

  const listMaker = () => {
    for (let i = 0; i < types.length; i++) {}
  };

  const eachTypeSelector = (type) => {
    let option = [];
    for (let i = 0; i < types.length; i++) {
      if (types[i].type == type) {
        for (let j = 0; j < types[i].list.length; j++) {
          option.push({
            value: `${types[i].list[j].code} ${
              language == 'korean'
                ? types[i].list[j].nameKo
                : types[i].list[j].name
            }`,
            label: `${types[i].list[j].code} ${
              language == 'korean'
                ? types[i].list[j].nameKo
                : types[i].list[j].name
            }`,
          });
        }
        option.unshift({
          value:
            language == 'korean'
              ? types[i].type
              : types[i].engType[0].toUpperCase() + types[i].engType.slice(1),
          label:
            language == 'korean'
              ? types[i].type
              : types[i].engType[0].toUpperCase() + types[i].engType.slice(1),
        });
        break;
      }
    }
    return option;
  };

  useEffect(() => {
    listMaker();
  }, []);

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // const quickView = () => {
  //   setToggler(!toggler);
  // };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const place = document.getElementById('here');
  //     place.scrollIntoView(false);
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [toggler]);

  return (
    <$Area>
      <Select
        options={option}
        onChange={languageChanger}
        placeholder={<FaLanguage style={{ fontSize: '30px' }} />}
      ></Select>
      <$Container>
        {types.map((x) => {
          let option = eachTypeSelector(x.type);
          return (
            <$Card style={{ backgroundColor: x.color }}>
              <$TypeWrapper>
                {language == 'korean'
                  ? x.type + ' 타입'
                  : x.engType[0].toUpperCase() + x.engType.slice(1) + ' Type'}
              </$TypeWrapper>
              <$customSelect
                options={option}
                onChange={(e) => {
                  picker2(x, e);
                }}
                value={''}
                placeholder={language == 'korean' ? '검색' : 'Search'}
              ></$customSelect>
              <img
                style={{ margin: '10px', width: '128px', height: '128px' }}
                src={x.cur}
              ></img>
            </$Card>
          );
        })}
      </$Container>
      {/* <button onClick={quickView}>
        <h1>{toggler ? '접기' : '펼치기'}</h1>
      </button>
      <div ref={elementRef}>
        {toggler &&
          db.map((x) => {
            return (
              <img style={{ width: '128px', height: '128px' }} src={x.url} />
            );
          })}
      </div>
      <button id="here" onClick={quickView}>
        <h1>{toggler ? '접기' : '펼치기'}</h1>
      </button> */}
      <$Diagram ref={elementRef}>
        {types.map((x) => {
          return (
            <$Card2 style={{ backgroundColor: x.color }}>
              <h2 style={{ margin: 0 }}>
                {language == 'korean' ? x.type : x.engType}
              </h2>
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
    </$Area>
  );
};

const $Area = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const $Diagram = styled.div`
  width: 90vw;
  margin: 5px 5px 5px 5px;
  border: 1px black solid;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const $Card = styled.div`
  width: 200px;
  /* height: 200px; */
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
`;

const $Card2 = styled.div`
  width: 16vw;
  min-width: 150px;
  height: 23vw;
  min-height: 178px;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
`;

const $TypeWrapper = styled.div`
  padding: 10px;
`;

const $customSelect = styled(Select)`
  margin: 10px;
`;

export default PreferDiagram;
