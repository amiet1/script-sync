import SignUpPage from "./signUp/page";
import Login from "./login/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center ombre ">
      <div className="flex w-full">
        <div className="flex-1 text-center">
          <h1 className="text-8xl font-bold text-black">Script Sync</h1>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <div className="bg-black text-white p-4 rounded-md">
            <Link href="/signUp" className="block">Get Synced!</Link>
          </div>
          <div className="bg-black text-white p-4 rounded-md">
            <Link href="/login" className="block">Login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

  
  /*
  


*/
