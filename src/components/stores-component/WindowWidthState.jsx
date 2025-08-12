import { create } from "zustand";

const useMobileView = create((set)=>({
    mobileView: true,
    setMobileView: (value)=>{
        set({mobileView : value})
    }
}))

export default useMobileView