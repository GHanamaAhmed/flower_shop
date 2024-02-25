import Image from "next/image";
import { Aclonica } from "next/font/google";
import FlowerCard from "@/components/flowerCard";
const AclonicaSans = Aclonica({ subsets: ["latin"], weight: "400" });
export default function Home() {
  return (
    <main>
      <section className="md:grid md:grid-cols-2 place-items-center bg-main-color relative text-white-color px-3 md:px-10 py-3 md:pt-10 md:pb-14">
        <div className="flex flex-col gap-3 md:gap-5">
          <div className={"text-2xl md:text-4xl " + AclonicaSans.className}>
            <p>Happiness</p>
            <p>blooms from</p>
            <p>within</p>
          </div>
          <p className="text-sm md:text-lg">
            Our environment, the world in which we live and work, is a mirror of
            our attitudes and expectations.
          </p>
          <div className="flex gap-2">
            <button className="py-2 px-3 bg-white-color text-main-color cursor-pointer">
              Shop now
            </button>
            <button className="text-white-color flex gap-2 py-2 px-3 items-center cursor-pointer">
              <p>Explore plants</p>
              <Image width={13} height={1} src={"/icons/Arrow.svg"} alt="" />
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            className="-z-10"
            height={600}
            width={300}
            src={"/images/hero-section-picture.png"}
            alt="hero-section-picture"
          />
        </div>
        <Image
          className="absolute top-1/3 right-0 -translate-y-1/2 md:hidden"
          height={400}
          width={200}
          src={"/images/hero-section-picture.png"}
          alt="hero-section-picture"
        />
      </section>
      <section className="grid grid-cols-2 justify-items-stretch md:py-10">
        <div className="flex justify-center items-center">
          <div className="w-[150px] h-[150px] md:w-72 md:h-72 relative">
            <Image fill src={"/images/type-flowers.png"} alt="type-flowrs" />
          </div>
        </div>
        <div className="py-3 px-5 flex flex-col md:gap-5">
          <div className="flex gap-3 items-center">
            <div className="w-6 h-0.5 bg-gray-color"></div>
            <p className="text-base md:text-lg font-semibold text-black-color">
              TYPE
            </p>
          </div>
          <p
            className={
              "text-xl md:text-4xl text-black-color " + AclonicaSans.className
            }
          >
            Wiche flwers do your prfer ?
          </p>
          <p className="text-gray-color text-sm md:text-lg">
            our store provide two type of flower accourding your taste. which
            allow you to choose according badgt
          </p>
        </div>
      </section>
      <section>
        <FlowerCard />
      </section>
    </main>
  );
}
