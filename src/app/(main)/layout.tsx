import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default async function Layout({children} : {children: React.ReactNode;}) {
    const session = await validateRequest();

    if (!session.user) redirect("/login");

    return ( 
    <SessionProvider value={session}>
            <div className="flex min-h-screen flex-col">
            <Navbar />
               <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
                {children}</div>
            <Footer /> 
            </div>
     </SessionProvider>
    )
}