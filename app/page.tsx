import { ModeToggle } from "@/components/theme-toggle";
import { getServerSession } from "next-auth";

export default async function Home() {
   const session = await getServerSession()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
         {
            session
            ? <h1 className="text-3xl font-bold">Welcome, {session.user?.email}!</h1>
            : <h1 className="text-3xl font-bold">Welcome to Transparensee!</h1>
         }
         <ModeToggle />
      </main>
    </div>
  );
}
