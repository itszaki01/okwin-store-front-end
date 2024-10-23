export default function IconSearch({ w = 24, h = 24, color = "#292D32" }: { w?: number; h?: number; color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.3332 27.9993C22.3288 27.9993 27.9998 22.3283 27.9998 15.3327C27.9998 8.33708 22.3288 2.66602 15.3332 2.66602C8.33756 2.66602 2.6665 8.33708 2.6665 15.3327C2.6665 22.3283 8.33756 27.9993 15.3332 27.9993Z"
                stroke={color}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M29.3332 29.3327L26.6665 26.666" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}
