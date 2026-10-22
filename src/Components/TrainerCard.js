import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { toPng } from 'html-to-image';
import { RiShiningFill } from 'react-icons/ri';
import { FaCrown } from 'react-icons/fa';
import { atdb } from './AVATARDB';
import { db } from './PKDB';
import bgimg from '../Logo/ball3.png';
import star from '../items/star-new2.png';
import star2 from '../items/star-new3.png';
import unknown from '../trainer/unknown.png';
import hubo1 from '../items/hubo1.jpg';

// 기존 파일과 같은 위치에서 사용합니다. 카드 디자인 / 클릭 편집 방식 유지.
const CARD_WIDTH = 480;
const CARD_HEIGHT = 300;
const THEMES = [
  { title: 'Iron Card', header: '#81BCCE', background: '#C1DFE2' },
  { title: 'Bronze Card', header: 'orange', background: '#ffc3b5' },
  { title: 'Silver Card', header: '#BEC1C8', background: '#E5E5E3' },
  { title: 'Gold Card', header: '#FFCB00', background: '#FFE616' },
  { title: 'Emerald Card', header: '#05803C', background: '#7ED18F' },
  { title: 'Diamond Card', header: '#8444DA', background: '#C089F8' },
  { title: 'Epic Card', header: '#FF6ACE', background: '#FFAADB' },
  { title: 'Master Card', header: '#626885', background: '#B0AFB7' },
  { title: 'GrandMaster Card', header: '#B01212', background: '#FF6E77' },
  { title: 'LEGEND CARD', header: 'black', background: '#292929' },
  { title: 'YEAR-OWNER CARD', header: '#FFC911', background: '#8EF1F0' },
];

// 매 렌더마다 동일한 옵션 / 이미지 배열을 다시 만들지 않습니다.
const POKEMON_OPTIONS = db.map((pokemon, index) => ({
  value: index,
  label: pokemon.nameKo,
}));
const AVATAR_OPTIONS = atdb.map((avatar, index) => ({
  value: index,
  label: avatar.name,
}));
const renderAvatarOption = (option) => (
  <div>
    {option.label}{' '}
    <img style={{ width: '30px' }} src={atdb[option.value].url} alt="" />
  </div>
);

const createCardState = () => ({
  party: Array(6).fill(0),
  date: '',
  name: '',
  record: '',
  comment: '',
  avatar: '',
  avatarOption: null,
  level: 1,
  specialLevel: '0',
  specialWeek: 'Special Rule',
  background: '',
  inverted: false,
  backgroundSize: 'contain',
});

// 화면에는 가용 너비에 맞춰 표시하고, 다운로드는 원본 480×300을 캡처합니다.
function ResponsiveCard({ children }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const resize = () => {
      setScale(container.clientWidth / CARD_WIDTH);
    };
    resize();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <$PreviewViewport
      ref={containerRef}
      style={{ height: CARD_HEIGHT * scale }}
    >
      <div
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </$PreviewViewport>
  );
}

// 클릭 → 입력, Enter → 완료. 카드 내부에서 편집하는 원본 UX 유지.
function EditableText({
  value,
  placeholder,
  editing,
  onToggle,
  onChange,
  style,
}) {
  return editing ? (
    <input
      aria-label={placeholder}
      value={value}
      onClick={(event) => event.stopPropagation()}
      onChange={(event) => onChange(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === 'Enter' && !event.nativeEvent.isComposing) onToggle();
      }}
    />
  ) : (
    <div style={style}>{value || placeholder}</div>
  );
}

function CardTitle({ special, card, editing, toggleEdit, update }) {
  const theme = THEMES[card.level - 1];
  const yearOwner = card.level === 11;
  const legend = card.level === 10;
  const specialTitleStyle = {
    fontFamily: 'giants-bold',
    color: card.inverted ? 'white' : 'black',
  };

  if (special) {
    return (
      <$TitleLine style={{ background: 'transparent' }}>
        <div
          style={specialTitleStyle}
          onClick={() => toggleEdit('specialLevel')}
        >
          LV{' '}
          {editing.specialLevel ? (
            <EditableText
              value={card.specialLevel}
              placeholder="레벨"
              editing
              onToggle={() => toggleEdit('specialLevel')}
              onChange={(value) => update('specialLevel', value)}
            />
          ) : (
            <span>{card.specialLevel}</span>
          )}
        </div>
        <div onClick={() => toggleEdit('specialWeek')}>
          {editing.specialWeek ? (
            <EditableText
              value={card.specialWeek}
              placeholder="특수 룰"
              editing
              onToggle={() => toggleEdit('specialWeek')}
              onChange={(value) => update('specialWeek', value)}
            />
          ) : (
            <span style={specialTitleStyle}>{card.specialWeek}</span>
          )}
        </div>
      </$TitleLine>
    );
  }

  return (
    <$TitleLine
      style={{
        background: yearOwner
          ? 'transparent'
          : `linear-gradient(to right bottom, ${theme.header}, ${theme.background})`,
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
            : { fontFamily: 'giants-bold', color: 'white' }
        }
      >
        {theme.title}
        {legend && <FaCrown style={{ marginLeft: '3px', color: '#FFDB00' }} />}
        {card.level >= 7 &&
          card.level <= 9 &&
          Array.from({ length: card.level - 6 }, (_, index) => (
            <RiShiningFill
              key={index}
              style={index === 0 ? { marginLeft: '3px' } : undefined}
            />
          ))}
      </div>
      <$StarPlace>
        {yearOwner ? (
          <$Year>{new Date().getFullYear()}</$Year>
        ) : (
          Array.from({ length: Math.min(card.level, 5) }, (_, index) => (
            <$Star
              key={index}
              src={index < card.level - 5 ? star2 : star}
              alt=""
            />
          ))
        )}
      </$StarPlace>
    </$TitleLine>
  );
}

function PartyEditor({ party, onChange, prefix }) {
  const [opened, setOpened] = useState(Array(6).fill(false));
  const toggle = (slot) => {
    setOpened((previous) =>
      previous.map((value, index) => (index === slot ? !value : value)),
    );
  };

  return (
    <$EntryPlace>
      {party.map((pokemon, slot) => (
        <$PKplacer key={slot} onClick={() => toggle(slot)}>
          <$eachPK
            src={db[pokemon]?.url || unknown}
            alt={db[pokemon]?.nameKo || '포켓몬'}
          />
          {opened[slot] && (
            <$Select onClick={(event) => event.stopPropagation()}>
              <Select
                instanceId={`${prefix}-pokemon-${slot}`}
                aria-label={`포켓몬 ${slot + 1} 선택`}
                options={POKEMON_OPTIONS}
                // 축소된 카드 밖으로 메뉴를 띄워 모바일에서도 읽고 선택하기 쉽게 합니다.
                menuPortalTarget={
                  typeof document !== 'undefined' ? document.body : undefined
                }
                menuPosition="fixed"
                menuPlacement="auto"
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                onChange={(option) => {
                  if (!option) return;
                  onChange(slot, option.value);
                  setOpened((previous) =>
                    previous.map((value, index) =>
                      index === slot ? false : value,
                    ),
                  );
                }}
              />
            </$Select>
          )}
        </$PKplacer>
      ))}
    </$EntryPlace>
  );
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('이미지 파일을 선택해주세요.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('이미지를 읽지 못했습니다.'));
    reader.onabort = () => reject(new Error('이미지 읽기가 취소되었습니다.'));
    reader.readAsDataURL(file);
  });
}

function TrainerCardSection({ special = false }) {
  const [card, setCard] = useState(createCardState);
  const [editing, setEditing] = useState({});
  const [downloading, setDownloading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const captureRef = useRef(null);
  const avatarInputRef = useRef(null);
  const backgroundInputRef = useRef(null);
  const downloadLockRef = useRef(false);
  const prefix = special ? 'special' : 'regular';
  const theme = THEMES[card.level - 1];
  const yearOwner = !special && card.level === 11;
  const darkPanel = special ? card.inverted : yearOwner || card.level === 10;
  const panelStyle = {
    backgroundColor: darkPanel
      ? 'rgba(0, 0, 0, 0.3)'
      : 'rgba(255, 255, 255, 0.6)',
    color: darkPanel ? 'white' : 'black',
  };

  const update = (field, value) => {
    setCard((previous) => ({ ...previous, [field]: value }));
  };
  const toggleEdit = (field) => {
    setEditing((previous) => ({ ...previous, [field]: !previous[field] }));
  };
  const changePokemon = (slot, value) => {
    setCard((previous) => ({
      ...previous,
      party: previous.party.map((pokemon, index) =>
        index === slot ? value : pokemon,
      ),
    }));
  };
  const uploadImage = async (event, field) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const source = await readImage(file);
      setCard((previous) => ({
        ...previous,
        [field]: source,
        ...(field === 'avatar' ? { avatarOption: null } : {}),
      }));
    } catch (error) {
      alert(error.message || '이미지를 불러오지 못했습니다.');
    }
  };
  const download = async () => {
    if (downloadLockRef.current || !captureRef.current) return;
    downloadLockRef.current = true;
    setDownloading(true);
    setAnimating(true);
    try {
      await document.fonts?.ready;
      // 화면 쪽 래퍼를 확대하지 않고 캡처 복제본만 원본 크기로 출력합니다.
      const image = await toPng(captureRef.current, {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        pixelRatio: 1,
        style: {
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
          transform: 'none',
        },
      });
      const anchor = document.createElement('a');
      anchor.href = image;
      anchor.download = 'trainer-card.png';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch (error) {
      console.error(error);
      alert('이미지 저장에 실패했습니다. 이미지 로딩 상태를 확인해주세요.');
    } finally {
      downloadLockRef.current = false;
      setDownloading(false);
    }
  };

  const renderField = (field, placeholder, bottom = false) => {
    const Balloon = bottom ? $DescBalloon2 : $DescBalloon;
    return (
      <Balloon style={panelStyle} onClick={() => toggleEdit(field)}>
        <EditableText
          value={card[field]}
          placeholder={placeholder}
          editing={Boolean(editing[field])}
          onToggle={() => toggleEdit(field)}
          onChange={(value) => update(field, value)}
          style={
            bottom
              ? {
                  // 원본의 46자 기준 유지. 별도의 state / useEffect는 필요 없습니다.
                  fontSize: card[field].length > 46 ? '8px' : '14px',
                  textAlign: 'center',
                  width: '450px',
                  wordBreak: 'break-all',
                }
              : { width: '100%', textAlign: 'center' }
          }
        />
      </Balloon>
    );
  };

  return (
    <>
      <$Kind>{special ? '~특수~' : '~정규~'}</$Kind>
      <$BaseArea
        onContextMenu={(event) => {
          event.preventDefault();
          setEditing({});
        }}
      >
        <$CardColumn>
          <ResponsiveCard>
            <$Card
              ref={captureRef}
              style={
                special
                  ? {
                      backgroundImage: card.background
                        ? `url(${card.background})`
                        : 'none',
                      backgroundColor: card.background ? 'black' : 'cadetblue',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: card.backgroundSize,
                      backgroundPosition: 'center',
                    }
                  : {
                      background: yearOwner
                        ? `url(${hubo1})`
                        : `url(${bgimg}), linear-gradient(350deg, ${theme.header} 20%, ${theme.background} 50%)`,
                    }
              }
            >
              <CardTitle
                special={special}
                card={card}
                editing={editing}
                toggleEdit={toggleEdit}
                update={update}
              />
              <$NameLine>
                {renderField('date', '날짜')}
                {renderField('name', '이름')}
              </$NameLine>
              <$ImgLine>
                <PartyEditor
                  party={card.party}
                  onChange={changePokemon}
                  prefix={prefix}
                />
                <$AvatarPlace>
                  <$AvatarImg
                    onContextMenu={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      avatarInputRef.current?.click();
                    }}
                    src={card.avatar || unknown}
                    alt="트레이너"
                  />
                </$AvatarPlace>
              </$ImgLine>
              <$BottomLine>
                {renderField('record', '기록', true)}
                {renderField('comment', '한마디', true)}
              </$BottomLine>
            </$Card>
          </ResponsiveCard>
          {!special && (
            <$LevelSetter>
              {THEMES.map((item, index) => (
                <$EachLevel
                  key={item.title}
                  onClick={() => update('level', index + 1)}
                >
                  {index + 1}
                </$EachLevel>
              ))}
            </$LevelSetter>
          )}
        </$CardColumn>
        <$ControlArea>
          <$GenerateButton
            onClick={download}
            disabled={downloading}
            style={{ animation: animating ? 'jelly 0.5s linear' : 'none' }}
            onAnimationEnd={() => setAnimating(false)}
          >
            DOWNLOAD
          </$GenerateButton>
          <Select
            instanceId={`${prefix}-avatar`}
            aria-label="트레이너 선택"
            options={AVATAR_OPTIONS}
            formatOptionLabel={renderAvatarOption}
            value={
              card.avatarOption === null
                ? null
                : AVATAR_OPTIONS[card.avatarOption]
            }
            onChange={(option) => {
              if (!option) return;
              setCard((previous) => ({
                ...previous,
                avatar: atdb[option.value].url,
                avatarOption: option.value,
              }));
            }}
          />
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => uploadImage(event, 'avatar')}
          />
          {special && (
            <>
              <input
                ref={backgroundInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => uploadImage(event, 'background')}
              />
              <$InsertButton
                onClick={() => backgroundInputRef.current?.click()}
              >
                이미지삽입
              </$InsertButton>
              <$InsertButton2
                onClick={() => update('inverted', !card.inverted)}
              >
                반전
              </$InsertButton2>
              <$InsertButton2 onClick={() => update('background', '')}>
                리셋
              </$InsertButton2>
              <$InsertButton2
                onClick={() =>
                  update(
                    'backgroundSize',
                    card.backgroundSize === 'cover' ? 'contain' : 'cover',
                  )
                }
              >
                배경사이즈
              </$InsertButton2>
            </>
          )}
        </$ControlArea>
      </$BaseArea>
    </>
  );
}

const TrainerCard = () => {
  const [password, setPassword] = useState('');
  const [locked, setLocked] = useState(true);
  const passwordPass = () => {
    // 원본 비밀번호 그대로 사용. 환경변수로 덮어쓰지 않습니다.
    if (password === 'hengbengquatrobe') setLocked(false);
    else alert('비밀번호를 확인해주세요');
  };

  return locked ? (
    <$AllArea>
      <div style={{ color: 'white' }}>
        <div>비밀번호를 입력해주세요</div>
        <input
          type="password"
          aria-label="비밀번호"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter') passwordPass();
          }}
        />
        <button onClick={passwordPass}>입력</button>
      </div>
    </$AllArea>
  ) : (
    <div>
      <br />
      <TrainerCardSection />
      <TrainerCardSection special />
    </div>
  );
};

// 아래 기본 스타일은 원본 유지. 모바일 배치에 필요한 media query만 추가.
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
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 6px;
    > div {
      flex: 1;
      min-width: 0;
      min-height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const $Select = styled.div`
  position: absolute;
  margin-top: -40px;
  z-index: 10;
  @media (max-width: 767px) {
    width: 180px;
    left: 50%;
    transform: translateX(-50%);
  }
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
  border-radius: 5px;
`;
const $eachPK = styled.img`
  max-width: 60px;
  filter: drop-shadow(10px -3px 1px white);
`;
const $EntryPlace = styled.div`
  width: 300px;
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
`;
const $DescBalloon2 = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin-bottom: 5px;
  width: 100%;
  font-size: 13px;
  padding: 5px;
  text-align: center;

  line-height: 18px;
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
  padding: 5px 10px;
  box-sizing: border-box;
  color: white;
`;
const $Card = styled.div`
  width: 480px;
  height: 300px;
  background-repeat: no-repeat;

  -webkit-text-size-adjust: none;
  text-size-adjust: none;
`;
const $BaseArea = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'wehaven-bold';
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    /* 부모의 좌우 패딩과 무관하게 모바일 화면 너비를 사용합니다. */
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    max-width: none;
    min-width: 0;
    padding: 0 1px 24px;
    box-sizing: border-box;
  }
`;
// transform은 원래 레이아웃 폭을 줄이지 않으므로 래퍼에서 넘침을 차단합니다.
// 포켓몬 선택 메뉴는 body 포털을 사용하므로 여기에 잘리지 않습니다.
const $PreviewViewport = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;
const $CardColumn = styled.div`
  width: 480px;
  flex-shrink: 0;
  @media (max-width: 767px) {
    width: 100%;
    max-width: none;
    min-width: 0;
  }
`;
const $ControlArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  height: 400px;
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: 8px;
    width: 100%;
    max-width: 480px;
    height: auto;
    > button:first-child {
      grid-column: 1 / -1;
      width: 100%;
      min-height: 44px;
    }
    > button:first-child + div {
      grid-column: 1 / -1;
      width: 100%;
      min-width: 0;
    }
    > button {
      min-height: 44px;
    }
    > ${$InsertButton} {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  }
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
  &:disabled {
    cursor: wait;
  }
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
