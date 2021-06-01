import { client } from './test-defaults';
import { getLatestBlockHeight } from './utils';
import { gql } from '@apollo/client';

export const getGovAPY = async () => {
  const height = await getLatestBlockHeight();
  const result = await client.query({
    query: gql`
      query AnchorGovRewards {
        AnchorGovRewardRecords(Height: ${height}) {
          CurrentAPY
        }
      }
    `,
  });

  const govAPY = result.data.AnchorGovRewardRecords[0].CurrentAPY;
  console.log('GovAPY', govAPY);

  return govAPY;
};

export default async () => {
  const govApy = await getGovAPY();
  return { govApy };
};
