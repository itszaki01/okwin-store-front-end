export default function IconCart({ w = 45, h = 45, color = "#292D32" }: { w?: number; h?: number; color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.6665 2.66602H4.98651C6.42651 2.66602 7.55984 3.90602 7.43984 5.33268L6.33317 18.6127C6.1465 20.786 7.8665 22.6527 10.0532 22.6527H24.2532C26.1732 22.6527 27.8532 21.0794 27.9998 19.1727L28.7198 9.17269C28.8798 6.95936 27.1998 5.15934 24.9732 5.15934H7.75985"
                stroke={color}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M21.6667 29.3333C22.5871 29.3333 23.3333 28.5871 23.3333 27.6667C23.3333 26.7462 22.5871 26 21.6667 26C20.7462 26 20 26.7462 20 27.6667C20 28.5871 20.7462 29.3333 21.6667 29.3333Z"
                stroke={color}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M11.0002 29.3333C11.9206 29.3333 12.6668 28.5871 12.6668 27.6667C12.6668 26.7462 11.9206 26 11.0002 26C10.0797 26 9.3335 26.7462 9.3335 27.6667C9.3335 28.5871 10.0797 29.3333 11.0002 29.3333Z"
                stroke={color}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M12 10.666H28" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}