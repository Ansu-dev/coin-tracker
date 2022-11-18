import { BrowserRouter, Routes, Route } from "react-router-dom"
import Coins from './components/Coins'
import Coin from './components/Coin'

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/*" element={<Coins />}></Route>
            <Route path="/:coinId" element={<Coin />}></Route>
        </Routes>
    </BrowserRouter>
}

export default Router