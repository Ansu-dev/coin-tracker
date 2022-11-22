import { atom } from "recoil";


export const isDarkAtom = atom({
    key: 'isDark', // * state의 이름
    default: true, // * state의 값
})