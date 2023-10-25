import css from '@styled-system/css';
import { RewardsTitle } from '../../constants';
import { TotalRewards, RewardList } from './dummy';
import { Wrapper, Row, HeadingWrapper, Heading, Title, StyledText, HoverText } from '../dashboardStyles';

const HEADING_TEXT = `Rewards`;

const CSS_APR = (props) =>
  css({
    fontWeight: 500,
    color: props.theme.colors.secondary,
  });
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RewardsProps {}

const Rewards: React.FC<RewardsProps> = () => {
  return (
    <Wrapper>
      <HeadingWrapper>
        <Heading>{HEADING_TEXT}</Heading>
        <StyledText>{TotalRewards}</StyledText>
      </HeadingWrapper>
      <Row>
        {RewardsTitle.map((t, index) => (
          <Title key={index}>{t}</Title>
        ))}
      </Row>
      {RewardList.map((a, index) => (
        <Row key={index}>
          <StyledText fontWeight="500"> {a.name}</StyledText>
          <StyledText isChildren={true}>
            {' '}
            {a.stacked?.LP}
            <HoverText>
              {a.stacked?.mUSO} <br />
              {a.stacked?.UST}
            </HoverText>
          </StyledText>
          <StyledText css={CSS_APR}> {a.APR}</StyledText>
          <StyledText>{a.reward}</StyledText>
        </Row>
      ))}
    </Wrapper>
  );
};

export default Rewards;
