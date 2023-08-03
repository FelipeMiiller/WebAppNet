"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const dashboardLinks = [
  {
    link: "/",
    name: "Início",
  },
  {
    link: "categoria",
    name: "Categoria Cliente",
  },
];

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside
      className={
        "h-screen  min-w-[14rem]    my-0  px-0  bg-opacity-95   bg-[#ffffff] text-zinc-900  "
      }
    >
      <div className={"h-32  border-b ro flex pl-2 flex-col space-y-2 py-2"}>
        <h1 className={"my-auto text-3xl font-bold text-slate-500 "}>
          DashBoard
        </h1>
      </div>

      <div className={"mx-2 mt-6 pl-2 "}>
        <h2 className={" text-lg text-slate-500 font-bold  "}>Geral</h2>

        <ul className={"flex flex-col list-none  mt-2"}>
          {dashboardLinks.map((dash) => {
            const isActive = pathname === dash.link;

            return (
              <li
                key={dash.link}
                className={
                  "items-center px-2 py-1  " +
                  " transition duration-150 ease-in-out " +
                  (isActive
                    ? " hover:text-slate-300"
                    : " text-[#b5861073] hover:text-[#B58710]")
                }
              >
                <Link href={`/${dash.link}`}>{dash.name}</Link>
              </li>
            );
          })}
        </ul>
        <hr className="w-full my-4 " />
      </div>
    </aside>
  );
}
