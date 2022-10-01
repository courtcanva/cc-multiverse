import Link from "next/link";
import { Button, ButtonVariant, Icon } from "@cc/ui-tailwind";
import NoFound from "@src/assets/icons/404.svg";

const SPRING_BOOT_URL = "https://spring.io/projects/spring-boot";

export default function Web() {
  const onGetStarted = () => {
    console.log("Get Started 🥳");
  };

  return (
    <main className="flex flex-col justify-center items-center gap-12 min-h-screen">
      <Icon variant="not-found" />

      <NoFound fill="blue" />

      <section className="flex flex-col justify-center items-center gap-4">
        <h1 className="pb-[56px] text-center text-6xl">
          Master Java in 7 days
          <br />
          <span className="text-green-600">for Beginner!</span>
        </h1>

        <p className="text-gray-500">
          Master Java Coding! This course requires no previous programming or Java experience
        </p>

        <section className="relative mt-10 pt-10">
          <div className="flex flex-row gap-4 ">
            <div className="absolute -left-40 -top-0 -rotate-12">
              <span>Starting at $0.01/month</span>
            </div>

            <Button onClick={onGetStarted} variant={ButtonVariant.Primary}>
              Get Started 🥳
            </Button>
          </div>
        </section>

        <Link href={SPRING_BOOT_URL} passHref>
          <a target="_blank" className="text-blue-500">
            Learn more
          </a>
        </Link>
      </section>
    </main>
  );
}
