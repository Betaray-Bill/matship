import { createContext, useState } from "react";

const UploadContext = createContext();

export const UploadProvider = ({children}) =>{
    const title = {
        0:"Base material info",
        1:"Datasets",
        2:"Create"
    }

    const [page, setPage] = useState(0)
    const [data, setData] = useState({

    })

    return (
        <UploadContext.Provider value={{title, page, setData, data, setPage}}>
            {children}
        </UploadContext.Provider>
    )
}

export default UploadContext;