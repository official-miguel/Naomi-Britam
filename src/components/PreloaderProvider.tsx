"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { done: boolean; setDone: (v: boolean) => void };
const PreloaderCtx = createContext<Ctx>({ done: true, setDone: () => {} });

/** Lets the hero and navbar wait for the preloader, then animate in as it leaves. */
export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  return <PreloaderCtx.Provider value={{ done, setDone }}>{children}</PreloaderCtx.Provider>;
}

export const usePreloader = () => useContext(PreloaderCtx);
