import { atdb } from './AVATARDB';
import styled from 'styled-components';

const TrainerCard = () => {
  return (
    <$AreaWrapper>
      {atdb.map((x) => {
        return (
          <$Avatar>
            <img src={x.url}></img>
            <$NameTag>{x.name}</$NameTag>
          </$Avatar>
        );
      })}
    </$AreaWrapper>
  );
};

const $NameTag = styled.div`
  font-size: 10px;
`;

const $Avatar = styled.div`
  width: 96px;
  margin: 15px;
`;

const $AreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export { TrainerCard };
