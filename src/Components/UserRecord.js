import styled from 'styled-components';
import { useState, useRef } from 'react';
import { db } from './PKDB';
import { toPng } from 'html-to-image';
import { MdOutlineEmail } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import Select from 'react-select';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdVerticalAlignTop } from 'react-icons/md';

const imageContext = require.context(
  '../icon',
  false,
  /\.(jpg|jpeg|png|webp|svg)$/,
);
const typeIcons = imageContext.keys().map(imageContext);

const UserRecord = () => {
  let option = [];
  let option2 = [
    { value: '#FE4D00', label: '대구힛톰즈' },
    { value: '#E7A101', label: '시흥피죤투스' },
    { value: '#FE0267', label: '아이러브일베' },
    { value: '#4F3AC7', label: '무등삼삼드래즈' },
    { value: '#7F746E', label: '신안콜로솔츠' },
    { value: '#04E1C1', label: '포갤졌좆스' },
  ];

  let tempDB = {};
  for (let i = 0; i < db.length; i++) {
    option.push({
      value: '',
      label: db[i].nameKo,
    });
    tempDB[db[i].nameKo] = db[i].url;
  }
  const [team, setTeam] = useState('');
  const [user, setUser] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [pkimg, setPkimg] = useState('');
  const [PW, setPW] = useState('');
  const [list, setList] = useState([]);
  const [locked, setLocked] = useState(true);

  const addUsedList = () => {
    let obj = list.slice(0);
    let check = false;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i][0] == user) {
        check = true;
        if (!obj[i][1].includes(pokemon)) obj[i][1].push([pokemon, pkimg]);
      }
    }
    if (check == false) {
      obj.push([user, [[pokemon, pkimg]], team]);
    }
    obj.sort((a, b) => {
      if (a[2] < b[2]) return -1;
      if (a[2] > b[2]) return 1;
      return 0;
    });
    setList(obj);
  };

  const setSearchedPokemon = (e) => {
    setPokemon(e.label);
    setPkimg(tempDB[e.label]);
  };

  const removePokemon = (name, pkname) => {
    let obj = list.slice(0);
    let target = -1;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i][0] == name) {
        let tempArr = [];
        for (let j = 0; j < obj[i][1].length; j++) {
          if (obj[i][1][j][0] !== pkname) tempArr.push(obj[i][1][j]);
        }
        obj[i][1] = tempArr;
        if (obj[i][1].length < 1) {
          target = i;
        }
      }
    }
    if (target > -1) obj.splice(target, 1);
    setList(obj);
  };

  const backup = () => {
    try {
      let prompt1 = window.prompt('파일의 이름을 정해주세요');
      if (prompt1.trim()) {
        const blob = new Blob([JSON.stringify(list)], {
          type: 'text/plain',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = prompt1;
        a.href = url;
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
      }
    } catch (e) {}
  };

  const loadTXT = () => {
    try {
      let file = document.createElement('input');
      file.type = 'file';
      file.addEventListener('change', () => {
        if (file.files[0].type !== 'text/plain') {
          alert('txt 파일만 올릴 수 있습니다');
          return;
        }
        const READER = new FileReader();
        READER.readAsText(file.files[0], 'UTF-8');
        let str = '';
        READER.onload = (e) => {
          try {
            str = e.target.result;
            let pasteData = JSON.parse(str);
            setList(pasteData);
          } catch (e) {}
        };
      });
      file.click();
    } catch (e) {}
  };

  const passwordPass = () => {
    if (PW == 'igeu') {
      setLocked(false);
    } else {
      alert('비밀번호를 확인해주세요');
    }
  };

  return (
    <>
      {locked ? (
        <$AllArea>
          <div style={{ color: 'white' }}>
            <div>비밀번호를 입력해주세요</div>
            <input
              type="password"
              value={PW}
              onChange={(e) => {
                setPW(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key == 'Enter') {
                  passwordPass();
                }
              }}
            ></input>
            <button onClick={passwordPass}>입력</button>
          </div>
        </$AllArea>
      ) : (
        <$Container>
          <br></br>
          <div>
            <button onClick={backup}>백업</button>
            <button onClick={loadTXT}>로드</button>
            <br></br>
            <br></br>
            <div>사용목록들</div>
          </div>
          <br></br>
          <$PlayerPlace>
            {option2.map((x) => {
              let teamName = x.label;
              return (
                <div>
                  <div
                    style={{
                      color: x.value,
                      fontSize: '30px',
                      fontWeight: 900,
                    }}
                  >
                    :::{teamName}:::
                  </div>
                  <$List>
                    {list.map(([name, pknames, team]) => {
                      if (team == teamName) {
                        return (
                          <$EachPlayer>
                            <$PlayerName style={{ color: x.value }}>
                              &lt;{name}&gt;
                            </$PlayerName>
                            {pknames.map((pkname) => {
                              return (
                                <$EachList>
                                  <$Dot src={pkname[1]}></$Dot>
                                  <span>
                                    {pkname[0]}{' '}
                                    <$DeleteButton
                                      onClick={() => {
                                        removePokemon(name, pkname[0]);
                                      }}
                                    >
                                      <IoCloseCircleOutline />
                                    </$DeleteButton>
                                  </span>
                                </$EachList>
                              );
                            })}
                          </$EachPlayer>
                        );
                      }
                    })}
                  </$List>
                </div>
              );
            })}
          </$PlayerPlace>
          <br></br>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>팀이름</div>
            <$Select
              options={option2}
              onChange={(e) => {
                setTeam(e.label);
              }}
            ></$Select>
          </div>
          <br></br>
          <div>
            <div>선수이름</div>
            <input
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            ></input>
          </div>
          <br></br>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>사용한 포켓몬</div>
            <div style={{ display: 'flex' }}>
              <$Select options={option} onChange={setSearchedPokemon}></$Select>
              <button onClick={addUsedList}>제출</button>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </$Container>
      )}
    </>
  );
};

export { UserRecord };

const $Container = styled.div`
  font-family: 'wehaven-regular';
`;

const $PlayerPlace = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const $List = styled.div`
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const $EachList = styled.div`
  background-color: lavender;
  margin: 5px;
  height: 40px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;

const $EachPlayer = styled.div`
  padding: 20px;
  width: 150px;
`;

const $PlayerName = styled.div`
  font-size: 20px;
  color: blue;
  font-weight: 900;
`;

const $Select = styled(Select)`
  width: 200px;
`;

const $Dot = styled.img`
  width: 30px;
  height: auto;
`;

const $DeleteButton = styled.span`
  cursor: pointer;
  font-size: 12px;
`;

const $AllArea = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
