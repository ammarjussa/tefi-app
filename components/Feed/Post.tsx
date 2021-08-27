import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import {Flex, Text} from "@contco/core-ui";
import {format} from 'date-fns';

const Container = styled.div`
  width: 100%;
  ${props => css({
    height: [250],
    mt: 3,
    mb: [40, null, null, 60, null,  80],
    px: 4,
    bg: 'background',
    borderRadius: 20,
    boxShadow: props.theme.boxShadow,
    border: '1px solid #f2f2f2',
  })}
`;


const StyledText = styled(Text)`
  ${css({
    fontSize: [0,null, null, 1, null , 1],
    fontWeight: 500,
    color: 'secondary',
  })}
`;

const MemoText = styled(StyledText)`
${css({
  color: 'text3',
})}
`;

const DateText = styled(StyledText)`
  ${css({
    textAlign: 'right'
  })}
`;

const Section = styled(Flex)`
  align-items: center;
  height: 40px;
`;

const TopSection = styled(Section)`
  justify-content: space-between;
 
`;

const BottomSection = styled(Section)`
  justify-content: flex-end;
`;

const MemoSection = styled(Flex)`
  ${css({
    height: 'calc(100% - 80px)',
    py: 4,
  })}
`;
const Post = ({ data: { memo, from_address: address, block,  timestamp} }: any) => {

  const slicedAddress =
    address && `${address?.slice(0, 6) + '....' + address?.slice(address?.length - 6, address?.length)}`;

  const date =  timestamp ? new Date(timestamp) : new Date();
  
  return (
    <Container>
       <TopSection>
          <StyledText>{slicedAddress}</StyledText>
          <StyledText>{new Intl.NumberFormat().format(block ?? '0')}</StyledText>
      </TopSection>
      <MemoSection>
        <MemoText>{memo}</MemoText>
      </MemoSection>
        <BottomSection>
          <DateText>{format(date, 'd/MM/y')} &nbsp; &nbsp; {format(date, 'h:mm a')}</DateText>
        </BottomSection>
    </Container>
  );
};

export default Post;
