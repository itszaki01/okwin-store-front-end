
export default function IconMinesCircle({ w = 18, h = 19, color = "#292D32" }: { w?: number; h?: number; color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.93994 17C13.0649 17 16.4399 13.625 16.4399 9.5C16.4399 5.375 13.0649 2 8.93994 2C4.81494 2 1.43994 5.375 1.43994 9.5C1.43994 13.625 4.81494 17 8.93994 17Z"
                stroke={color}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M5.93994 9.5H11.9399" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}
