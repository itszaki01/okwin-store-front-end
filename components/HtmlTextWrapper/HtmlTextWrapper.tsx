import { Box } from "@mantine/core";

interface IProps {
    html: string;
}
export default function HtmlTextWrapper({ html }: IProps) {
    return <Box  p={10} className="html-text-wrapper" dangerouslySetInnerHTML={{ __html: html }}></Box>;
}
