import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCoin, getCoinTickers } from '../api';
import { TickerData } from './Price';


const Container = styled.div`
    padding: 0px 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    const { coinId } = useParams(); //v6 이상은 인터페이스 설정을 하지 않아도 됨
    // * coin의 정보를 불러옴
    const { isLoading: infoLoading, data: info } = useQuery<InfoData>(["info", coinId], () => getCoin(coinId))
    // * coin의 가격 등 의 정보를 불러옴
    const { isLoading: tickerLoading, data: ticker } = useQuery<TickerData>(["ticker", coinId], () => getCoinTickers(coinId), { refetchInterval: 5000 })
    const loading = infoLoading || tickerLoading
    return <h1>Coin : {info?.data.name}</h1>
}
export default Coin