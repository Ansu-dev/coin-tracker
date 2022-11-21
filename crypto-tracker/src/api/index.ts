import { api } from '../axios'; //api instance 모듈화
import { historyDate } from '../utils/date';


//코인 리스트
export const getCoinList = async () => {
    return await api.get('/coins')
}

//코인 정보
export const getCoin = async (coinId: string | undefined) => {
    return await api.get(`/coin/${coinId}`)
}


//코인 그래프
export const getCoinTickers = async (coinId: string | undefined) => {
    return await api.get(`/tickers/${coinId}`)
}


//코인 히스토리
export const getCoinHistory = async (coinId: string | undefined) => {
    const { startDate, endDate } = historyDate() //데이트 함수 모듈화
    return await api.get(`/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
}