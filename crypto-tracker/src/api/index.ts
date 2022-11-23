import { api } from '../axios'; //api instance 모듈화
import { HistoricalInfo } from '../components/Chart';
import { InfoData } from '../components/Coin';
import { TickerData } from '../components/Price';
import { historyDate } from '../utils/date';




//코인 리스트
export const getCoinList = async () => {
    return await api.get('/coins')
}

//코인 정보
export const getCoin = async (coinId: string | undefined) : Promise<InfoData> => {
    return await api.get(`/coins/${coinId}`)
}


//코인 그래프
export const getCoinTickers = async (coinId: string | undefined) : Promise<TickerData> => {
    return await api.get(`/tickers/${coinId}`)
}


//코인 히스토리
export const getCoinHistory = async (coinId: string | undefined) : Promise<HistoricalInfo> => {
    const { startDate, endDate } = historyDate() //데이트 함수 모듈화
    return await api.get(`/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
}