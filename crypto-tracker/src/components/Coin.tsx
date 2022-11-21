import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { getCoin } from '../api';



const Coin = () => {
    const { coinId } = useParams(); //v6 이상은 인터페이스 설정을 하지 않아도 됨
    const [coin, setCoin] = useState({})
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
    return <h1>Coin : {coinId}</h1>
}
export default Coin