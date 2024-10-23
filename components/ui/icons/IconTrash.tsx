
export default function IconTrash({ w = 28, h = 28, color = "#1363DF" }: { w?: number; h?: number; color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.138 21H7.858C6.811 21 5.941 20.192 5.863 19.147L4.966 7H19L18.133 19.142C18.058 20.189 17.187 21 16.138 21V21Z"
                stroke={color}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M12 11V17" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 7H20" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M17 7L15.987 4.298C15.694 3.517 14.948 3 14.114 3H9.886C9.052 3 8.306 3.517 8.013 4.298L7 7"
                stroke={color}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M15.43 11L15 17" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.57 11L9 17" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}
