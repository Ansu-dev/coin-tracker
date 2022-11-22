import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCoin } from '../api';




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


interface InfoData {
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

interface PriceData {
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

const Coin = () => {
    const { coinId } = useParams(); //v6 이상은 인터페이스 설정을 하지 않아도 됨
    const [coin, setCoin] = useState<InfoData>()
    const coinDetail = () => {
        getCoin(coinId)
            .then(res => {
                setCoin(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        coinDetail()
    }, [])
    return <h1>Coin : {coin?.name}</h1>
}
export default Coin