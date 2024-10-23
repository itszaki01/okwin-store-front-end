
export default function IconMenu({ w = 32, h = 32, color = "#292D32" }: { w?: number; h?: number; color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7H21" stroke={color} stroke-width="1.5" stroke-linecap="round" />
            <path d="M3 12H21" stroke={color} stroke-width="1.5" stroke-linecap="round" />
            <path d="M3 17H21" stroke={color} stroke-width="1.5" stroke-linecap="round" />
        </svg>
    );
}
