import { LoginBrandDetails } from "@/components/LoginBrandDetails";
import { LoginBrandHeader } from "@/components/LoginBrandHeader";
import { LoginForm } from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="w-full min-h-dvh overflow-x-hidden bg-amfah-black text-white lg:h-dvh lg:overflow-hidden">
      <div className="mx-auto flex w-full min-h-dvh max-w-[1440px] flex-col lg:h-full lg:flex-row">
        <section className="relative flex w-full min-h-dvh flex-1 flex-col overflow-hidden lg:h-full lg:min-h-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_at_20%_110%,rgba(201,162,39,0.18),transparent_45%),radial-gradient(ellipse_at_70%_120%,rgba(40,90,160,0.25),transparent_50%),linear-gradient(180deg,#050505_0%,#0a0a0a_55%,#121820_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] [background-image:radial-gradient(circle,rgba(255,255,255,0.45)_0.6px,transparent_0.7px)] [background-size:18px_18px] [mask-image:linear-gradient(180deg,transparent,black_20%,black_70%,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[140%] max-w-none -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,200,80,0.2),transparent_60%)] blur-2xl"
          />

          <div className="relative z-10 flex w-full flex-1 flex-col items-center px-6 py-10 sm:px-8 lg:items-stretch lg:px-14 lg:py-14">
            <LoginBrandHeader />

            <div className="mt-8 flex w-full justify-center lg:hidden">
              <LoginForm />
            </div>

            <div className="mt-10 flex w-full flex-1 flex-col items-center lg:mt-8 lg:items-stretch">
              <LoginBrandDetails />
            </div>
          </div>
        </section>

        <section className="relative hidden w-full min-h-dvh flex-1 lg:flex lg:h-full lg:min-h-0 lg:items-center lg:justify-center lg:px-10 lg:py-14">
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
