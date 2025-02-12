import { HomeProps } from "../../Interface/Homepage";
import Header from "./Layout/Header";
import HomeAnimation from "./HomepageAnimation";

export default function Home({ count }: HomeProps) {
    return (
        <div className="h-screen bg-black dark:bg-black text-white w-full py-4 px-6 cursor-default">
            <Header count={count}/>
            <HomeAnimation/>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold">Start now</button>
                <button className="px-4 py-2 bg-white text-black">Community</button>
            </div>
        </div>
    );
}