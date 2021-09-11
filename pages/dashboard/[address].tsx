import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import css from '@styled-system/css';
import Styled from 'styled-components';
import { Box } from '@contco/core-ui';
import { AccAddress } from '@terra-money/terra.js';
import { NetworkStatus, useLazyQuery } from '@apollo/client';
import Loading from '../../components/Loading';
import EmptyComponent from '../../components/EmptyComponent';
import Header from '../../components/Header';
import Assets from '../../components/Asset';
import LunaStaking from '../../components/LunaStaking';
import MarketValue from '../../components/MarketValue';
import Borrowing from '../../components/Borrowing';
import PylonGateway from '../../components/PylonGateway';
import Pools from '../../components/Pools';
import SpectrumFarms from '../../components/SpectrumFarms';
import SpectrumRewards from '../../components/SpectrumRewards';
import Rewards from '../../components/Rewards';
import Loterra from '../../components/ؒLoterra';
import { getAssets } from '../../graphql/queries/getAssets';
import Airdrops from '../../components/Airdrop';
import { NextSeo } from 'next-seo';
import { DashboardSEO } from '../../next-seo.config';
import Earn from '../../components/Earn';
import Burn from '../../components/Burn';
import ShortFarms from '../../components/ShortFarms';
import MirrorBorrowing from '../../components/MirrorBorrowing';
import StarTerraFarms from '../../components/StarTerraFarms';
import { useAssetsDataContext } from '../../contexts';

const MAX_TRY = 3;

const Body = Styled(Box)`
${css({
  m: 'auto',
  width: ['90%', null, '75%'],
  mt: 20,
  overflowX: ['scroll', null, null, null, null, 'hidden'],
})}
`;

const Dashboard: React.FC = ({ theme, changeTheme }: any) => {
  const [fetchCount, setFetchCount] = useState<number>(0);
  const router = useRouter();
  const address = router?.query?.address as string;
  const isValidAddress = AccAddress.validate(address);

  const [fetchAssets, { data, called, loading: dataLoading, error, refetch, networkStatus }] = useLazyQuery(getAssets, {
    variables: { address: address },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (address && isValidAddress) {
      fetchAssets({ variables: { address } });
    }
  }, [address, isValidAddress]);

  useEffect(() => {
    if (error && fetchCount !== MAX_TRY) {
      setFetchCount(fetchCount + 1);
      setTimeout(() => {
        refetch();
      }, 3000);
    }
  }, [error]);

  const getErrorMessage = () => {
    if (error) {
      return 'Oops! Error Fetching Assets';
    } else if (!isValidAddress) {
      return 'Terra Address is not valid';
    }
    return null;
  };

  const loading = isValidAddress
    ? (!called || dataLoading || (!data && fetchCount !== MAX_TRY)) && networkStatus !== NetworkStatus.refetch
    : false;

  const { loader, assets } = useAssetsDataContext();

  return (
    <div>
      <NextSeo {...DashboardSEO} />
      <div>
        <Header
          onRefresh={loading ? null : () => refetch()}
          refreshing={networkStatus == NetworkStatus.refetch}
          theme={theme}
          changeTheme={changeTheme}
          addressType={''}
          address={isValidAddress ? address : ''}
          isViewOnly={true}
        />
        {loading || loader ? (
          <Loading />
        ) : !isValidAddress || !data || data?.length === 0 ? (
          <EmptyComponent msg={getErrorMessage()} />
        ) : (
          <Body>
            <MarketValue
              allData={[
                assets.assets,
                assets?.pylon,
                assets?.anchorEarn,
                assets?.anchorBond,
                assets?.anchorBorrow,
                assets.rewards,
                assets.pools,
                assets?.mirrorBorrow,
                assets?.mirrorShortFarm,
                assets?.specFarm,
                assets?.specReward,
                assets?.starterraFarms,
                assets?.loterra,
                assets.lunaStaking,
                assets.airdrops,
              ]}
            />
            <Assets assets={assets.assets} />
            <PylonGateway pylon={assets?.pylon || {}} />
            <Earn earn={assets?.anchorEarn || {}} />
            <Burn burn={assets?.anchorBond || {}} />
            <Borrowing borrow={assets?.anchorBorrow || {}} />
            <Rewards rewards={assets.rewards} />
            <Pools pools={assets.pools} />
            <MirrorBorrowing borrow={assets?.mirrorBorrow || {}} />
            <ShortFarms short={assets?.mirrorShortFarm || {}} />
            <SpectrumFarms farm={assets?.specFarm} />
            <SpectrumRewards reward={assets?.specReward} />
            <StarTerraFarms farm={assets?.starterraFarms} />
            <Loterra loterra={assets?.loterra} />
            <LunaStaking staking={assets.lunaStaking || {}} />
            <Airdrops airdrops={assets.airdrops} />
          </Body>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
