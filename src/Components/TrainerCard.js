import { atdb } from './AVATARDB';
import { db } from './PKDB';
import styled from 'styled-components';
import bgimg from '../Logo/ball3.png';
import { useEffect, useRef, useState } from 'react';
import star from '../items/star-new2.png';
import star2 from '../items/star-new3.png';
import Select from 'react-select';
import galaxy from '../items/galaxy.png';
import hubo1 from '../items/hubo1.jpg';
import hubo2 from '../items/hubo2.jpg';
import hubo3 from '../items/hubo3.jpg';
import hubo4 from '../items/hubo4.jpg';
import hubo5 from '../items/hubo5.jpg';
import hubo6 from '../items/hubo6.webp';
import { toPng, toSvg, toJpeg } from 'html-to-image';
import { RiShiningLine } from 'react-icons/ri';
import { RiShiningFill } from 'react-icons/ri';
import { FaCrown } from 'react-icons/fa';
import { LuCrown } from 'react-icons/lu';
import { LiaCrownSolid } from 'react-icons/lia';

const TrainerCard = () => {
  let option = [];
  let option2 = [];
  let rawsetPK = [];
  let rawsetAT = [];
  for (let i = 0; i < db.length; i++) {
    option.push({
      value: i,
      label: db[i].nameKo,
    });
    rawsetPK.push(db[i].url);
  }
  for (let i = 0; i < atdb.length; i++) {
    option2.push({
      value: atdb[i].name + ':' + i,
      label: (
        <div>
          {atdb[i].name} <img style={{ width: '30px' }} src={atdb[i].url}></img>
        </div>
      ),
    });
    rawsetAT.push(atdb[i].url);
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
  const [party2, setParty2] = useState([
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
  const [currentDate2, setCurrentDate2] = useState('');
  const [currentDateSwitch2, setCurrentDateSwitch2] = useState(true);
  const [name, setName] = useState('');
  const [nameSwitch, setNameSwitch] = useState(true);
  const [name2, setName2] = useState('');
  const [nameSwitch2, setNameSwitch2] = useState(true);
  const [comment, setComment] = useState('');
  const [commentSwitch, setCommentSwitch] = useState(true);
  const [record, setRecord] = useState('');
  const [recordSwitch, setRecordSwitch] = useState(true);
  const [comment2, setComment2] = useState('');
  const [commentSwitch2, setCommentSwitch2] = useState(true);
  const [record2, setRecord2] = useState('');
  const [recordSwitch2, setRecordSwitch2] = useState(true);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [currentAvatar2, setCurrentAvatar2] = useState('');
  const [searchSwitch, setSearchSwitch] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [searchSwitch2, setSearchSwitch2] = useState([
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
  const [yearOwner, setYearOwner] = useState(false);
  const [imageInserted, setImageInserted] = useState(false);
  const [imageInsertedSrc, setImageInsertedSrc] = useState('');
  const [legend, setLegend] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [specialLevel, setSpecialLevel] = useState(0);
  const [specialLevelSwitch, setSpecialLevelSwitch] = useState(true);
  const [specialWeek, setSpecialWeek] = useState('Special Rule');
  const [specialWeekSwitch, setSpecialWeekSwitch] = useState(true);
  const [fontSize, setFontSize] = useState({
    rc1: 14,
    rc2: 14,
    c1: 14,
    c2: 14,
  });

  const buttonRef = useRef();
  const buttonRef2 = useRef();
  const downloadRef2 = useRef();
  const downloadRef3 = useRef();

  const rc1Ref = useRef();
  const rc2Ref = useRef();
  const c1Ref = useRef();
  const c2Ref = useRef();

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
    'LEGEND CARD',
    'YEAR-OWNER CARD',
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
      headerColor: '#05803C',
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
  const dateHandler2 = () => {
    setCurrentDateSwitch2(!nameSwitch);
  };
  const nameHandler = () => {
    setNameSwitch(!nameSwitch);
  };
  const nameHandler2 = () => {
    setNameSwitch2(!nameSwitch2);
  };
  const commentHandler = () => {
    setCommentSwitch(!commentSwitch);
  };
  const recordHandler = () => {
    setRecordSwitch(!recordSwitch);
  };
  const commentHandler2 = () => {
    setCommentSwitch2(!commentSwitch2);
  };
  const recordHandler2 = () => {
    setRecordSwitch2(!recordSwitch2);
  };
  const levelHandler = () => {
    setSpecialLevelSwitch(!specialLevelSwitch);
  };
  const specialWeekHandler = () => {
    setSpecialWeekSwitch(!specialWeekSwitch);
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
  const searchPK2 = (idx) => {
    let copy = searchSwitch2.slice();
    for (let i = 0; i < copy.length; i++) {
      if (i == idx) {
        copy[i] = !copy[i];
      }
    }
    setSearchSwitch2(copy);
  };

  const changePK = (idx, value) => {
    let copy = party.slice();
    let copy2 = searchSwitch.slice();
    for (let i = 0; i < copy.length; i++) {
      if (i == idx) {
        copy[i] = rawsetPK[value];
        copy2[i] = !copy2[i];
      }
    }
    setSearchSwitch(copy2);
    setParty(copy);
  };
  const changePK2 = (idx, value) => {
    let copy = party2.slice();
    let copy2 = searchSwitch2.slice();
    for (let i = 0; i < copy.length; i++) {
      if (i == idx) {
        copy[i] = rawsetPK[value];
        copy2[i] = !copy2[i];
      }
    }
    setSearchSwitch2(copy2);
    setParty2(copy);
  };

  const levelChanger = (lev) => {
    setCurrentLevel(lev);
    setHColor(levelTheme[+lev - 1].headerColor);
    setBColor(levelTheme[+lev - 1].backColor);
    setTrainerStep(trainerLevel[lev - 1]);
    if (lev == 1) {
      setStarLevel([star, '', '', '', '']);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 2) {
      setStarLevel([star, star, '', '', '']);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 3) {
      setStarLevel([star, star, star, '', '']);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 4) {
      setStarLevel([star, star, star, star, '']);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 5) {
      setStarLevel([star, star, star, star, star]);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 6) {
      setStarLevel([star2, star, star, star, star]);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 7) {
      setStarLevel([star2, star2, star, star, star]);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 8) {
      setStarLevel([star2, star2, star2, star, star]);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 9) {
      setStarLevel([star2, star2, star2, star2, star]);
      setYearOwner(false);
      setLegend(false);
    } else if (lev == 10) {
      setStarLevel([star2, star2, star2, star2, star2]);
      setYearOwner(false);
      setLegend(true);
    } else if (lev == 11) {
      setStarLevel(['', '', '', '', '']);
      setYearOwner(true);
      setLegend(false);
    }
  };

  const key = {
    key: process.env.REACT_APP_PW || 'none',
  };

  const passwordPass = () => {
    if (PW == 'hengbengquatrobe') {
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
  const buttonAnimation2 = () => {
    if (buttonRef2.current) {
      buttonRef2.current.style.animation = 'jelly 0.5s linear';
      setTimeout(() => {
        buttonRef2.current.style.animation = 'none';
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
  const exportElementAsPNG2 = async () => {
    buttonAnimation2();
    try {
      if (downloadRef3.current) {
        let image = await toPng(downloadRef3.current);
        const a = window.document.createElement('a');
        a.href = image;
        a.download = 'trainer-card.png';
        a.click();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const backgroundHandler = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setImageInsertedSrc(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (record.length > 46) {
      setFontSize({
        ...fontSize,
        rc1: 8,
      });
    } else {
      setFontSize({
        ...fontSize,
        rc1: 14,
      });
    }
  }, [record]);

  // useEffect(() => {
  //   if (recordSwitch) {
  //     if (window.getComputedStyle(rc1Ref.current).height !== '17.6px') {
  //       setFontSize({
  //         ...fontSize,
  //         rc1: 8,
  //       });
  //     } else {
  //       setFontSize({
  //         ...fontSize,
  //         rc1: 14,
  //       });
  //     }
  //   }
  // }, [recordSwitch]);

  useEffect(() => {
    if (record2.length > 46) {
      setFontSize({
        ...fontSize,
        rc2: 8,
      });
    } else if (record2.length <= 46) {
      setFontSize({
        ...fontSize,
        rc2: 14,
      });
    }
  }, [record2]);

  useEffect(() => {
    if (comment.length > 46) {
      setFontSize({
        ...fontSize,
        c1: 8,
      });
    } else if (comment.length <= 46) {
      setFontSize({
        ...fontSize,
        c1: 14,
      });
    }
  }, [comment]);

  useEffect(() => {
    if (comment2.length > 46) {
      setFontSize({
        ...fontSize,
        c2: 8,
      });
    } else if (comment2.length <= 46) {
      setFontSize({
        ...fontSize,
        c2: 14,
      });
    }
  }, [comment2]);

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
        <div>
          <br></br>
          <$Kind>~정규~</$Kind>
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
                style={{
                  background: yearOwner
                    ? `url(${hubo1})`
                    : `url(${bgimg}), linear-gradient(350deg, ${hColor} 20%, ${bColor} 50%)`,
                  // background: `url(${bgimg}), linear-gradient(330deg, ${hColor} 40%, white 47%, white 49%, ${bColor} 56%)`,
                }}
              >
                <$TitleLine
                  color={hColor}
                  style={{
                    background: yearOwner
                      ? 'transparent'
                      : `linear-gradient(to right bottom, ${hColor}, ${bColor})`,
                  }}
                >
                  <div
                    style={
                      legend
                        ? {
                            fontFamily: 'giants-bold',
                            backgroundImage:
                              'linear-gradient(to bottom, orange, yellow, orange)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                          }
                        : {
                            fontFamily: 'giants-bold',
                            color: 'white',
                          }
                    }
                  >
                    {/* {legend && (
                      <FaCrown
                        style={{
                          color: 'yellow',
                          // background:
                          //   '-moz-linear-gradient(top, #e72c83 0%, #a742c6 100%)',
                          // background:
                          //   '-webkit-linear-gradient(top, #e72c83 0%, #a742c6 100%)',
                          // background:
                          //   'linear-gradient(to bottom, #e72c83 0%, #a742c6 100%)',
                          // WebkitBackgroundClip: 'text',
                          // MozBackgroundClip: 'text',
                          // backgroundClip: 'text',
                          // WebkitTextFillColor: 'transparent',
                        }}
                      />
                    )} */}
                    {trainerStep}
                    {legend && (
                      <FaCrown
                        style={{
                          marginLeft: '3px',
                          color: '#FFDB00',
                        }}
                      />
                    )}
                    {currentLevel == 9 && (
                      <>
                        <RiShiningFill
                          style={{
                            marginLeft: '3px',
                          }}
                        />
                        <RiShiningFill />
                        <RiShiningFill />
                      </>
                    )}
                    {currentLevel == 8 && (
                      <>
                        <RiShiningFill
                          style={{
                            marginLeft: '3px',
                          }}
                        />
                        <RiShiningFill />
                      </>
                    )}
                    {currentLevel == 7 && (
                      <>
                        <RiShiningFill
                          style={{
                            marginLeft: '3px',
                          }}
                        />
                      </>
                    )}
                  </div>
                  <$StarPlace>
                    {yearOwner ? (
                      <$Year>{year}</$Year>
                    ) : (
                      starLevel.map((x) => {
                        return <>{x && <$Star src={x} />}</>;
                      })
                    )}
                  </$StarPlace>
                </$TitleLine>
                <$NameLine>
                  <$DescBalloon
                    style={{
                      backgroundColor:
                        yearOwner || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        yearOwner || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={dateHandler}
                  >
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
                  <$DescBalloon
                    style={{
                      backgroundColor:
                        yearOwner || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        yearOwner || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={nameHandler}
                  >
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
                  <$DescBalloon2
                    style={{
                      backgroundColor:
                        yearOwner || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        yearOwner || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={recordHandler}
                  >
                    {recordSwitch == true ? (
                      <div
                        ref={rc1Ref}
                        style={{
                          fontSize: `${fontSize.rc1}px`,
                          // width: '100%',
                          textAlign: 'center',
                          width: '450px',
                          wordBreak: 'break-all',
                        }}
                      >
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
                  <$DescBalloon2
                    style={{
                      backgroundColor:
                        yearOwner || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        yearOwner || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={commentHandler}
                  >
                    {commentSwitch == true ? (
                      <div
                        ref={c2Ref}
                        style={{
                          fontSize: `${fontSize.c1}px`,
                          width: '450px',
                          wordBreak: 'break-all',
                          textAlign: 'center',
                        }}
                      >
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
                  setCurrentAvatar(rawsetAT[e.value.split(':')[1]]);
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
          <$Kind>~특수~</$Kind>
          <$BaseArea
            onContextMenu={(e) => {
              e.preventDefault();
              if (!nameSwitch2) setNameSwitch2(!nameSwitch2);
              if (!specialWeekSwitch) setSpecialWeekSwitch(!specialWeekSwitch);
              if (!specialLevelSwitch)
                setSpecialLevelSwitch(!specialLevelSwitch);
              if (!currentDateSwitch2)
                setCurrentDateSwitch2(!currentDateSwitch2);
              if (!recordSwitch2) setRecordSwitch2(!recordSwitch2);
              if (!commentSwitch2) setCommentSwitch2(!commentSwitch2);
            }}
          >
            <div>
              <$Card
                ref={downloadRef3}
                img={bgimg}
                color={bColor}
                style={{
                  backgroundImage: imageInsertedSrc
                    ? `url(${imageInsertedSrc})`
                    : `none`,
                  backgroundColor: imageInsertedSrc ? `black` : `cadetblue`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  // background: `url(${bgimg}), linear-gradient(330deg, ${hColor} 40%, white 47%, white 49%, ${bColor} 56%)`,
                }}
              >
                <$TitleLine
                  color={hColor}
                  style={{
                    background: 'transparent',
                  }}
                >
                  <div
                    style={
                      imageInserted
                        ? {
                            fontFamily: 'giants-bold',
                            color: 'white',
                          }
                        : {
                            fontFamily: 'giants-bold',
                            color: 'black',
                          }
                    }
                    onClick={levelHandler}
                  >
                    LV{' '}
                    {specialLevelSwitch ? (
                      <span>{specialLevel}</span>
                    ) : (
                      <input
                        value={specialLevel}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          setSpecialLevel(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key == 'Enter') levelHandler();
                        }}
                      ></input>
                    )}
                  </div>
                  <div onClick={specialWeekHandler}>
                    {specialWeekSwitch ? (
                      <span
                        style={
                          imageInserted
                            ? {
                                fontFamily: 'giants-bold',
                                color: 'white',
                              }
                            : {
                                fontFamily: 'giants-bold',
                                color: 'black',
                              }
                        }
                      >
                        {specialWeek}
                      </span>
                    ) : (
                      <input
                        value={specialWeek}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onKeyDown={(e) => {
                          if (e.key == 'Enter') specialWeekHandler();
                        }}
                        onChange={(e) => {
                          setSpecialWeek(e.target.value);
                        }}
                      ></input>
                    )}
                  </div>
                </$TitleLine>
                <$NameLine>
                  <$DescBalloon
                    style={{
                      backgroundColor:
                        imageInserted || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        imageInserted || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={dateHandler2}
                  >
                    {currentDateSwitch2 == true ? (
                      <div style={{ width: '100%', textAlign: 'center' }}>
                        {currentDate2 ? currentDate2 : '날짜'}
                      </div>
                    ) : (
                      <input
                        onKeyUp={(e) => {
                          if (e.key == 'Enter') {
                            setCurrentDateSwitch2(!currentDateSwitch2);
                          }
                        }}
                        value={currentDate2}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          setCurrentDate2(e.target.value);
                        }}
                      ></input>
                    )}
                  </$DescBalloon>
                  <$DescBalloon
                    style={{
                      backgroundColor:
                        imageInserted || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        imageInserted || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={nameHandler2}
                  >
                    {nameSwitch2 == true ? (
                      <div style={{ width: '100%', textAlign: 'center' }}>
                        {name2 ? name2 : '이름'}
                      </div>
                    ) : (
                      <input
                        onKeyUp={(e) => {
                          if (e.key == 'Enter') {
                            setNameSwitch2(!nameSwitch2);
                          }
                        }}
                        value={name2}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          setName2(e.target.value);
                        }}
                      ></input>
                    )}
                  </$DescBalloon>
                </$NameLine>
                <$ImgLine>
                  <$EntryPlace>
                    {party2.map((x, i) => {
                      return (
                        <$PKplacer
                          onClick={() => {
                            searchPK2(i);
                          }}
                        >
                          <$eachPK src={x}></$eachPK>
                          {searchSwitch2[i] == false && (
                            <$Select
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Select
                                options={option}
                                onChange={(e) => {
                                  changePK2(i, e.value);
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
                      src={currentAvatar2 ? currentAvatar2 : atdb[1247].url}
                    ></$AvatarImg>
                  </$AvatarPlace>
                </$ImgLine>
                <$BottomLine>
                  <$DescBalloon2
                    style={{
                      backgroundColor:
                        imageInserted || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        imageInserted || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={recordHandler2}
                  >
                    {recordSwitch2 == true ? (
                      <div
                        ref={rc2Ref}
                        style={{
                          fontSize: `${fontSize.rc2}px`,
                          width: '450px',
                          wordBreak: 'break-all',
                          textAlign: 'center',
                        }}
                      >
                        {record2 ? record2 : '기록'}
                      </div>
                    ) : (
                      <input
                        onKeyUp={(e) => {
                          if (e.key == 'Enter') {
                            setRecordSwitch2(!recordSwitch2);
                          }
                        }}
                        value={record2}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          setRecord2(e.target.value);
                        }}
                      ></input>
                    )}
                  </$DescBalloon2>
                  <$DescBalloon2
                    style={{
                      backgroundColor:
                        imageInserted || currentLevel == 10
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.6)',
                      color:
                        imageInserted || currentLevel == 10 ? 'white' : 'black',
                    }}
                    onClick={commentHandler2}
                  >
                    {commentSwitch2 == true ? (
                      <div
                        ref={c1Ref}
                        style={{
                          fontSize: `${fontSize.c2}px`,
                          width: '450px',
                          wordBreak: 'break-all',
                          textAlign: 'center',
                        }}
                      >
                        {comment2 ? comment2 : '한마디'}
                      </div>
                    ) : (
                      <input
                        onKeyUp={(e) => {
                          if (e.key == 'Enter') {
                            setCommentSwitch2(!commentSwitch2);
                          }
                        }}
                        value={comment2}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={(e) => {
                          setComment2(e.target.value);
                        }}
                      ></input>
                    )}
                  </$DescBalloon2>
                </$BottomLine>
              </$Card>
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
              <$GenerateButton ref={buttonRef2} onClick={exportElementAsPNG2}>
                DOWNLOAD
              </$GenerateButton>
              <Select
                options={option2}
                onChange={(e) => {
                  setCurrentAvatar2(rawsetAT[e.value.split(':')[1]]);
                }}
              />
              <input
                style={{ display: 'none' }}
                name="forLabel"
                id="forLabel"
                type="file"
                onChange={backgroundHandler}
              ></input>
              <label for="forLabel">
                <$InsertButton>이미지삽입</$InsertButton>
              </label>
              <$InsertButton2
                onClick={() => {
                  setImageInserted(!imageInserted);
                }}
              >
                반전
              </$InsertButton2>
              <$InsertButton2
                onClick={() => {
                  setImageInsertedSrc('');
                }}
              >
                리셋
              </$InsertButton2>
              <$InsertButton2
                onClick={() => {
                  if (downloadRef3.current) {
                    if (downloadRef3.current.style.backgroundSize == 'cover')
                      downloadRef3.current.style.backgroundSize = 'contain';
                    else downloadRef3.current.style.backgroundSize = 'cover';
                  }
                }}
              >
                배경사이즈
              </$InsertButton2>
            </div>
          </$BaseArea>
        </div>
      )}
    </>
  );
};

const $Kind = styled.div`
  font-family: 'wehaven-bold';
  font-size: 32px;
  margin: 10px;
`;

const $InsertButton = styled.div`
  border: 1px solid black;
  background-color: white;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
`;
const $InsertButton2 = styled.button`
  border: 1px solid black;
  background-color: white;
  font-family: 'wehaven-bold';
  font-size: 16px;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
`;

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
  font-family: 'giants-inline';
  font-size: 24px;
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
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const $AvatarImg = styled.img`
  width: 120px;
  filter: brightness(120%);
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
  filter: drop-shadow(10px -3px 1px white);
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
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  min-width: 45%;
  padding: 5px;
  /* text-align: center; */
`;

const $DescBalloon2 = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin-bottom: 5px;
  width: 100%;
  font-size: 13px;
  padding: 5px;
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
  font-family: 'wehaven-bold';
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
