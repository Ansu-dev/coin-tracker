import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const isDarkAtom = atom({
    key: 'isDark', // * state의 이름
    default: true, // * state의 값
    effects_UNSTABLE: [persistAtom]
})