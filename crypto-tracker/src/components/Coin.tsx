import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCoin, getCoinTickers } from '../api';
import { TickerData } from './Price';


const Container = styled.div`
    padding: 0px 20px;
    margin: 0 auto;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Header = styled.header`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  margin: 0px 10px;
`;

const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  background-color: white;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const BackBtn = styled.button`
    position: absolute;
    top: 30px;
    left: 0;
    border: 0;
    background-color: transparent;
    color: #fff;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 50px;
    transition: 0.2s;
    &:hover {
    color: ${(props) => props.theme.bgColor};
    background-color: #fff;
}
`

export interface InfoData {
    data: {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        is_new: boolean;
        is_active: boolean;
        type: string;
        description: string;
        message: string;
        open_source: boolean;
        started_at: string;
        development_status: string;
        hardware_wallet: boolean;
        proof_type: string;
        org_structure: string;
        hash_algorithm: string;
        first_data_at: string;
        last_data_at: string;
    }
}

const Coin = () => {
    const { coinId } = useParams(); // * v6 이상은 인터페이스 설정을 하지 않아도 됨
    const navigate = useNavigate() // * v6 이상은 useHistory가 아닌 useNavigate로 이동한다.
    // * coin의 정보를 불러옴
    const { isLoading: infoLoading, data: info } = useQuery<InfoData>(["info", coinId], () => getCoin(coinId))
    // * coin의 가격 등 의 정보를 불러옴
    const { isLoading: tickerLoading, data: ticker } = useQuery<TickerData>(["ticker", coinId], () => getCoinTickers(coinId), { refetchInterval: 5000 })
    const loading = infoLoading && tickerLoading // * 두개의 데이터가 모두 fetching이 되어야 loading이 true로 변환


    const backHistory = () => {
        navigate('/')
    }
    return (
        <Container>
            <Header>
                <BackBtn onClick={backHistory}>&larr;</BackBtn>
                <Title>
                    {loading ? "Loading ..." : info?.data.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading ...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank</span>
                            <span>{info?.data.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>${info?.data.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price</span>
                            <span>${ticker?.data.quotes.USD.price.toFixed(2)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.data.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply</span>
                            <span>{ticker?.data.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply</span>
                            <span>{ticker?.data.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    {/* <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Switch>
                        <Route path={`/:coinId/price`}>
                            <Price coinId={coinId}></Price>
                        </Route>
                        <Route path={`/:coinId/chart`}>
                            <Chart coinId={coinId}></Chart>
                        </Route>
                    </Switch> */}
                </>
            )}
        </Container>
    )
}
export default Coin