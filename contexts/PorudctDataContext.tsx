import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IProductRES } from "../@types/Products/ProductRES";
import { useLocation, useParams } from "react-router-dom";
import { useGetProductBySlugMutation } from "../redux/services/productsApiService/productsApiService";
interface IProductDataContext {
    productData: IProductRES;
    setProductData: React.Dispatch<React.SetStateAction<IProductRES>>;
    isGettingProduct: boolean;
}

const ProductDataContext = createContext<IProductDataContext>({} as IProductDataContext);

export default function ProductDataContextProvider({ children }: { children: ReactNode }) {
    const { state: productCachedData } = useLocation() as { state: IProductRES | undefined };
    const [productData, setProductData] = useState(productCachedData as IProductRES);
    const { productSlug } = useParams();
    const [GetProduct, { isLoading: isGettingProduct }] = useGetProductBySlugMutation();

    useEffect(() => setProductData(productCachedData as IProductRES), [productCachedData]);

    useEffect(() => {
        (async () => {
            if (!productData && productSlug && !productCachedData) {
                const product = (await GetProduct(productSlug).unwrap()).data;
                setProductData(product);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productData, productSlug]);

    return <ProductDataContext.Provider value={{ productData, setProductData, isGettingProduct }}>{children}</ProductDataContext.Provider>;
}

export const useProductDataContext = () => useContext(ProductDataContext);
