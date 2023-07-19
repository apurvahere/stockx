import Link from "next/link";
import { NextPageWithLayout } from "../_app";

const News: NextPageWithLayout = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-primary">
      <span className="relative">
        <h1 className="text-8xl lg:text-9xl font-extrabold text-blue-500 tracking-widest">
          News
        </h1>
        <h2 className="bg-secondaryYellow px-2 text-sm text-white bg-blue-300 opacity-95 rounded rotate-12 absolute top-1/2 left-1/4">
          We will add asap
        </h2>
      </span>
      <button className="mt-5">
        <Link
          className="relative block px-8 py-3 bg-blue-500 rounded-md text-white border border-current"
          href="/"
        >
          Go Home
        </Link>
      </button>
    </main>
  );
};

export default News;
