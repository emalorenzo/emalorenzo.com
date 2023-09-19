import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col p-16">
      <Link href="/forest">
        <article className="hover:outline outline-1 w-fit p-2">
          <h3>Forest</h3>
          <p className="text-sm text-gray-300">Simple R3F scene with a 3D model</p>
        </article>
      </Link>
      <Link href="/sushi">
        <article className="hover:outline outline-1 w-fit p-2">
          <h3>Sushi</h3>
          <p className="text-sm text-gray-300">Simple R3F scene with a 3D model</p>
        </article>
      </Link>
    </main>
  );
}
