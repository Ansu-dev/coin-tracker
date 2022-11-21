import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getCoinList } from '../api'


// * styled-components 적용
const Container = styled.div`
    padding: 0px 20px;
`
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CoinList = styled.ul``

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    a {
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor}
        }
    }
`

const Title = styled.h1`
    color: ${props => props.theme.accentColor}
`

//특정 프로퍼티만 담을 object interface 지정(타입 추론)
interface CoinsInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

const Coins = () => {
    const [coins, setCoins] = useState<CoinsInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    //코인 리스트 호출
    const coinListApi = () => {
        getCoinList()
            .then(res => {
                setCoins(res.data.splice(0, 49))
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }
    useEffect(() => {
        coinListApi()
    }, [])
    return <Container>
        <Header>
            <Title>Coins</Title>
        </Header>
        {
            loading ? 'Loading...' : <CoinList>
                {
                    coins?.map(coin => {
                        return <Coin key={coin.id}>
                            <Link to={`/${coin.id}}`}>{coin.name} &rarr;</Link>
                        </Coin>
                    })
                }
            </CoinList>
        }
    </Container>
}
export default Coins