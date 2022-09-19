import Link from "next/link";
import { Button, ButtonVariant, Icon } from "@cc/ui-tailwind";

const NEVER_GONNA_GIVE_YOU_UP = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default function Web() {
  const onGetStarted = () => {
    window.location.assign(NEVER_GONNA_GIVE_YOU_UP);
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onTroll = () => {};

  return (
    <main className="flex flex-col justify-center items-center gap-12 min-h-screen">
      <Icon variant="not-found" />

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

            <Link href={NEVER_GONNA_GIVE_YOU_UP}>
              <Button onClick={onTroll} variant={ButtonVariant.Secondary}>
                Or Not 🥲
              </Button>
            </Link>
          </div>
        </section>

        <Link href={NEVER_GONNA_GIVE_YOU_UP} passHref>
          <a target="_blank" className="text-blue-500">
            Learn more
          </a>
        </Link>
      </section>
    </main>
  );
}
