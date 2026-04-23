import React from "react";
import useAuthStore from "@/Store/Store";
import { THEMES } from "@/_lib/THEMES";
const Themes = () => {
  const { seTheme } = useAuthStore();
  return (
    <>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-xl font-bold ">Themes</h1>
        <div className="flex flex-wrap h-[100px] w-full md:w-[900px] items-center justify-center gap-2 p-4 ">
          {THEMES.map((theme) => (
            <button
              key={theme}
              className="px-4 py-2 text-base btn btn-primary flex-1"
              onClick={() => seTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Themes;
