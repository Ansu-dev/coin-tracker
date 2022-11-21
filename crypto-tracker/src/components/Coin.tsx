import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'


// interface CoinInterface {
//     "id": string,
//     "name": string,
//     "symbol": string,
//     "rank": number,
//     "is_new": boolean,
//     "is_active": boolean,
//     "type": string,
//     "logo": string,

// }

const Coin = () => {
    const { coinId } = useParams(); //v6 이상은 인터페이스 설정을 하지 않아도 됨
    const [coin, setCoin] = useState({})
    const coinDetail = async () => {
        await axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
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