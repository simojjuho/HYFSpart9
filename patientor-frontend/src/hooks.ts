import { useEffect, useState } from "react"
import axios, { AxiosRequestConfig } from "axios"

export const useSingleResource = <Type>(id: string | undefined, config: AxiosRequestConfig): [Type | undefined, React.Dispatch<React.SetStateAction<Type | undefined>>
] => {
    const [resource, setResource] = useState<Type>()
    
    useEffect(() => {
        if(id) {
            axios(config).then(({data}) => {
                setResource(data);
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }, [id])

    return [ resource, setResource ];
}

export const useResource = <Type>(config: AxiosRequestConfig): [Type | undefined, React.Dispatch<React.SetStateAction<Type | undefined>>
] => {
    const [resource, setResource ] = useState<Type>();

    useEffect(() => {
        axios(config).then(({data})=>{
            setResource(data);
        }).catch((error)=>{
            console.log(error.message)
        })
    }, [])

    return [ resource, setResource];
} 