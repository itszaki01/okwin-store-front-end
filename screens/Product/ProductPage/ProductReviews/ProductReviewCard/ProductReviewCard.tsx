import { Avatar, Fieldset, Group, Image, Rating, Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import { IProductRES } from "../../../../../@types/Products/ProductRES";
import { useDevicesContext } from "../../../../../contexts/DevicesContext";
import ManImg from '../../../../../assets/man.svg'
import WomanImg from '../../../../../assets/woman.svg'
interface IProps {
    reviewData: NonNullable<IProductRES["reviews"]>[number];
}
export default function ProductReviewCard({ reviewData }: IProps) {
    const { isMobile, isXsMobile } = useDevicesContext();

    const sizes = useMemo(() => {
        return {
            ratingSize: isXsMobile ? "xs" :isMobile?'sm': "md",
            avatarSize: isXsMobile ? "md" : "lg",
            rateNameFontSize: isXsMobile ? 14 :isMobile? 14: 16,
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile, isXsMobile]);

    const profileImage = useMemo(()=>{
        if(reviewData.allowRaterProfileImage && reviewData.imageUrl){
            return reviewData.imageUrl
        }else if(reviewData.gender === 'male'){
            return ManImg
        }else if(reviewData.gender === 'female'){
            return WomanImg
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Fieldset p={0} radius={12}>
            <Stack>
                <Stack p={10}>
                    <Group>
                        <Avatar style={{border:`1px solid gray`}} src={profileImage} size={sizes.avatarSize} />
                        <Stack gap={5}>
                            <Text fw={700} fz={sizes.rateNameFontSize}>
                                {reviewData.raterName}
                            </Text>
                            <Group gap={5}>
                                <Rating size={sizes.ratingSize} value={reviewData.rating} readOnly />
                            </Group>
                        </Stack>
                    </Group>
                    <Text fz={16} fw={600}>
                        {reviewData.review}
                    </Text>
                </Stack>
                <Image  loading='lazy' style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }} src={reviewData.imageUrl} />
            </Stack>
        </Fieldset>
    );
}
