import { BrowserRouter, Routes, Route } from "react-router-dom"
import Coins from './components/Coins'
import Coin from './components/Coin'
import { Chart } from "./components/Chart"
import { Price } from "./components/Price"

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/*" element={<Coins />}></Route>
            <Route path="/:coinId/*" element={<Coin />}></Route>
            {/* <Route path='/:coinId/chart' element={<Chart />}></Route>
            <Route path='/:coinId/price' element={<Price />}></Route> */}
        </Routes>
    </BrowserRouter>
}

export default Router