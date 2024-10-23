
export default function IconPlusCircle({ w = 18, h = 19, color = "#1363DF" }: { w?: number; h?: number; color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9 17C13.125 17 16.5 13.625 16.5 9.5C16.5 5.375 13.125 2 9 2C4.875 2 1.5 5.375 1.5 9.5C1.5 13.625 4.875 17 9 17Z"
                stroke={color}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M6 9.5H12" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 12.5V6.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}
