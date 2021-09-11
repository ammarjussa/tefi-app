import { convertToFloatValue } from '../../../utils/convertFloat';

export const getPylonGatewayData = (pylon) => {
  const getGatewayTotal = () => {
    const total = parseFloat(pylon?.pylonSum?.gatewayDepositsSum) + parseFloat(pylon?.pylonSum?.gatewayRewardsSum);
    return total.toString() ?? '0';
  };

  const gatewayData = pylon.pylonGateway
    .slice()
    .sort((a, b) => parseFloat(b.rewardsValue) - parseFloat(a.rewardsValue));

  const data = gatewayData.map((asset: PylonGateway) => {
    return [
      {
        name: asset.poolName,
      },
      {
        deposit: '$' + convertToFloatValue(asset.totalDeposit),
      },

      {
        reward: {
          token: convertToFloatValue(asset.rewards) + ' ' + asset.symbol,
          tokenValue: '$' + convertToFloatValue(asset?.rewardsValue),
        },
      },
    ];
  });

  if (!gatewayData || gatewayData.length === 0) {
    return {};
  }

  return {
    titles: ['Pool Name', 'Deposit', 'Rewards'],
    data: data,
    total: '$' + convertToFloatValue(getGatewayTotal()),
    totalValue: parseFloat(getGatewayTotal()),
  };
};
