import MyLoader from "../../components/common/MyLoader/MyLoader";
import ProductPage from "./ProductPage/ProductPage";
import { useProductDataContext } from "../../contexts/PorudctDataContext";

export default function Product() {
    const { productData, isGettingProduct } = useProductDataContext();
    return <>{isGettingProduct || !productData ? <MyLoader /> : <ProductPage />}</>;
}
