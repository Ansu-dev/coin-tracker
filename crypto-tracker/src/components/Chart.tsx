import React from 'react'
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getCoinHistory } from '../api';
import { isDarkAtom } from '../recoil/atom';
import ApexChart from "react-apexcharts";


interface ChartProps {
    coinId: string | undefined;
}

export interface HistoricalInfo {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}


export const Chart = ({ coinId }: ChartProps) => {
    const [theme,] = useRecoilState(isDarkAtom)
    const { isLoading, data: historical } = useQuery<HistoricalInfo>(["historical", coinId], () => getCoinHistory(coinId))
    console.log(historical)
    return (
        <>
            {/* {
                isLoading ? 'Loading Chart...'
                    : (
                        <ApexChart
                            // type="candlestick"
                            // series={[
                            //     {
                            //         name: "Price",
                            //         data: historical.map((price) => {
                            //             return {
                            //                 x: price.time_close,
                            //                 y: [
                            //                     price.open.toFixed(2),
                            //                     price.high.toFixed(2),
                            //                     price.low.toFixed(2),
                            //                     price.close.toFixed(2),
                            //                 ],
                            //             };
                            //         }),
                            //     },
                            // ]}
                        />
                    )

            } */}
        </>
    )
}