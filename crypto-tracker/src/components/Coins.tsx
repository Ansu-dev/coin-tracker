import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { getCoinList } from '../api'
import { isDarkAtom } from '../recoil/atom'
import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5";

// * styled-components 적용
const Container = styled.div`
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CoinList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.textColor};
    width: 70%;
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    a {
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor}
        }
    }
`

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 40px;
    font-weight: bold;
`

const FixedBtn = styled.div`
    height: 60px;
    display: flex;
    padding: 0px 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
`


// * 특정 프로퍼티만 담을 object interface 지정(타입 추론)
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
    const isDark = useRecoilValue(isDarkAtom)
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
                            <Link to={{ pathname: `/${coin.id}` }}>
                                <Image src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coin_symbol" />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    })
                }
            </CoinList>
        }
        <FixedBtn>
            {
                isDark ? <IoMoonSharp width={50} height={50} /> : <IoSunnyOutline />
            }
        </FixedBtn>
    </Container >
}
export default Coins