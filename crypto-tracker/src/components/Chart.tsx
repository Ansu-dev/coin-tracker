import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
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
    const { isLoading, data } = useQuery<HistoricalInfo[]>(["historical", coinId], () => getCoinHistory(coinId))
    return (
        <>

            {
                isLoading ? 'Loading Chart...'
                    : (
                        <ApexChart
                            type="candlestick"
                            // series={[
                            //     {
                            //         data: [
                            //             data?.map((price) => {
                            //                 return [
                            //                     price.close,
                            //                     price.high,
                            //                     price.low,
                            //                     price.volume,
                            //                     price.market_cap,

                            //                 ]
                            //             })
                            //             // [1669247999000, 16213.325601201548, 16622.518350660925, 16189.024238673566, 16605.78857280581],
                            //             // [1669276020000, 16600.552227829707, 16753.44421886162, 16563.40955736888, 16708.92483547077],
                            //         ]
                            //     },
                            // ]}
                            options={{
                                theme: {
                                    mode: theme ? "dark" : "light",
                                },
                                chart: {
                                    height: 300,
                                    width: 500,
                                    toolbar: {
                                        show: false,
                                    },
                                    background: "transparent",
                                },
                                grid: { show: false },
                                yaxis: { show: false },
                                xaxis: {
                                    axisBorder: { show: false },
                                    labels: {
                                        show: true,
                                    },
                                    axisTicks: {
                                        show: false,
                                    },
                                    categories: data?.map((price) => price.open),
                                    type: "datetime",
                                },
                            }}
                        />
                    )

            }
        </>
    )
}