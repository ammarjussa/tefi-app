import Header from '../../components/Header';
import Head from 'next/head';
import AssetSupply from '../../components/AssetSupply';

const Supply: React.FC = ({ theme, changeTheme }: any) => {
  const data = [
    {
      current: '0',
      day: '-10',
      hour: '4',
      month: '220',
      symbol: 'luna',
      week: '-44321',
    },
  ];

  return (
    <>
      <Head>
        <title>Tefi App - Asset Supply</title>
      </Head>
      <Header theme={theme} changeTheme={changeTheme} />
      <AssetSupply assetSupply={data as any} />
    </>
  );
};

export default Supply;
