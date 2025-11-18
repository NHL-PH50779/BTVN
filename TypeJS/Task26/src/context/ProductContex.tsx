const url = "https://dummyjson.com/products";


export type PAction = {
       | { type: "GET_PRODUCTS"; payload: Product };
    
}

export const ProductContextProvider = ({
    children,
}: {
    children: ReactNode
}
)