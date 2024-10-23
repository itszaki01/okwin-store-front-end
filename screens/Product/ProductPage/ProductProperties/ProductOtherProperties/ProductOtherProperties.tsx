import { Stack } from "@mantine/core";
import ChildProperty from "./ChildProperty/ChildProperty";
import { useProductDataContext } from "../../../../../contexts/PorudctDataContext";

export default function ProductOtherProperties() {
    const { productData } = useProductDataContext();

    return (
        <Stack>
            {productData.otherProperties?.map((parentProperty,idx) => (
                <ChildProperty key={parentProperty._id} parentPropertyData={parentProperty} idx1={idx} />
            ))}
        </Stack>
    );
}
