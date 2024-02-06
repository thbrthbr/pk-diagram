import { atdb } from './AVATARDB';
import { db } from './PKDB';
import styled from 'styled-components';
import bgimg from '../Logo/bgimg.png';
import { useRef, useState } from 'react';
import star from '../items/star.png';
import star2 from '../items/star-red.png';
import Select from 'react-select';
import { toPng, toSvg, toJpeg } from 'html-to-image';

const TrainerCard = () => {
  let option = [];
  let option2 = [];
  for (let i = 0; i < db.length; i++) {
    option.push({
      value: db[i].url,
      label: db[i].nameKo,
    });
  }
  for (let i = 0; i < atdb.length; i++) {
    option2.push({
      value: atdb[i].url,
      label: (
        <div>
          {atdb[i].name} <img style={{ width: '30px' }} src={atdb[i].url}></img>
        </div>
      ),
    });
  }
  let year = new Date();
  year = year.getFullYear();
  const [party, setParty] = useState([
    db[0].url,
    db[0].url,
    db[0].url,
    db[0].url,
    db[0].url,
    db[0].url,
  ]);
  const [PW, setPW] = useState('');
  const [locked, setLocked] = useState(true);
  const [trainerStep, setTrainerStep] = useState('Iron Card');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDateSwitch, setCurrentDateSwitch] = useState(true);
  const [name, setName] = useState('');
  const [nameSwitch, setNameSwitch] = useState(true);
  const [comment, setComment] = useState('');
  const [commentSwitch, setCommentSwitch] = useState(true);
  const [record, setRecord] = useState('');
  const [recordSwitch, setRecordSwitch] = useState(true);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [searchSwitch, setSearchSwitch] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [hColor, setHColor] = useState('#81BCCE');
  const [bColor, setBColor] = useState('#C1DFE2');
  const [starLevel, setStarLevel] = useState([star, '', '', '', '']);
  const [yearOnwer, setYearOwner] = useState(false);
  const buttonRef = useRef();
  const downloadRef2 = useRef();

  const level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const trainerLevel = [
    'Iron Card',
    'Bronze Card',
    'Silver Card',
    'Gold Card',
    'Emerald Card',
    'Diamond Card',
    'Epic Card',
    'Master Card',
    'GrandMaster Card',
    'Legend Card',
    'YearOnwer Card',
  ];

  const levelTheme = [
    {
      headerColor: '#81BCCE',
      backColor: '#C1DFE2',
    },
    {
      headerColor: 'orange',
      backColor: '#ffc3b5',
    },
    {
      headerColor: '#BEC1C8',
      backColor: '#E5E5E3',
    },
    {
      headerColor: '#FFCB00',
      backColor: '#FFE616',
    },
    {
      headerColor: '#1AD100',
      backColor: '#7ED18F',
    },
    {
      headerColor: '#8444DA',
      backColor: '#C089F8',
    },
    {
      headerColor: '#FF6ACE',
      backColor: '#FFAADB',
    },
    {
      headerColor: '#626885',
      backColor: '#B0AFB7',
    },
    {
      headerColor: '#B01212',
      backColor: '#FF6E77',
    },
    {
      headerColor: 'black',
      backColor: '#292929',
    },
    {
      headerColor: '#FFC911',
      backColor: '#8EF1F0',
    },
  ];

  const dateHandler = () => {
    setCurrentDateSwitch(!nameSwitch);
  };
  const nameHandler = () => {
    setNameSwitch(!nameSwitch);
  };
  const commentHandler = () => {
    setCommentSwitch(!commentSwitch);
  };
  const recordHandler = () => {
    setRecordSwitch(!recordSwitch);
  };
  const searchPK = (idx) => {
    let copy = searchSwitch.slice();
    for (let i = 0; i < copy.length; i++) {
      if (i == idx) {
        copy[i] = !copy[i];
      }
    }
    setSearchSwitch(copy);
  };

  const changePK = (idx, value) => {
    let copy = party.slice();
    let copy2 = searchSwitch.slice();
    for (let i = 0; i < copy.length; i++) {
      if (i == idx) {
        copy[i] = value;
        copy2[i] = !copy2[i];
      }
    }
    setSearchSwitch(copy2);
    setParty(copy);
  };

  const levelChanger = (lev) => {
    setHColor(levelTheme[+lev - 1].headerColor);
    setBColor(levelTheme[+lev - 1].backColor);
    setTrainerStep(trainerLevel[lev - 1]);
    if (lev == 1) {
      setStarLevel([star, '', '', '', '']);
      setYearOwner(false);
    } else if (lev == 2) {
      setStarLevel([star, star, '', '', '']);
      setYearOwner(false);
    } else if (lev == 3) {
      setStarLevel([star, star, star, '', '']);
      setYearOwner(false);
    } else if (lev == 4) {
      setStarLevel([star, star, star, star, '']);
      setYearOwner(false);
    } else if (lev == 5) {
      setStarLevel([star, star, star, star, star]);
      setYearOwner(false);
    } else if (lev == 6) {
      setStarLevel([star2, star, star, star, star]);
      setYearOwner(false);
    } else if (lev == 7) {
      setStarLevel([star2, star2, star, star, star]);
      setYearOwner(false);
    } else if (lev == 8) {
      setStarLevel([star2, star2, star2, star, star]);
      setYearOwner(false);
    } else if (lev == 9) {
      setStarLevel([star2, star2, star2, star2, star]);
      setYearOwner(false);
    } else if (lev == 10) {
      setStarLevel([star2, star2, star2, star2, star2]);
      setYearOwner(false);
    } else if (lev == 11) {
      setStarLevel(['', '', '', '', '']);
      setYearOwner(true);
    }
  };

  const key = {
    key: process.env.REACT_APP_PW || 'none',
  };

  const passwordPass = () => {
    if (PW == key.key) {
      setLocked(false);
    } else {
      alert('비밀번호를 확인해주세요');
    }
  };

  const buttonAnimation = () => {
    if (buttonRef.current) {
      buttonRef.current.style.animation = 'jelly 0.5s linear';
      setTimeout(() => {
        buttonRef.current.style.animation = 'none';
      }, 510);
    }
  };

  const exportElementAsPNG = async () => {
    buttonAnimation();
    try {
      if (downloadRef2.current) {
        let image = await toPng(downloadRef2.current);
        const a = window.document.createElement('a');
        a.href = image;
        a.download = 'trainer-card.png';
        a.click();
      }
    } catch (e) {
      console.log(e);
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
        <$BaseArea
          onContextMenu={(e) => {
            e.preventDefault();
            if (nameSwitch) {
            } else {
              setNameSwitch(!nameSwitch);
            }
            if (currentDateSwitch) {
            } else {
              setCurrentDateSwitch(!currentDateSwitch);
            }
            if (recordSwitch) {
            } else {
              setRecordSwitch(!recordSwitch);
            }
            if (commentSwitch) {
            } else {
              setCommentSwitch(!commentSwitch);
            }
          }}
        >
          <div>
            <$Card
              ref={downloadRef2}
              img={bgimg}
              color={bColor}
              style={
                yearOnwer
                  ? {
                      background:
                        'linear-gradient(to top, #4E170E, #F3F3F3, #F7F234)',
                    }
                  : {
                      backgroundImage: `url(${bgimg})`,
                    }
              }
            >
              <$TitleLine
                color={hColor}
                style={{
                  background: yearOnwer
                    ? 'linear-gradient(to top, #FFC911, #F74E0D)'
                    : hColor,
                }}
              >
                <div>{trainerStep}</div>
                <$StarPlace>
                  {yearOnwer ? (
                    <$Year>{year}</$Year>
                  ) : (
                    starLevel.map((x) => {
                      return <>{x && <$Star src={x} />}</>;
                    })
                  )}
                </$StarPlace>
              </$TitleLine>
              <$NameLine>
                <$DescBalloon onClick={dateHandler}>
                  {currentDateSwitch == true ? (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      {currentDate ? currentDate : '날짜'}
                    </div>
                  ) : (
                    <input
                      onKeyUp={(e) => {
                        if (e.key == 'Enter') {
                          setCurrentDateSwitch(!currentDateSwitch);
                        }
                      }}
                      value={currentDate}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        setCurrentDate(e.target.value);
                      }}
                    ></input>
                  )}
                </$DescBalloon>
                <$DescBalloon onClick={nameHandler}>
                  {nameSwitch == true ? (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      {name ? name : '이름'}
                    </div>
                  ) : (
                    <input
                      onKeyUp={(e) => {
                        if (e.key == 'Enter') {
                          setNameSwitch(!nameSwitch);
                        }
                      }}
                      value={name}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  )}
                </$DescBalloon>
              </$NameLine>
              <$ImgLine>
                <$EntryPlace>
                  {party.map((x, i) => {
                    return (
                      <$PKplacer
                        onClick={() => {
                          searchPK(i);
                        }}
                      >
                        <$eachPK src={x}></$eachPK>
                        {searchSwitch[i] == false && (
                          <$Select
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Select
                              options={option}
                              onChange={(e) => {
                                changePK(i, e.value);
                              }}
                            />
                          </$Select>
                        )}
                      </$PKplacer>
                    );
                  })}
                </$EntryPlace>
                <$AvatarPlace>
                  <$AvatarImg
                    src={currentAvatar ? currentAvatar : atdb[1247].url}
                  ></$AvatarImg>
                </$AvatarPlace>
              </$ImgLine>
              <$BottomLine>
                <$DescBalloon2 onClick={recordHandler}>
                  {recordSwitch == true ? (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      {record ? record : '기록'}
                    </div>
                  ) : (
                    <input
                      onKeyUp={(e) => {
                        if (e.key == 'Enter') {
                          setRecordSwitch(!recordSwitch);
                        }
                      }}
                      value={record}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        setRecord(e.target.value);
                      }}
                    ></input>
                  )}
                </$DescBalloon2>
                <$DescBalloon2 onClick={commentHandler}>
                  {commentSwitch == true ? (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      {comment ? comment : '한마디'}
                    </div>
                  ) : (
                    <input
                      onKeyUp={(e) => {
                        if (e.key == 'Enter') {
                          setCommentSwitch(!commentSwitch);
                        }
                      }}
                      value={comment}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></input>
                  )}
                </$DescBalloon2>
              </$BottomLine>
            </$Card>
            <$LevelSetter>
              {level.map((x) => {
                return (
                  <$EachLevel
                    onClick={() => {
                      levelChanger(x);
                    }}
                  >
                    {x}
                  </$EachLevel>
                );
              })}
            </$LevelSetter>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
              alignContent: 'start',
              height: '400px',
            }}
          >
            <$GenerateButton ref={buttonRef} onClick={exportElementAsPNG}>
              DOWNLOAD
            </$GenerateButton>
            <Select
              options={option2}
              onChange={(e) => {
                setCurrentAvatar(e.value);
              }}
            />
          </div>
          {/* <$AreaWrapper>
        {atdb.map((x, i) => {
          return (
            <$Avatar
              onClick={() => {
                setCurrentAvatar(x.url);
              }}
            >
              <img src={x.url}></img>
              <$NameTag>{x.name}</$NameTag>
            </$Avatar>
          );
        })}
      </$AreaWrapper> */}
        </$BaseArea>
      )}
    </>
  );
};

const $AllArea = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $Year = styled.div`
  font-weight: 900;
  color: white;
`;

const $Star = styled.img`
  height: 100%;
`;

const $StarPlace = styled.div`
  height: 100%;
`;

const $EachLevel = styled.div`
  cursor: pointer;
`;

const $LevelSetter = styled.div`
  display: flex;
  width: 480px;
  justify-content: space-between;
`;

const $Select = styled.div`
  position: absolute;
  margin-top: -40px;
  /* margin-left: 40px; */
`;

const $BottomLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const $AvatarImg = styled.img`
  width: 120px;
`;

const $AvatarPlace = styled.div`
  min-width: 30%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const $PKplacer = styled.div`
  position: relative;
  width: 30%;
  max-width: 60px;
  margin: 0px 20px 3px 20px;
  /* background-color: rgba(255, 255, 255, 0.5); */
  border-radius: 5px;
`;

const $eachPK = styled.img`
  /* border: 1px solid black; */
  max-width: 60px;
`;

const $EntryPlace = styled.div`
  width: 300px;
  /* border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const $ImgLine = styled.div`
  display: flex;
  padding: 3px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const $DescBalloon = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  min-width: 45%;
  padding: 5px;
  /* text-align: center; */
`;

const $DescBalloon2 = styled.div`
  /* display: flex;
  justify-content: space-between; */
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 5px;
  width: 95%;
  font-size: 13px;
  text-align: center;
`;

const $NameLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
`;

const $TitleLine = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.color};
  padding: 5px 10px;
  box-sizing: border-box;
  color: white;
`;
const $Card = styled.div`
  width: 480px;
  height: 300px;
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
`;

const $BaseArea = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'wehaven-regular';
`;

const $NameTag = styled.div`
  font-size: 10px;
`;

const $Avatar = styled.div`
  width: 96px;
  margin: 15px;
  cursor: pointer;
`;

const $AreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const $GenerateButton = styled.button`
  border-radius: 5px;
  border-style: none;
  font-family: 'monoton';
  background-color: black;
  color: white;
  width: 150px;
  font-size: 16px;
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

export { TrainerCard };
