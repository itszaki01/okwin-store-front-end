import { Center, CheckIcon, Fieldset, Group, Image, Loader, Radio, Select, SimpleGrid, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { ReactNode, useMemo, useState } from "react";
import { useStoreSettingsSlice } from "../../../redux/features/storeSettingsSlice/storeSettingsSlice";
import IconProfile from "../../ui/icons/IconProfile";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { IOrderDto } from "../../../@types/Orders/OrderDto";
import {
    useGetAllLocationsQuery,
    useGetAllLocationStopDesksQuery,
    useGetAllLocationSubLocationsQuery,
} from "../../../redux/services/locationsApiService/locationsApiService";
import { ILocationRES } from "../../../@types/Locations/LocationRES";
import IconTrackDelivery from "../../ui/icons/IconTrackDelivery";
import { useOrderFormContext } from "../../../contexts/OrderFormContext";
import { IStorSettingsRES } from "../../../@types/StoreSettings/StoreSettingsRES";

interface IProps {
    children?: ReactNode;
}
export default function OrderForm({ children }: IProps) {
    const { isSmallScreen } = useDevicesContext();
    const {
        shippingPrefix,
        appearance: { themeColor },
        orderFormInputs: formInputs,
        inputsPerRowDesktop,
        inputsPerRowMobile,
        allowLocations,
        stopDeskPrefix,
        syncorniseLocationSettings,
        isSubStore,
        mainStore,
    } = useStoreSettingsSlice();

    ///Syncronise order Form Inputs
    const orderFormInputs = useMemo(() => {
        if (isSubStore && syncorniseLocationSettings) {
            const _mainStore = mainStore as IStorSettingsRES;
            return _mainStore.orderFormInputs;
        } else {
            return formInputs;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //locations queries and data
    const [selectedLocationObj, setSelectedLocationObj] = useState<ILocationRES | undefined>(undefined);
    const { data: locationsData } = useGetAllLocationsQuery({ allowLocations });
    const { data: locationsStopDesksData, isFetching: isGettingsStopDesksData } = useGetAllLocationStopDesksQuery(selectedLocationObj?._id);
    const { data: locationSubLocationsData } = useGetAllLocationSubLocationsQuery(selectedLocationObj?._id);

    const locationsSelectData = useMemo(
        () => locationsData?.data.map((location) => ({ value: location._id, label: location.locationName } || [])),
        [locationsData?.data]
    );

    const locationSubLocationsSelectData = useMemo(
        () => locationSubLocationsData?.data.map((sublocation) => sublocation.subLocationName) || [""],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [locationSubLocationsData?.data, selectedLocationObj]
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filtredInputsData = useMemo(() => orderFormInputs.filter((inputData) => inputData.showInput), []);
    const [isEvenNumber] = useState(!(filtredInputsData.length % 2));

    //form
    const {
        form: {
            register,
            setValue,
            handleSubmit,
            watch,
            formState: { errors },
        },
        formRef,
        onSubmit,
    } = useOrderFormContext();

    function inputsSwitch(inputData: (typeof orderFormInputs)[number], idx: number): ReactNode {
        const { inputValidation } = inputData;
        const countWord = inputData.inputType === "number-input" || inputData.inputType === "phone-number" ? "أرقام" : "حروف";

        const validationObj = {
            required: { value: inputValidation.required, message: `حقل ${inputData.inputLabel} مطلوب` },
            maxLength: inputValidation.allowMaxLength
                ? {
                      value: inputValidation.maxLength,
                      message: `حقل ${inputData.inputLabel} لايجب أن يتعدى ${inputValidation.minLength} ${countWord}`,
                  }
                : undefined,
            minLength: inputValidation.allowMinLength
                ? {
                      value: inputValidation.minLength,
                      message: `حقل ${inputData.inputLabel} لايجب أن يكون أقل من ${inputValidation.minLength} ${countWord}`,
                  }
                : undefined,
        };

        setValue(`shippingDetails.${idx}.fieldName`, inputData.inputLabel);
        setValue(`shippingDetails.${idx}.fieldType`, inputData.inputType);
        setValue(`shippingDetails.${idx}.fieldId`, inputData._id);

        const inputProps = {
            error: errors.shippingDetails?.[idx]?.fieldValue?.message,
            leftSection: inputData.allowLefSectoinIcon ? <Image src={inputData.leftSectionIconUrl} w={28} /> : undefined,
            rightSection: inputData.allowRightSectionIcon ? <Image src={inputData.rightSectionIconUrl} w={28} /> : undefined,
            fw: 600,
            defaultValue: inputData.inputDefualtValue,
            withAsterisk: inputValidation.withAsterisk,
            size: "lg",
            label: inputData.inputLabel,
            placeholder: inputData.inputPlacebolder,
            radius: 12,
            searchable: inputData.searchable,
        };

        switch (inputData.inputType) {
            case "text": {
                return <TextInput key={idx} {...inputProps} {...register(`shippingDetails.${idx}.fieldValue`, validationObj)} />;
            }
            case "textarea": {
                return <Textarea key={idx} {...inputProps} {...register(`shippingDetails.${idx}.fieldValue`, validationObj)} />;
            }
            case "hidden": {
                return <TextInput key={idx} {...inputProps} {...register(`shippingDetails.${idx}.fieldValue`, validationObj)} type="hidden" />;
            }
            case "locations": {
                return allowLocations ? (
                    <Select
                        key={idx}
                        {...inputProps}
                        data={locationsSelectData}
                        value={watch("locationId")}
                        error={errors.locationId?.message}
                        styles={{ dropdown: { border: `1px solid ${themeColor}` } }}
                        onChange={(value) => {
                            setValue("clientCity", "");
                            setValue("stopDeskId", undefined);
                            setValue("shippingType", "للمنزل");
                            setSelectedLocationObj(locationsData?.data.find((location) => location._id === value));
                            setValue(`locationId`, value as string);
                        }}
                        // error={watch("locationId")?.length === 0 ? "الجراء إختيار المنطقة" : ""}
                    />
                ) : (
                    <></>
                );
            }
            case "number-input": {
                return (
                    <TextInput
                        key={idx}
                        {...inputProps}
                        {...register(`shippingDetails.${idx}.fieldValue`, validationObj)}
                        type="number"
                        styles={{ input: { borderColor: themeColor } }}
                    />
                );
            }
            case "client-name": {
                return <TextInput key={idx} {...inputProps} {...register("clientName", validationObj)} error={errors.clientName?.message} />;
            }
            case "phone-number": {
                return (
                    <TextInput
                        key={idx}
                        type="number"
                        {...inputProps}
                        {...register("clientPhoneNumber", validationObj)}
                        error={errors.clientPhoneNumber?.message}
                    />
                );
            }
            case "second-phone-number": {
                return (
                    <TextInput
                        key={idx}
                        type="number"
                        {...inputProps}
                        {...register("clientSecondPhoneNumber", validationObj)}
                        error={errors.clientSecondPhoneNumber?.message}
                    />
                );
            }
            case "client-full-address": {
                return (
                    <TextInput key={idx} {...inputProps} {...register("clientFullAdress", validationObj)} error={errors.clientFullAdress?.message} />
                );
            }
            case "select": {
                return (
                    <Select
                        key={idx}
                        styles={{ dropdown: { border: `1px solid ${themeColor}` } }}
                        {...inputProps}
                        data={inputData.inputDataArry}
                        value={watch(`shippingDetails.${idx}.fieldValue`)}
                        onChange={(value) => setValue(`shippingDetails.${idx}.fieldValue`, value as string)}
                    />
                );
            }
            case "subLocations": {
                return allowLocations ? (
                    <Select
                        {...inputProps}
                        key={`${selectedLocationObj?._id}`}
                        styles={{ dropdown: { border: `1px solid ${themeColor}` } }}
                        data={locationSubLocationsSelectData}
                        error={errors.clientCity?.message}
                        value={watch("clientCity")}
                        onChange={(value) => setValue(`clientCity`, value as string)}
                    />
                ) : (
                    <></>
                );
            }
        }
    }

    return (
        <form id="orderForm" ref={formRef} onSubmit={handleSubmit(onSubmit)} className="order-form">
            <Fieldset radius={12} style={{ border: `3px solid ${themeColor}` }}>
                <Stack>
                    <Group gap={5}>
                        <IconProfile w={24} h={24} color={themeColor} />{" "}
                        <Text fw={700} fz={20} c={themeColor}>
                            معلومات ال{shippingPrefix}
                        </Text>
                    </Group>
                    <SimpleGrid cols={isSmallScreen ? inputsPerRowMobile : inputsPerRowDesktop}>
                        {Array.from({ length: !isEvenNumber ? filtredInputsData.length - 1 : filtredInputsData.length }, (_, idx) =>
                            inputsSwitch(filtredInputsData[idx], idx)
                        )}
                    </SimpleGrid>
                    {!isEvenNumber && inputsSwitch(filtredInputsData[filtredInputsData.length - 1], filtredInputsData.length - 1)}

                    {isGettingsStopDesksData ? (
                        <Center>
                            <Loader color={themeColor} type="dots" />
                        </Center>
                    ) : (
                        locationsStopDesksData?.data &&
                        locationsStopDesksData.data.length > 0 &&
                        watch("shippingType") != "مجاني" && (
                            <>
                                <Stack>
                                    <Group gap={5}>
                                        <IconTrackDelivery w={24} h={24} color={themeColor} />{" "}
                                        <Text fw={700} fz={20} c={themeColor}>
                                            نوع ال{shippingPrefix}
                                        </Text>
                                    </Group>
                                </Stack>
                                <Radio.Group
                                    value={watch("shippingType")}
                                    onChange={(value) => setValue("shippingType", value as IOrderDto["shippingType"])}
                                >
                                    <SimpleGrid cols={2}>
                                        <Fieldset p={8}>
                                            <Radio color={themeColor} icon={CheckIcon} value={"للمنزل"} size="lg" label={"المنزل"} />
                                        </Fieldset>
                                        <Fieldset p={8}>
                                            <Radio color={themeColor} icon={CheckIcon} value={"لنقطة الإستلام"} size="lg" label={stopDeskPrefix} />
                                        </Fieldset>
                                    </SimpleGrid>
                                </Radio.Group>

                                <Radio.Group value={watch("stopDeskId")} onChange={(value) => setValue("stopDeskId", value)}>
                                    <Stack>
                                        <Group gap={5}>
                                            <Text fw={700} fz={20} c={themeColor}>
                                                إختر {stopDeskPrefix}
                                            </Text>
                                        </Group>
                                        {locationsStopDesksData.data.map((stopDesk) => {
                                            return (
                                                <Fieldset key={stopDesk._id} p={8}>
                                                    <Radio
                                                        disabled={watch("shippingType") != "لنقطة الإستلام"}
                                                        color={themeColor}
                                                        icon={CheckIcon}
                                                        value={stopDesk._id}
                                                        size="lg"
                                                        label={stopDesk.stopDeskAddress}
                                                    />
                                                </Fieldset>
                                            );
                                        })}
                                    </Stack>
                                </Radio.Group>
                            </>
                        )
                    )}
                    {children}
                </Stack>
            </Fieldset>
        </form>
    );
}
