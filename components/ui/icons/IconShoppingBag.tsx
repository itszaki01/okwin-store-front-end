export default function IconShoppingBag({ w = 24, h = 24, color = "#1363DF" }: { w?: number; h?: number; color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.96 9.46039C19.29 8.72039 18.28 8.29039 16.88 8.14039V7.38039C16.88 6.01039 16.3 4.69039 15.28 3.77039C14.25 2.83039 12.91 2.39039 11.52 2.52039C9.12999 2.75039 7.11999 5.06039 7.11999 7.56039V8.14039C5.71999 8.29039 4.70999 8.72039 4.03999 9.46039C3.06999 10.5404 3.09999 11.9804 3.20999 12.9804L3.90999 18.5504C4.11999 20.5004 4.90999 22.5004 9.20999 22.5004H14.79C19.09 22.5004 19.88 20.5004 20.09 18.5604L20.79 12.9704C20.9 11.9804 20.93 10.5404 19.96 9.46039ZM11.66 3.91039C12.66 3.82039 13.61 4.13039 14.35 4.80039C15.08 5.46039 15.49 6.40039 15.49 7.38039V8.08039H8.50999V7.56039C8.50999 5.78039 9.97999 4.07039 11.66 3.91039ZM12 19.0804C9.90999 19.0804 8.20999 17.3804 8.20999 15.2904C8.20999 13.2004 9.90999 11.5004 12 11.5004C14.09 11.5004 15.79 13.2004 15.79 15.2904C15.79 17.3804 14.09 19.0804 12 19.0804Z"
                fill={color}
            />
            <path
                d="M11.43 17.14C11.24 17.14 11.05 17.07 10.9 16.92L9.91 15.93C9.62 15.64 9.62 15.16 9.91 14.87C10.2 14.58 10.68 14.58 10.97 14.87L11.45 15.35L13.05 13.87C13.35 13.59 13.83 13.61 14.11 13.91C14.39 14.21 14.37 14.69 14.07 14.97L11.94 16.94C11.79 17.07 11.61 17.14 11.43 17.14Z"
                fill={color}
            />
        </svg>
    );
}