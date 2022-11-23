import React from 'react'
import styled from 'styled-components';


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
    return (
        <div>Chart</div>
    )
}