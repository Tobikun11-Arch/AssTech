import Image from "next/image";

export default function Home() {
    return (
      <main className="h-screen w-full p-4 cursor-default">
        <header>
          {/**AssTech Logo */}
          <div className="flex items-center">
            <div className="relative h-10 w-10">
              <Image
                fill
                loading="lazy"
                src={'/ass-tech-logo.png'}
                alt="ass-tech-logo"
              />
            </div>
            <h4 className="font-semibold">AssTech</h4>
          </div>

          {/**Github contribution */}
          <div className="flex items-center">
            <div className="relative h-10 w-10">
              <Image
                fill
                loading="lazy"
                src={'/github-logo.png'}
                alt="github-logo"
              />
            </div>
            <h4 className="font-semibold">Stars</h4>
          </div>
        </header>
      </main>
    );
}
