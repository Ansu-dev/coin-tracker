import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getCoinTickers } from '../api';
import { TiArrowDown, TiArrowUp } from "react-icons/ti";
import { useParams } from 'react-router-dom';



const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const CurrentPrice = styled.h2`
    margin-top: 40px;
    font-size: 80px;
    display: flex;
    justify-content: center;
`
const PricePercent = styled.span<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    margin-top: 40px;
    font-size: 40px;
    color: ${(props) => (props.isActive ? "#F08080" : "#0F33E7")};
`

const Para = styled.p`
  margin-top: 40px;
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
`;

interface PriceProps {
    coinId: string | undefined;
}

export interface TickerData {
    data: {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        circulating_supply: number;
        total_supply: number;
        max_supply: number;
        beta_value: number;
        first_data_at: string;
        last_updated: string;
        quotes: {
            USD: {
                ath_date: string;
                ath_price: number;
                market_cap: number;
                market_cap_change_24h: number;
                percent_change_1h: number;
                percent_change_1y: number;
                percent_change_6h: number;
                percent_change_7d: number;
                percent_change_12h: number;
                percent_change_15m: number;
                percent_change_24h: number;
                percent_change_30d: number;
                percent_change_30m: number;
                percent_from_price_ath: number;
                price: number;
                volume_24h: number;
                volume_24h_change_24h: number;
            };
        };
    }
}


export const Price = ({ coinId }: PriceProps) => {
    const { isLoading, data: price } = useQuery<TickerData>(["tickers", coinId], () => getCoinTickers(coinId), { refetchInterval: 5000 })
    const isActive = price === undefined ? true : price?.data.quotes.USD.percent_change_24h > 0 // * 0보다 클때
    return (
        <>
            {
                isLoading ? ("Loading Chart...") : (
                    <>
                        <Container>
                            <Para>Compare to yesterday... </Para>
                            <PricePercent isActive={isActive}>
                                {price === undefined ? null : Math.abs(price?.data.quotes.USD.percent_change_24h)}
                                %
                                {isActive ? (<TiArrowUp style={{ fontSize: 37 }}></TiArrowUp>) : (<TiArrowDown style={{ fontSize: 37 }}></TiArrowDown>)}
                            </PricePercent>
                        </Container>
                        <CurrentPrice>${price?.data.quotes.USD.price.toFixed(2)}</CurrentPrice>
                    </>
                )
            }
        </>
    )
}