interface BrandMarkProps {
    className?: string;
    iconClassName?: string;
    size?: number;
}

export default function BrandMark({ className = "", iconClassName = "", size = 44 }: BrandMarkProps) {
    return (
        <div
            className={`flex items-center justify-center rounded-2xl border border-sky-100/80 bg-gradient-to-br from-sky-100 via-cyan-50 to-indigo-100 shadow-[0_12px_28px_rgba(96,165,250,0.22)] ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                width={Math.round(size * 0.55)}
                height={Math.round(size * 0.55)}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={iconClassName}
            >
                <path d="M6 7.5C6 6.67 6.67 6 7.5 6H11.4C14.83 6 16.8 8.12 16.8 12C16.8 15.88 14.83 18 11.4 18H7.5C6.67 18 6 17.33 6 16.5V7.5Z" fill="url(#dm-logo-core)" />
                <path d="M11 8.3C12.92 8.3 14.05 9.62 14.05 12C14.05 14.38 12.92 15.7 11 15.7H8.7V8.3H11Z" fill="#F8FAFC" fillOpacity="0.96" />
                <path d="M17.9 7.2L14.85 12L17.9 16.8" stroke="url(#dm-logo-accent)" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18.15" cy="12" r="1.15" fill="#0EA5E9" />
                <defs>
                    <linearGradient id="dm-logo-core" x1="6" y1="6" x2="16.8" y2="18" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1E3A8A" />
                        <stop offset="0.52" stopColor="#2563EB" />
                        <stop offset="1" stopColor="#38BDF8" />
                    </linearGradient>
                    <linearGradient id="dm-logo-accent" x1="14.85" y1="7.2" x2="20.5" y2="8.6" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#22D3EE" />
                        <stop offset="1" stopColor="#6366F1" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
