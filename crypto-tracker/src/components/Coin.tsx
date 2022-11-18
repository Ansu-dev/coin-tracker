import { useParams } from 'react-router-dom'


const Coin = () => {
    const { coinId } = useParams(); //v6 이상은 인터페이스 설정을 하지 않아도 됨
    console.log(coinId);
    return <h1>Coin : {coinId}</h1>
}
export default Coin