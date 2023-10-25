import css from '@styled-system/css';
import { MarketTitles } from '../../constants';
import { Wrapper, Row, Title, StyledText } from '../dashboardStyles';
import { MarketValueList } from './dummy';

const CUTOM_TEXT_CSS = css({ fontWeight: 500, fontSize: [16, null, 18, null, 28] });

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AssetsProps {}

const Total: React.FC<AssetsProps> = () => {
  return (
    <Wrapper>
      <Row>
        {MarketTitles.map((t, index) => (
          <Title key={index}>{t}</Title>
        ))}
      </Row>
      {MarketValueList.map((a, index) => (
        <Row key={index}>
          <StyledText css={CUTOM_TEXT_CSS}> {a.totalMarketValue}</StyledText>
          <StyledText css={CUTOM_TEXT_CSS}>{a.totalAssets}</StyledText>
          <StyledText css={CUTOM_TEXT_CSS}> {a.totalBorrowing}</StyledText>
          <StyledText css={CUTOM_TEXT_CSS}> {a.totalRewards}</StyledText>
        </Row>
      ))}
    </Wrapper>
  );
};

export default Total;
