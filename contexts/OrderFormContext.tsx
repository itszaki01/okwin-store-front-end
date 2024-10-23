import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { useFieldArray, UseFieldArrayReturn, useForm, UseFormReturn } from "react-hook-form";
import { IOrderDto } from "../@types/Orders/OrderDto";
import { useCreateOrderMutation } from "../redux/services/orderApiService/orderApiService";
import { uuidv4 } from "../utils/uuidv4";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/app/hooks";
import { setCheckoutDetialsData, setOrderDtoDetails } from "../redux/features/checkoutDetialsSlice/checkoutDetialsSlice";
import { useStoreSettingsSlice } from "../redux/features/storeSettingsSlice/storeSettingsSlice";
import TagManager from "react-gtm-module";

interface IOrderFormContext {
    form: UseFormReturn<IOrderDto, unknown, undefined>;
    onSubmit: (data: IOrderDto) => void;
    set_error: React.Dispatch<React.SetStateAction<string | undefined>>;
    ordredProductsFormFieldArray: UseFieldArrayReturn<IOrderDto, "orderedProducts", "id">;
    isCreatingOrder: boolean;
    error: string | undefined;
    extraValidator: () => Promise<void>;
    formRef: React.RefObject<HTMLFormElement>;
}

const OrderFormContext = createContext<IOrderFormContext>({} as IOrderFormContext);

export default function OrderFormContextProvider({ children }: { children: ReactNode }) {
    const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
    const [error, set_error] = useState<string | undefined>(undefined);
    const { orderFormInputs, currencyCode, countryPhoneCode } = useStoreSettingsSlice();
    const formRef = useRef<HTMLFormElement>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm<IOrderDto>({
        defaultValues: {
            shippingType: "للمنزل",
            cartUID: uuidv4(),
        },
    });

    const { control, clearErrors, setError, getValues, trigger } = form;
    const ordredProductsFormFieldArray = useFieldArray({ control, name: "orderedProducts" });

    //for Validating Selects & Number Inputs
    async function extraValidator() {
        const isFormValid = await trigger();
        if (!isFormValid) {
            throw new Error("الرجاء التححق من جميع المدخلات");
        }

        getValues().shippingDetails.map((field, idx) => {
            const inputData = orderFormInputs.find((input) => input._id === field.fieldId);
            if (field.fieldType === "select" && inputData?.inputValidation.required) {
                if (field.fieldValue === "" || field.fieldValue === undefined) {
                    setError(`shippingDetails.${idx}.fieldValue`, { message: "هذا الحقل مطلوب" });
                    throw new Error("الرجاء التححق من جميع المدخلات");
                } else {
                    clearErrors(`shippingDetails.${idx}.fieldValue`);
                }
            }

            if (field.fieldType === "locations" && inputData?.inputValidation.required) {
                if (getValues().locationId === "" || getValues().locationId === undefined) {
                    setError(`locationId`, { message: "هذا الحقل مطلوب" });
                    throw new Error("الرجاء التححق من جميع المدخلات");
                } else {
                    clearErrors("locationId");
                }
            }

            if (field.fieldType === "subLocations" && inputData?.inputValidation.required) {
                if (getValues().clientCity === "" || getValues().clientCity === undefined) {
                    setError("clientCity", { message: "هذا الحقل مطلوب" });
                    throw new Error("الرجاء التححق من جميع المدخلات");
                } else {
                    clearErrors("clientCity");
                }
            }
        });
    }

    const onSubmit = async (data: IOrderDto) => {
        try {
            const orderData = await createOrder(data).unwrap();
            dispatch(setCheckoutDetialsData(orderData));
            dispatch(setOrderDtoDetails(data));
            set_error(undefined);
            scrollTo(0, 0);
            navigate("/thankyou");

            let phoneNumber: string = "";
            if (orderData.data.clientPhoneNumber && orderData.data.clientPhoneNumber.startsWith("0")) {
                phoneNumber = orderData.data.clientPhoneNumber.slice(1, orderData.data.clientPhoneNumber.length);
            } else if (orderData.data.clientPhoneNumber) {
                phoneNumber = orderData.data.clientPhoneNumber;
            }

            //Send Purchase Event GTM
            TagManager.dataLayer({ dataLayer: { event: "OkwinPurchaseEvent", ...orderData.data } });

            //SEND FB-FIXEL PURSCHASE EVENT
            //@ts-expect-error null
            window.fbq(
                "track",
                "Purchase",
                {
                    value: orderData.data.totalCartPrice,
                    currency: currencyCode,
                    content_name: "Cart Order",
                    content_type: "product_group",
                    contents: orderData.data.orderedProducts.map((ordredProduct) => ({
                        id: ordredProduct.productId._id,
                        quantity: ordredProduct.quentity,
                    })),
                    content_ids: orderData.data.orderedProducts.map((ordredProduct) => ordredProduct.productId._id),
                    delivery_category: orderData.data.shippingType === "لنقطة الإستلام" ? "curbside" : "home_delivery",
                },
                {
                    eventID: `${
                        orderData.data.orderedProducts[0].productId._id
                    }${countryPhoneCode}${phoneNumber}${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`,
                }
            );

            //TIKTOK-PIXEL PURSCHASE TRACK
            //@ts-expect-error null
            ttq.identify({
                phone_number: `+${countryPhoneCode}${phoneNumber}`,
                external_id: `${orderData.data.orderedProducts[0].productId._id}${countryPhoneCode}${phoneNumber}`,
            });
            //@ts-expect-error null
            window.ttq.track(
                "PlaceAnOrder",
                {
                    value: orderData.data.totalCartPrice,
                    currency: currencyCode,
                    contents: data.orderedProducts.map((ordredProduct) => ({
                        id: ordredProduct.productObj._id,
                        content_category: ordredProduct.productObj.category?.name || "",
                        price: ordredProduct.productObj.price,
                        quantity: ordredProduct.quentity || 1,
                    })),
                    content_ids: orderData.data.orderedProducts.map((ordredProduct) => ordredProduct.productId._id),
                    content_type: "product",
                },
                {
                    event_id: `${orderData.data.orderedProducts[0].productId._id}
                    ${countryPhoneCode}${phoneNumber}${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`,
                }
            );
        } catch (error) {
            const _error = error as Error & { data: { message: string } };
            set_error(_error.data.message);
        }
    };
    return (
        <OrderFormContext.Provider
            value={{ form, formRef, onSubmit, error, set_error, extraValidator, isCreatingOrder, ordredProductsFormFieldArray }}
        >
            {children}
        </OrderFormContext.Provider>
    );
}

export const useOrderFormContext = () => useContext(OrderFormContext);
