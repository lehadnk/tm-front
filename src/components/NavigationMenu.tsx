import {Component} from "react";
import {deleteToken} from "../requests/TokenStorage.ts";
import {CurrentUserResponse} from "../requests/responses/CurrentUserResponse.ts";
import {ApplicationContext} from "./context/ApplicationContext.ts";
import {Link, useLocation} from "react-router-dom";
import BrandMark from "./BrandMark.tsx";

interface NavigationMenuProps {
    user: CurrentUserResponse
    pathname: string
}

function md5(input: string): string {
    function rotateLeft(value: number, shift: number): number {
        return (value << shift) | (value >>> (32 - shift));
    }

    function addUnsigned(x: number, y: number): number {
        const x8 = x & 0x80000000;
        const y8 = y & 0x80000000;
        const x4 = x & 0x40000000;
        const y4 = y & 0x40000000;
        const result = (x & 0x3fffffff) + (y & 0x3fffffff);

        if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8;
        if (x4 | y4) {
            if (result & 0x40000000) return result ^ 0xc0000000 ^ x8 ^ y8;
            return result ^ 0x40000000 ^ x8 ^ y8;
        }

        return result ^ x8 ^ y8;
    }

    function f(x: number, y: number, z: number): number {
        return (x & y) | (~x & z);
    }

    function g(x: number, y: number, z: number): number {
        return (x & z) | (y & ~z);
    }

    function h(x: number, y: number, z: number): number {
        return x ^ y ^ z;
    }

    function i(x: number, y: number, z: number): number {
        return y ^ (x | ~z);
    }

    function ff(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function gg(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function hh(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function ii(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(value: string): number[] {
        const messageLength = value.length;
        const numberOfWordsTemp1 = messageLength + 8;
        const numberOfWordsTemp2 = (numberOfWordsTemp1 - (numberOfWordsTemp1 % 64)) / 64;
        const numberOfWords = (numberOfWordsTemp2 + 1) * 16;
        const wordArray = new Array<number>(numberOfWords - 1);
        let bytePosition = 0;
        let byteCount = 0;

        while (byteCount < messageLength) {
            const wordCount = (byteCount - (byteCount % 4)) / 4;
            bytePosition = (byteCount % 4) * 8;
            wordArray[wordCount] = wordArray[wordCount] | (value.charCodeAt(byteCount) << bytePosition);
            byteCount += 1;
        }

        const wordCount = (byteCount - (byteCount % 4)) / 4;
        bytePosition = (byteCount % 4) * 8;
        wordArray[wordCount] = wordArray[wordCount] | (0x80 << bytePosition);
        wordArray[numberOfWords - 2] = messageLength << 3;
        wordArray[numberOfWords - 1] = messageLength >>> 29;

        return wordArray;
    }

    function wordToHex(value: number): string {
        let output = "";

        for (let count = 0; count <= 3; count += 1) {
            const byte = (value >>> (count * 8)) & 255;
            const temp = `0${byte.toString(16)}`;
            output += temp.slice(-2);
        }

        return output;
    }

    const x = convertToWordArray(unescape(encodeURIComponent(input)));
    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    for (let k = 0; k < x.length; k += 16) {
        const aa = a;
        const bb = b;
        const cc = c;
        const dd = d;

        a = ff(a, b, c, d, x[k + 0], 7, 0xd76aa478);
        d = ff(d, a, b, c, x[k + 1], 12, 0xe8c7b756);
        c = ff(c, d, a, b, x[k + 2], 17, 0x242070db);
        b = ff(b, c, d, a, x[k + 3], 22, 0xc1bdceee);
        a = ff(a, b, c, d, x[k + 4], 7, 0xf57c0faf);
        d = ff(d, a, b, c, x[k + 5], 12, 0x4787c62a);
        c = ff(c, d, a, b, x[k + 6], 17, 0xa8304613);
        b = ff(b, c, d, a, x[k + 7], 22, 0xfd469501);
        a = ff(a, b, c, d, x[k + 8], 7, 0x698098d8);
        d = ff(d, a, b, c, x[k + 9], 12, 0x8b44f7af);
        c = ff(c, d, a, b, x[k + 10], 17, 0xffff5bb1);
        b = ff(b, c, d, a, x[k + 11], 22, 0x895cd7be);
        a = ff(a, b, c, d, x[k + 12], 7, 0x6b901122);
        d = ff(d, a, b, c, x[k + 13], 12, 0xfd987193);
        c = ff(c, d, a, b, x[k + 14], 17, 0xa679438e);
        b = ff(b, c, d, a, x[k + 15], 22, 0x49b40821);

        a = gg(a, b, c, d, x[k + 1], 5, 0xf61e2562);
        d = gg(d, a, b, c, x[k + 6], 9, 0xc040b340);
        c = gg(c, d, a, b, x[k + 11], 14, 0x265e5a51);
        b = gg(b, c, d, a, x[k + 0], 20, 0xe9b6c7aa);
        a = gg(a, b, c, d, x[k + 5], 5, 0xd62f105d);
        d = gg(d, a, b, c, x[k + 10], 9, 0x02441453);
        c = gg(c, d, a, b, x[k + 15], 14, 0xd8a1e681);
        b = gg(b, c, d, a, x[k + 4], 20, 0xe7d3fbc8);
        a = gg(a, b, c, d, x[k + 9], 5, 0x21e1cde6);
        d = gg(d, a, b, c, x[k + 14], 9, 0xc33707d6);
        c = gg(c, d, a, b, x[k + 3], 14, 0xf4d50d87);
        b = gg(b, c, d, a, x[k + 8], 20, 0x455a14ed);
        a = gg(a, b, c, d, x[k + 13], 5, 0xa9e3e905);
        d = gg(d, a, b, c, x[k + 2], 9, 0xfcefa3f8);
        c = gg(c, d, a, b, x[k + 7], 14, 0x676f02d9);
        b = gg(b, c, d, a, x[k + 12], 20, 0x8d2a4c8a);

        a = hh(a, b, c, d, x[k + 5], 4, 0xfffa3942);
        d = hh(d, a, b, c, x[k + 8], 11, 0x8771f681);
        c = hh(c, d, a, b, x[k + 11], 16, 0x6d9d6122);
        b = hh(b, c, d, a, x[k + 14], 23, 0xfde5380c);
        a = hh(a, b, c, d, x[k + 1], 4, 0xa4beea44);
        d = hh(d, a, b, c, x[k + 4], 11, 0x4bdecfa9);
        c = hh(c, d, a, b, x[k + 7], 16, 0xf6bb4b60);
        b = hh(b, c, d, a, x[k + 10], 23, 0xbebfbc70);
        a = hh(a, b, c, d, x[k + 13], 4, 0x289b7ec6);
        d = hh(d, a, b, c, x[k + 0], 11, 0xeaa127fa);
        c = hh(c, d, a, b, x[k + 3], 16, 0xd4ef3085);
        b = hh(b, c, d, a, x[k + 6], 23, 0x04881d05);
        a = hh(a, b, c, d, x[k + 9], 4, 0xd9d4d039);
        d = hh(d, a, b, c, x[k + 12], 11, 0xe6db99e5);
        c = hh(c, d, a, b, x[k + 15], 16, 0x1fa27cf8);
        b = hh(b, c, d, a, x[k + 2], 23, 0xc4ac5665);

        a = ii(a, b, c, d, x[k + 0], 6, 0xf4292244);
        d = ii(d, a, b, c, x[k + 7], 10, 0x432aff97);
        c = ii(c, d, a, b, x[k + 14], 15, 0xab9423a7);
        b = ii(b, c, d, a, x[k + 5], 21, 0xfc93a039);
        a = ii(a, b, c, d, x[k + 12], 6, 0x655b59c3);
        d = ii(d, a, b, c, x[k + 3], 10, 0x8f0ccc92);
        c = ii(c, d, a, b, x[k + 10], 15, 0xffeff47d);
        b = ii(b, c, d, a, x[k + 1], 21, 0x85845dd1);
        a = ii(a, b, c, d, x[k + 8], 6, 0x6fa87e4f);
        d = ii(d, a, b, c, x[k + 15], 10, 0xfe2ce6e0);
        c = ii(c, d, a, b, x[k + 6], 15, 0xa3014314);
        b = ii(b, c, d, a, x[k + 13], 21, 0x4e0811a1);
        a = ii(a, b, c, d, x[k + 4], 6, 0xf7537e82);
        d = ii(d, a, b, c, x[k + 11], 10, 0xbd3af235);
        c = ii(c, d, a, b, x[k + 2], 15, 0x2ad7d2bb);
        b = ii(b, c, d, a, x[k + 9], 21, 0xeb86d391);

        a = addUnsigned(a, aa);
        b = addUnsigned(b, bb);
        c = addUnsigned(c, cc);
        d = addUnsigned(d, dd);
    }

    return `${wordToHex(a)}${wordToHex(b)}${wordToHex(c)}${wordToHex(d)}`;
}

class NavigationMenu extends Component<NavigationMenuProps, any> {
    static contextType = ApplicationContext;

    formatRole(role: string): string {
        if (!role) {
            return "";
        }

        return role.charAt(0).toUpperCase() + role.slice(1);
    }

    getAvatarUrl(email: string): string {
        const normalizedEmail = email.trim().toLowerCase();
        const hash = md5(normalizedEmail);

        return `https://www.gravatar.com/avatar/${hash}?d=mp&s=96`;
    }

    isActivePath(path: string): boolean {
        return this.props.pathname.startsWith(path);
    }

    handleLogout = () => {
        deleteToken();
        window.location.href = '/login';
    };

    componentDidMount() {
        if (this.props.user) {
            document.body.classList.add("with-header");
        } else {
            document.body.classList.remove("with-header");
        }
    }

    componentDidUpdate() {
        if (this.props.user) {
            document.body.classList.add("with-header");
        } else {
            document.body.classList.remove("with-header");
        }
    }

    componentWillUnmount() {
        document.body.classList.remove("with-header");
    }

    render() {
        const user = this.props.user;

        return (
            <nav className="app-top-nav fixed left-0 top-0 z-50 w-full px-3 pb-3 pt-0 sm:px-5">
                <div className="app-top-nav__inner mx-auto max-w-7xl rounded-[26px] border border-white/60 px-4 py-3 shadow-[0_18px_48px_rgba(15,23,42,0.12)]">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <BrandMark size={44} />
                            <div className="hidden sm:block">
                                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Download Manager</div>
                                <div className="text-sm text-slate-500">Fast access to torrents and users</div>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                <Link
                                    to="/torrents"
                                    className={`inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                        this.isActivePath("/torrents")
                                            ? "bg-slate-900 text-white shadow-[0_10px_20px_rgba(15,23,42,0.18)]"
                                            : "bg-white/65 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                >
                                    Torrents
                                </Link>
                                {user && user.role === 'admin' && (
                                    <Link
                                        to="/users"
                                        className={`inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                            this.isActivePath("/users")
                                                ? "bg-slate-900 text-white shadow-[0_10px_20px_rgba(15,23,42,0.18)]"
                                                : "bg-white/65 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                    >
                                        Users
                                    </Link>
                                )}
                            </div>

                            {user && (
                                <div className="flex items-center justify-between gap-3 rounded-[22px] border border-slate-200/80 bg-white/70 px-3 py-2.5 lg:justify-normal">
                                    <img
                                        src={this.getAvatarUrl(user.email)}
                                        alt={user.name}
                                        className="h-11 w-11 rounded-2xl border border-white/80 object-cover shadow-sm"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-semibold text-slate-900">{user.name}</div>
                                        <div className="truncate text-xs text-slate-500">{this.formatRole(user.role)}</div>
                                    </div>
                                    <button
                                        onClick={this.handleLogout}
                                        className="ml-auto inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const NavigationMenuWrapper: React.FC<{ user: CurrentUserResponse }> = ({ user }) => {
    const location = useLocation();

    return <NavigationMenu user={user} pathname={location.pathname} />;
};

export default NavigationMenuWrapper;
