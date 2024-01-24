import { styled } from 'styled-components';
import { db } from './PKDB';
import { createElement, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import unknown from '../trainer/unknown.png';
import Logo from '../Logo/logopicker.jpg';
import { GrPowerReset } from 'react-icons/gr';
import { toPng, toSvg, toJpeg } from 'html-to-image';
import { BsFiletypeTxt } from 'react-icons/bs';
import { FaRegQuestionCircle } from 'react-icons/fa';
import dice2 from '../items/dice2.png';
import leader2 from '../items/leader2.png';
import dice from '../items/dice.png';
import leader from '../items/leader.png';

const imageContext = require.context(
  '../teamlogos',
  false,
  /\.(jpg|jpeg|png|webp)$/,
);
const categoryData = imageContext.keys().map(imageContext);

const LeagueTemplate = () => {
  let option = [];
  for (let i = 0; i < db.length; i++) {
    option.push({
      value: db[i].url,
      label: db[i].nameKo,
    });
  }

  let option2 = [];
  let name = [
    '대구힛톰즈',
    '시흥피죤투스',
    '무등삼삼드래즈',
    '신안콜로솔츠',
    '아이러브일베',
    '포갤졌좆스',
  ];
  let colorOfTeams = {
    대구힛톰즈: '#FE4D00',
    시흥피죤투스: '#E7A101',
    무등삼삼드래즈: '#4F3AC7',
    신안콜로솔츠: '#7F746E',
    아이러브일베: '#FE0267',
    포갤졌좆스: '#04E1C1',
  };
  for (let i = 0; i < categoryData.length; i++) {
    option2.push({
      value: categoryData[i],
      label: name[i],
    });
  }

  const isMounted = useRef(null);
  const isMounted2 = useRef(null);
  const downloadRef = useRef(null);
  const buttonRef = useRef(null);
  const [locked, setLocked] = useState(true);
  const [activated, setActivated] = useState(false);
  const [pasteInput, setPasteInput] = useState(false);
  const [pastedValue, setPastedValue] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [nameSearcher, setNameSearcher] = useState(false);
  const [who, setWho] = useState('');
  const [searchingOne, setSearchingOne] = useState('');
  const [eachPK, setEachPK] = useState('');
  const [SD, setSD] = useState('double');
  const [tempSave, setTempSave] = useState({
    name: 'second',
    teamLogo: Logo,
    teamColor: 'grey',
    players: [
      {
        name: 'second',
        teamLogo: Logo,
        teamColor: 'grey',
        players: [
          {
            playerName: '',
            playerWidth: '5vw',
            playerLabel: [],
            playerId: 6,
            playerAvatar: '',
            entry: [
              { src: '', id: 61 },
              { src: '', id: 62 },
              { src: '', id: 63 },
              { src: '', id: 64 },
              { src: '', id: 65 },
              { src: '', id: 66 },
              { src: '', id: 67 },
              { src: '', id: 68 },
              { src: '', id: 69 },
              { src: '', id: 70 },
              { src: '', id: 71 },
              { src: '', id: 72 },
            ],
          },
          {
            playerName: '',
            playerWidth: '5vw',
            playerLabel: [],
            playerId: 7,
            playerAvatar: '',
            entry: [
              { src: '', id: 73 },
              { src: '', id: 74 },
              { src: '', id: 75 },
              { src: '', id: 76 },
              { src: '', id: 77 },
              { src: '', id: 78 },
              { src: '', id: 79 },
              { src: '', id: 80 },
              { src: '', id: 81 },
              { src: '', id: 82 },
              { src: '', id: 83 },
              { src: '', id: 84 },
            ],
          },
          {
            playerName: '',
            playerWidth: '5vw',
            playerLabel: [],
            playerId: 8,
            playerAvatar: '',
            entry: [
              { src: '', id: 85 },
              { src: '', id: 86 },
              { src: '', id: 87 },
              { src: '', id: 88 },
              { src: '', id: 89 },
              { src: '', id: 90 },
              { src: '', id: 91 },
              { src: '', id: 92 },
              { src: '', id: 93 },
              { src: '', id: 94 },
              { src: '', id: 95 },
              { src: '', id: 96 },
            ],
          },
          {
            playerName: '',
            playerWidth: '5vw',
            playerLabel: [],
            playerId: 9,
            playerAvatar: '',
            entry: [
              { src: '', id: 97 },
              { src: '', id: 98 },
              { src: '', id: 99 },
              { src: '', id: 100 },
              { src: '', id: 101 },
              { src: '', id: 102 },
              { src: '', id: 103 },
              { src: '', id: 104 },
              { src: '', id: 105 },
              { src: '', id: 106 },
              { src: '', id: 107 },
              { src: '', id: 108 },
            ],
          },
          {
            playerName: '',
            playerWidth: '5vw',
            playerLabel: [],
            playerId: 10,
            playerAvatar: '',
            entry: [
              { src: '', id: 109 },
              { src: '', id: 110 },
              { src: '', id: 111 },
              { src: '', id: 112 },
              { src: '', id: 113 },
              { src: '', id: 114 },
              { src: '', id: 115 },
              { src: '', id: 116 },
              { src: '', id: 117 },
              { src: '', id: 118 },
              { src: '', id: 119 },
              { src: '', id: 120 },
            ],
          },
        ],
      },
    ],
  });
  const [eachSide, setEachSide] = useState([
    {
      name: 'first',
      teamLogo: Logo,
      teamColor: 'grey',
      players: [
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 1,
          playerAvatar: '',
          entry: [
            { src: '', id: 1 },
            { src: '', id: 2 },
            { src: '', id: 3 },
            { src: '', id: 4 },
            { src: '', id: 5 },
            { src: '', id: 6 },
            { src: '', id: 7 },
            { src: '', id: 8 },
            { src: '', id: 9 },
            { src: '', id: 10 },
            { src: '', id: 11 },
            { src: '', id: 12 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 2,
          playerAvatar: '',
          entry: [
            { src: '', id: 13 },
            { src: '', id: 14 },
            { src: '', id: 15 },
            { src: '', id: 16 },
            { src: '', id: 17 },
            { src: '', id: 18 },
            { src: '', id: 19 },
            { src: '', id: 20 },
            { src: '', id: 21 },
            { src: '', id: 22 },
            { src: '', id: 23 },
            { src: '', id: 24 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 3,
          playerAvatar: '',
          entry: [
            { src: '', id: 25 },
            { src: '', id: 26 },
            { src: '', id: 27 },
            { src: '', id: 28 },
            { src: '', id: 29 },
            { src: '', id: 30 },
            { src: '', id: 31 },
            { src: '', id: 32 },
            { src: '', id: 33 },
            { src: '', id: 34 },
            { src: '', id: 35 },
            { src: '', id: 36 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 4,
          playerAvatar: '',
          entry: [
            { src: '', id: 37 },
            { src: '', id: 38 },
            { src: '', id: 39 },
            { src: '', id: 40 },
            { src: '', id: 41 },
            { src: '', id: 42 },
            { src: '', id: 43 },
            { src: '', id: 44 },
            { src: '', id: 45 },
            { src: '', id: 46 },
            { src: '', id: 47 },
            { src: '', id: 48 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 5,
          playerAvatar: '',
          entry: [
            { src: '', id: 49 },
            { src: '', id: 50 },
            { src: '', id: 51 },
            { src: '', id: 52 },
            { src: '', id: 53 },
            { src: '', id: 54 },
            { src: '', id: 55 },
            { src: '', id: 56 },
            { src: '', id: 57 },
            { src: '', id: 58 },
            { src: '', id: 59 },
            { src: '', id: 60 },
          ],
        },
      ],
    },
    {
      name: 'second',
      teamLogo: Logo,
      teamColor: 'grey',
      players: [
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 6,
          playerAvatar: '',
          entry: [
            { src: '', id: 61 },
            { src: '', id: 62 },
            { src: '', id: 63 },
            { src: '', id: 64 },
            { src: '', id: 65 },
            { src: '', id: 66 },
            { src: '', id: 67 },
            { src: '', id: 68 },
            { src: '', id: 69 },
            { src: '', id: 70 },
            { src: '', id: 71 },
            { src: '', id: 72 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 7,
          playerAvatar: '',
          entry: [
            { src: '', id: 73 },
            { src: '', id: 74 },
            { src: '', id: 75 },
            { src: '', id: 76 },
            { src: '', id: 77 },
            { src: '', id: 78 },
            { src: '', id: 79 },
            { src: '', id: 80 },
            { src: '', id: 81 },
            { src: '', id: 82 },
            { src: '', id: 83 },
            { src: '', id: 84 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 8,
          playerAvatar: '',
          entry: [
            { src: '', id: 85 },
            { src: '', id: 86 },
            { src: '', id: 87 },
            { src: '', id: 88 },
            { src: '', id: 89 },
            { src: '', id: 90 },
            { src: '', id: 91 },
            { src: '', id: 92 },
            { src: '', id: 93 },
            { src: '', id: 94 },
            { src: '', id: 95 },
            { src: '', id: 96 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 9,
          playerAvatar: '',
          entry: [
            { src: '', id: 97 },
            { src: '', id: 98 },
            { src: '', id: 99 },
            { src: '', id: 100 },
            { src: '', id: 101 },
            { src: '', id: 102 },
            { src: '', id: 103 },
            { src: '', id: 104 },
            { src: '', id: 105 },
            { src: '', id: 106 },
            { src: '', id: 107 },
            { src: '', id: 108 },
          ],
        },
        {
          playerName: '',
          playerWidth: '5vw',
          playerLabel: [],
          playerId: 10,
          playerAvatar: '',
          entry: [
            { src: '', id: 109 },
            { src: '', id: 110 },
            { src: '', id: 111 },
            { src: '', id: 112 },
            { src: '', id: 113 },
            { src: '', id: 114 },
            { src: '', id: 115 },
            { src: '', id: 116 },
            { src: '', id: 117 },
            { src: '', id: 118 },
            { src: '', id: 119 },
            { src: '', id: 120 },
          ],
        },
      ],
    },
  ]);

  const buttonAnimation = () => {
    if (buttonRef.current) {
      buttonRef.current.style.animation = 'jelly 0.5s linear';
      setTimeout(() => {
        buttonRef.current.style.animation = 'none';
      }, 510);
    }
  };

  const entryInput = (id) => {
    setPasteInput(!pasteInput);
    setSelectedPlayer(id);
  };

  const resetEntry = (id) => {
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].players.length; j++) {
        if (copy[i].players[j].playerId == id) {
          for (let a = 0; a < copy[i].players[j].entry.length; a++) {
            copy[i].players[j].entry[a].src = '';
          }
        }
      }
    }
    setEachSide(copy);
  };

  const pasteRead = () => {
    if (pastedValue) {
      let list = [];
      let sorted = pastedValue.split('\n');
      for (let i = 0; i < sorted.length; i++) {
        let start = false;
        let nameOfPK = '';
        if (sorted[i].includes('(')) {
          for (let j = 0; j < sorted[i].length; j++) {
            if (sorted[i][j] == '(') {
              start = true;
              continue;
            }
            if (start) {
              if (sorted[i][j] == ')') {
                if (nameOfPK == 'M') {
                  nameOfPK = sorted[i].split(' ')[0] + '-Male';
                } else if (nameOfPK == 'F') {
                  nameOfPK = sorted[i].split(' ')[0] + 'emale';
                }
                break;
              } else {
                nameOfPK += sorted[i][j];
              }
            }
          }
        } else {
          if (sorted[i].includes('@')) {
            for (let j = 0; j < sorted[i].length; j++) {
              if (sorted[i][j] == '@') break;
              nameOfPK += sorted[i][j];
            }
          } else {
            if (!sorted[i].includes(':')) {
              nameOfPK = sorted[i];
            }
          }
        }
        if (nameOfPK[nameOfPK.length - 1] == 'F') {
          nameOfPK += 'emale';
        }

        if (nameOfPK.length > 0) {
          list.push(nameOfPK.trim());
        }
      }
      console.log(list);
      let srcList = [];
      for (let i = 0; i < db.length; i++) {
        if (list.includes(db[i].name)) {
          srcList.push(db[i].url);
        }
      }
      console.log(srcList);
      if (srcList.length < 12) {
        let temp = srcList.length;
        for (let i = 0; i < 12 - temp; i++) {
          srcList.push('');
        }
      }
      console.log(srcList);
      let copy = eachSide.slice();
      for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy[i].players.length; j++) {
          if (copy[i].players[j].playerId == selectedPlayer) {
            for (let a = 0; a < copy[i].players[j].entry.length; a++) {
              copy[i].players[j].entry[a].src = srcList[a];
            }
          }
        }
      }

      if (srcList.join('').length !== 0) {
        setPasteInput(!pasteInput);
        setEachSide(copy);
        setPastedValue('');
      }
    }
  };

  const eachPlayerNameChange = (text, id, pw) => {
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].players.length; j++) {
        if (copy[i].players[j].playerId == id) {
          copy[i].players[j].playerName = text;
          break;
        }
      }
    }
    setEachSide(copy);
    setWho(pw + ':' + Date.now());
  };

  const ban = (id) => {
    if (
      document.getElementById(id).style.backgroundColor !== 'rgba(0, 0, 0, 0.8)'
    ) {
      document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
      document.getElementById(id).style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
  };

  const searchOn = () => {
    setNameSearcher(true);
  };

  const searchAndSet = (e) => {
    console.log();
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].players.length; j++) {
        for (let a = 0; a < copy[i].players[j].entry.length; a++) {
          if (copy[i].players[j].entry[a].id == eachPK) {
            copy[i].players[j].entry[a].src = e.value;
          }
        }
      }
    }
    setEachSide(copy);
  };

  const pickAvatar = (id) => {
    let temp = document.createElement('input');
    temp.type = 'file';
    temp.addEventListener('change', () => {
      let reader = new FileReader();
      reader.onloadend = () => {
        let copy = eachSide.slice();
        for (let i = 0; i < copy.length; i++) {
          for (let j = 0; j < copy[i].players.length; j++) {
            if (id == copy[i].players[j].playerId) {
              copy[i].players[j].playerAvatar = reader.result;
              break;
            }
          }
        }
        setEachSide(copy);
      };
      reader.readAsDataURL(temp.files[0]);
    });
    temp.click();
  };

  const pickLogo = (id) => {
    let temp = document.createElement('input');
    temp.type = 'file';
    temp.addEventListener('change', () => {
      let reader = new FileReader();
      reader.onloadend = () => {
        let copy = eachSide.slice();
        for (let i = 0; i < copy.length; i++) {
          if (id == copy[i].name) {
            copy[i].teamLogo = reader.result;
            break;
          }
        }
        setEachSide(copy);
      };
      reader.readAsDataURL(temp.files[0]);
    });
    temp.click();
  };

  const pickLogo2 = (label, logo, id) => {
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      if (id == copy[i].name) {
        copy[i].teamLogo = logo;
        copy[i].teamColor = colorOfTeams[label];
        break;
      }
    }
    setEachSide(copy);
  };

  const widthSetter = (id, widthNew) => {
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].players.length; j++) {
        if (copy[i].players[j].playerId == id) {
          copy[i].players[j].playerWidth = widthNew;
          break;
        }
      }
    }
    setEachSide(copy);
  };

  const pxToVw = (pxValue) => {
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const vwValue = (pxValue / viewportWidth) * 100;
    return vwValue;
  };

  const SDpicker = (e) => {
    setSD(e.value);
  };

  const exportElementAsPNG2 = () => {
    buttonAnimation();
    if (downloadRef.current) {
      let matches = document.getElementsByClassName('disappear');
      for (let i = 0; i < matches.length; i++) {
        if (i == 1 || i == 7) {
          matches[i].style.display = 'none';
        } else {
          matches[i].style.visibility = 'hidden';
        }
      }
      if (downloadRef.current) {
        toPng(downloadRef.current).then((image2) => {
          const a = document.createElement('a');
          a.href = image2;
          a.download = 'league-diagram.png';
          a.click();
          for (let i = 0; i < matches.length; i++) {
            if (i == 1 || i == 7) {
              matches[i].style.display = 'block';
            } else {
              matches[i].style.visibility = 'visible';
            }
          }
        });
      }
    }
  };

  const manual = () => {
    alert(
      'PC크롬쓰세요 \n현재 브라우저창 크기에 따라 다운받아지는 이미지 크기가 달리지니 \n원하는대로 조절해서 쓰세요',
    );
  };

  const optionAdder = (direction, id) => {
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].players.length; j++) {
        if (copy[i].players[j].playerId == id) {
          if (direction == 'first') {
            copy[i].players[j].playerLabel.push('dice:' + Date.now());
          } else {
            copy[i].players[j].playerLabel.unshift('dice:' + Date.now());
          }
          break;
        }
      }
    }
    setEachSide(copy);
  };

  const optionRemover = (id, labelId) => {
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].players.length; j++) {
        if (copy[i].players[j].playerId == id) {
          copy[i].players[j].playerLabel.splice(
            copy[i].players[j].playerLabel.indexOf(labelId),
            1,
          );
          break;
        }
      }
    }
    setEachSide(copy);
  };

  const optionChanger = (id, labelId) => {
    let copy = eachSide.slice();
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].players.length; j++) {
        if (copy[i].players[j].playerId == id) {
          for (let a = 0; a < copy[i].players[j].playerLabel.length; a++) {
            if (copy[i].players[j].playerLabel[a] == labelId) {
              let temp = copy[i].players[j].playerLabel[a];
              if (temp.split(':')[0] == 'dice') {
                copy[i].players[j].playerLabel[a] =
                  'leader:' + temp.split(':')[1];
              } else if (temp.split(':')[0] == 'leader') {
                copy[i].players[j].playerLabel[a] =
                  'dice:' + temp.split(':')[1];
              }
              break;
            }
          }
        }
      }
    }
    setEachSide(copy);
  };

  useEffect(() => {
    if (isMounted.current) {
      try {
        let findit = who.split(':')[0] + ':' + who.split(':')[1];
        let changed =
          document.getElementById(findit).getBoundingClientRect().width +
          document.body.offsetWidth / 10;
        let changeit = 'input:' + who.split(':')[0];
        console.log(changed);
        let pxToVwed = pxToVw(changed) + 'vw';
        document.getElementById(changeit).style.width = pxToVwed;
        widthSetter(who.split(':')[0], pxToVwed);
      } catch (e) {}
    } else {
      isMounted.current = true;
    }
  }, [who]);

  useEffect(() => {
    let password = window.prompt('비밀번호를 입력해주세요');
    if (password == 'igeu') {
      setLocked(false);
    } else {
      while (password !== 'igeu') {
        password = window.prompt('비밀번호를 다시 입력해주세요');
      }
    }
  }, []);

  useEffect(() => {
    if (SD == 'double') {
      if (eachSide.length !== 2) {
        setEachSide([...eachSide, tempSave]);
      }
    } else {
      let copy = eachSide.slice();
      setTempSave(copy[1]);
      setEachSide([copy[0]]);
    }
  }, [SD]);

  return (
    <$AllArea>
      {pasteInput && (
        <$InputPlaceWrapper onClick={entryInput}>
          <$InputPlace
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <$InputShowdownText
              value={pastedValue}
              onChange={(e) => {
                setPastedValue(e.target.value);
              }}
            ></$InputShowdownText>
            <button onClick={pasteRead}>적용</button>
          </$InputPlace>
        </$InputPlaceWrapper>
      )}
      <div style={{ color: 'white', display: 'flex' }} className="disappear">
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            let copy = eachSide.slice();
            copy[1].name = 'first';
            copy[0].name = 'second';
            for (let i = 0; i < copy[0].length; i++) {
              let temp = copy[0][i].playerWidth;
              copy[0][i].playerWidth = copy[1][i].playerWidth;
              copy[1][i].playerWidth = temp;
              let label1 = copy[0][i].playerLabel.slice();
              let label2 = copy[1][i].playerLabel.slice();
              copy[0][i].playerLabel = label2;
              copy[1][i].playerLabel = label1;
            }
            setEachSide([copy[1], copy[0]]);
          }}
        >
          양측 교체
        </div>
        &nbsp; | &nbsp;
        <div>
          단독팀
          <input
            name="SD"
            value="single"
            type="radio"
            onChange={(e) => {
              SDpicker(e.target);
            }}
          />
        </div>
        &nbsp;
        <div>
          VS
          <input
            name="SD"
            value="double"
            type="radio"
            onChange={(e) => {
              SDpicker(e.target);
            }}
          />
        </div>
        &nbsp; | &nbsp;
        <div onClick={manual} style={{ paddingTop: '3px', cursor: 'pointer' }}>
          <FaRegQuestionCircle />
        </div>
      </div>
      {locked == false && (
        <$Template
          ref={downloadRef}
          state={SD}
          onClick={(e) => {
            for (
              let i = 0;
              i < document.getElementsByClassName('each-item').length;
              i++
            ) {
              document.getElementsByClassName('each-item')[
                i
              ].children[0].style.border = 'none';
            }
            setEachPK('');
            setNameSearcher(false);
          }}
        >
          {nameSearcher && (
            <$SearchEach
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Select options={option} onChange={searchAndSet}></Select>
            </$SearchEach>
          )}
          {eachSide.map((a) => {
            return (
              <>
                <$Team
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <$TeamLogoWrapper>
                    <$SelectWrapper className="disappear">
                      <Select
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            height: '2vw',
                            width: '100px',
                            borderRadius: '10px',
                          }),
                          placeholder: (baseStyles) => ({
                            ...baseStyles,
                            color: 'black',
                          }),
                        }}
                        options={option2}
                        onChange={(e) => {
                          pickLogo2(e.label, e.value, a.name);
                        }}
                      ></Select>
                    </$SelectWrapper>
                    <$TeamLogo
                      src={a.teamLogo}
                      onClick={() => {
                        console.log(a.name);
                        pickLogo(a.name);
                      }}
                    ></$TeamLogo>
                  </$TeamLogoWrapper>
                  <$PlayerPlace>
                    {a.players.map((x, idx) => {
                      let inputId = 'input:' + x.playerId;
                      let labelId = 'label:' + x.playerId;
                      let triId = 'tri:' + x.playerId;
                      return (
                        <$Player>
                          {a.name == 'first' ? (
                            <$NameLine
                              id={labelId}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                optionAdder(a.name, x.playerId);
                              }}
                            >
                              <$PlayerName
                                style={{ backgroundColor: a.teamColor }}
                              >
                                <$NameInput
                                  style={{ width: x.playerWidth }}
                                  id={inputId}
                                  value={x.playerName}
                                  onChange={(e) => {
                                    let pw = x.playerId + ':' + idx;
                                    eachPlayerNameChange(
                                      e.currentTarget.value,
                                      x.playerId,
                                      pw,
                                    );
                                  }}
                                  type="text"
                                ></$NameInput>
                                <span
                                  id={x.playerId + ':' + idx}
                                  style={{ opacity: 0, position: 'absolute' }}
                                >
                                  {x.playerName}
                                </span>
                              </$PlayerName>
                              <$NameTriangle
                                id={triId}
                                teamcolor={a.teamColor}
                              />
                              {x.playerLabel.length > 0 &&
                                x.playerLabel.map((item) => {
                                  let url = '';
                                  if (item.split(':')[0] == 'leader') {
                                    url = leader2;
                                  } else if (item.split(':')[0] == 'dice') {
                                    url = dice2;
                                  }
                                  return (
                                    <$Label
                                      onClick={() => {
                                        optionChanger(x.playerId, item);
                                      }}
                                      onContextMenu={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        optionRemover(x.playerId, item);
                                      }}
                                      id={item}
                                      src={url}
                                    ></$Label>
                                  );
                                })}
                            </$NameLine>
                          ) : (
                            <$NameLine
                              id={labelId}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                optionAdder(a.name, x.playerId);
                              }}
                              style={{ justifyContent: 'end' }}
                            >
                              {x.playerLabel.length > 0 &&
                                x.playerLabel.map((item) => {
                                  let url = '';
                                  if (item.split(':')[0] == 'leader') {
                                    url = leader;
                                  } else if (item.split(':')[0] == 'dice') {
                                    url = dice;
                                  }
                                  return (
                                    <$Label2
                                      onClick={() => {
                                        optionChanger(x.playerId, item);
                                      }}
                                      onContextMenu={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        optionRemover(x.playerId, item);
                                      }}
                                      id={item}
                                      src={url}
                                    ></$Label2>
                                  );
                                })}
                              <$NameTriangle2
                                id={triId}
                                teamcolor={a.teamColor}
                              />
                              <$PlayerName
                                style={{ backgroundColor: a.teamColor }}
                              >
                                <$NameInput
                                  style={{ width: x.playerWidth }}
                                  id={inputId}
                                  value={x.playerName}
                                  onChange={(e) => {
                                    let pw = x.playerId + ':' + idx;
                                    eachPlayerNameChange(
                                      e.currentTarget.value,
                                      x.playerId,
                                      pw,
                                    );
                                  }}
                                  type="text"
                                ></$NameInput>
                                <span
                                  id={x.playerId + ':' + idx}
                                  style={{ opacity: 0, position: 'absolute' }}
                                >
                                  {x.playerName}
                                </span>
                              </$PlayerName>
                            </$NameLine>
                          )}

                          <$PlayerProfile>
                            {a.name == 'first' ? (
                              <>
                                {' '}
                                <$PlayerAvatarWrapper>
                                  <$PlayerAvatar
                                    onClick={() => {
                                      pickAvatar(x.playerId);
                                    }}
                                  >
                                    <img
                                      style={{ width: '100%' }}
                                      src={
                                        x.playerAvatar
                                          ? x.playerAvatar
                                          : unknown
                                      }
                                    ></img>
                                  </$PlayerAvatar>
                                </$PlayerAvatarWrapper>
                                <$PlayerEntry id={x.playerId}>
                                  <$Blackbar></$Blackbar>
                                  {x.entry.map((y) => {
                                    const id = y.id + Date.now();
                                    return (
                                      <$EachPokemonWrapper
                                        className="each-item"
                                        onClick={(e) => {
                                          for (
                                            let i = 0;
                                            i <
                                            document.getElementsByClassName(
                                              'each-item',
                                            ).length;
                                            i++
                                          ) {
                                            document.getElementsByClassName(
                                              'each-item',
                                            )[i].children[0].style.border =
                                              'none';
                                          }
                                          e.target.style.border =
                                            '1px solid blue';
                                          setEachPK(y.id);
                                          searchOn();
                                        }}
                                        onContextMenu={(e) => {
                                          e.preventDefault();
                                          ban(id);
                                        }}
                                      >
                                        <$Banned id={id}></$Banned>
                                        <$EachPokemon
                                          id={y.id}
                                          src={y.src ? y.src : db[0].url}
                                        ></$EachPokemon>
                                      </$EachPokemonWrapper>
                                    );
                                  })}
                                </$PlayerEntry>
                                <$EntryPaste className="disappear">
                                  <$Util
                                    onClick={() => {
                                      entryInput(x.playerId);
                                    }}
                                  >
                                    <BsFiletypeTxt />
                                  </$Util>
                                  <$Util
                                    onClick={() => {
                                      resetEntry(x.playerId);
                                    }}
                                  >
                                    <GrPowerReset />
                                  </$Util>
                                </$EntryPaste>
                              </>
                            ) : (
                              <>
                                <$EntryPaste className="disappear">
                                  <$Util
                                    onClick={() => {
                                      entryInput(x.playerId);
                                    }}
                                  >
                                    <BsFiletypeTxt />
                                  </$Util>
                                  <$Util
                                    onClick={() => {
                                      resetEntry(x.playerId);
                                    }}
                                  >
                                    <GrPowerReset />
                                  </$Util>
                                </$EntryPaste>

                                <$PlayerEntry id={x.playerId}>
                                  <$Blackbar></$Blackbar>
                                  {x.entry.map((y) => {
                                    const id = y.id + Date.now();
                                    return (
                                      <$EachPokemonWrapper
                                        className="each-item"
                                        onClick={(e) => {
                                          for (
                                            let i = 0;
                                            i <
                                            document.getElementsByClassName(
                                              'each-item',
                                            ).length;
                                            i++
                                          ) {
                                            document.getElementsByClassName(
                                              'each-item',
                                            )[i].children[0].style.border =
                                              'none';
                                          }
                                          e.target.style.border =
                                            '1px solid blue';
                                          setEachPK(y.id);
                                          searchOn();
                                        }}
                                        onContextMenu={(e) => {
                                          e.preventDefault();
                                          ban(id);
                                        }}
                                      >
                                        <$Banned id={id}></$Banned>
                                        <$EachPokemon
                                          id={y.id}
                                          src={y.src ? y.src : db[0].url}
                                        ></$EachPokemon>
                                      </$EachPokemonWrapper>
                                    );
                                  })}
                                </$PlayerEntry>
                                <$PlayerAvatarWrapper>
                                  <$PlayerAvatar
                                    onClick={() => {
                                      pickAvatar(x.playerId);
                                    }}
                                  >
                                    <img
                                      style={{ width: '100%' }}
                                      src={
                                        x.playerAvatar
                                          ? x.playerAvatar
                                          : unknown
                                      }
                                    ></img>
                                  </$PlayerAvatar>
                                </$PlayerAvatarWrapper>
                              </>
                            )}
                          </$PlayerProfile>
                          <br></br>
                        </$Player>
                      );
                    })}
                  </$PlayerPlace>
                </$Team>
                {a.name == 'first' && eachSide.length == 2 && (
                  <$Versus>VS</$Versus>
                )}
              </>
            );
          })}
        </$Template>
      )}
      <$GenerateButton ref={buttonRef} onClick={exportElementAsPNG2}>
        DOWNLOAD
      </$GenerateButton>
    </$AllArea>
  );
};

const $Label = styled.img`
  width: 6vw;
  margin-left: -2vw;
`;

const $Label2 = styled.img`
  width: 6vw;
  margin-right: -2vw;
`;

const $Util = styled.div`
  color: white;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;
`;

const $Blackbar = styled.div`
  position: absolute;
  background-color: #181818;
  width: 80%;
  aspect-ratio: 28 / 2;
  z-index: 0;
  top: 45%;
  left: 10%;
`;

const $SelectWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const $Versus = styled.div`
  margin-top: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 8vw;
  font-family: 'wehaven-regular';
`;

const $AllArea = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $SearchInput = styled.input`
  width: 100%;
`;

const $SearchEach = styled.div`
  position: fixed;
  top: 50%;
  left: 40%;
  width: 20%;
  height: 50px;
  z-index: 2;
`;

const $Banned = styled.div`
  position: absolute;
  background-color: none;
  width: 100%;
  height: 100%;
`;

const $NameInput = styled.input`
  background-color: transparent;
  font-size: 2vw;
  color: white;
  font-family: 'wehaven-bold';
  border: none;
  text-align: center;
`;

const $InputShowdownText = styled.textarea`
  resize: none;
  width: 80%;
  height: 80%;
  overflow: auto;
`;

const $InputPlace = styled.div`
  width: 80%;
  height: 400px;
  background-color: white;
  border-radius: 5px;
  opacity: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $InputPlaceWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const $Template = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.state == 'single' ? 'center' : 'space-between'};
  background-color: #333333;
`;

const $Team = styled.div`
  width: 45%;
`;

const $TeamLogoWrapper = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const $TeamLogo = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 10px;
`;

const $PlayerPlace = styled.div``;

const $Player = styled.div``;

const $NameLine = styled.div`
  display: flex;
`;

const $NameTriangle = styled.div`
  border-bottom: 1.5vw solid ${(props) => props.teamcolor};
  border-top: 1.5vw solid transparent;
  border-left: 0.75vw solid ${(props) => props.teamcolor};
  border-right: 0.75vw solid transparent;
`;

const $NameTriangle2 = styled.div`
  border-bottom: 1.5vw solid ${(props) => props.teamcolor};
  border-top: 1.5vw solid transparent;
  border-right: 0.75vw solid ${(props) => props.teamcolor};
  border-left: 0.75vw solid transparent;
`;

const $PlayerName = styled.div`
  height: 3vw;
  background-color: red;
  color: white;
  display: flex;
`;

const $PlayerProfile = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
`;

const $PlayerAvatarWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1.47;
  cursor: pointer;
`;

const $PlayerAvatar = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
`;
const $PlayerEntry = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  aspect-ratio: 8 / 2;
  background-color: #282828;
  border-radius: 5px;
  padding: 1%;
  position: relative;
`;

const $EachPokemonWrapper = styled.div`
  width: 16%;
  background-color: transparent;
  /* border: 2px solid grey; */
  box-sizing: border-box;
  aspect-ratio: 16 / 16;
  position: relative;
  border-radius: 5px;
`;

const $EachPokemon = styled.img`
  width: 100%;
  /* height: auto; */
  aspect-ratio: 16 / 16;
`;

const $EntryPaste = styled.div`
  width: 5%;
  max-width: 15px;
  word-break: break-all;
  overflow-wrap: break-word;
  font-size: 1vw;
`;

const $GenerateButton = styled.button`
  border-radius: 5px;
  border-style: none;
  font-family: 'monoton';
  background-color: black;
  color: white;
  width: 90vw;
  font-size: 40px;
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

export { LeagueTemplate };
