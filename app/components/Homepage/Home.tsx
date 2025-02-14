import { HomeProps } from "../../Interface/Homepage";
import Header from "./Layout/Header";
import HomeAnimation from "./HomepageAnimation";
import Link from "next/link";

export default function Home({ count }: HomeProps) {
    return (
        <div className="h-screen bg-black dark:bg-black text-white w-full py-4 px-6 cursor-default">
            <Header count={count}/>
            <HomeAnimation/>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col sm:flex-row gap-2">
                <Link href={'/Ass/Tech'}>
                    <button className="w-36 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition">
                    Start now</button>
                </Link>
                <button className="w-36 py-2 bg-black text-yellow-500 font-semibold rounded-md border border-yellow-500 hover:bg-yellow-600 hover:text-black transition">
                Community
                </button>
            </div>
        </div>
    );
}