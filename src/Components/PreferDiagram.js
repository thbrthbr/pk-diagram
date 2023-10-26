import styled from 'styled-components';

const $Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const $Diagram = styled.div`
  width: 90vw;
  height: 200px;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
  border: 1px black solid;
`;

const $Card = styled.div`
  width: 200px;
  height: 250px;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
`;

const PreferDiagram = () => {
  const types = [
    { type: '풀', color: '#008000' },
    { type: '물', color: '#2771fb' },
    { type: '불꽃', color: '#ff0000' },
    { type: '바위', color: '#cbb76f' },
    { type: '전기', color: '#fffb00' },
    { type: '땅', color: '#ffe8ac' },
    { type: '악', color: '#4b4b4b' },
    { type: '페어리', color: '#ffc0cb' },
    { type: '격투', color: '#8e0018' },
    { type: '에스퍼', color: '#ff109b' },
    { type: '강철', color: '#bed3d6' },
    { type: '벌레', color: '#74d200' },
    { type: '독', color: '#8f018a' },
    { type: '고스트', color: '#480146' },
    { type: '노말', color: '#eeeeee' },
    { type: '얼음', color: '#94faff' },
    { type: '드래곤', color: '#3051ca' },
    { type: '비행', color: '#e7f9ff' },
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
            </$Card>
          );
        })}
      </$Container>
      <$Diagram></$Diagram>
    </>
  );
};

export default PreferDiagram;
