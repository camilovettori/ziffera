"use client";

import { useActionState } from "react";
import { loginAdminAction, type AdminLoginFormState } from "./actions";

const initialState: AdminLoginFormState = {
  error: "",
};

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(
    loginAdminAction,
    initialState
  );

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-[10px] uppercase tracking-[0.28em] text-slate-500"
        >
          Admin email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          placeholder="admin@ziffera.ie"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-[10px] uppercase tracking-[0.28em] text-slate-500"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          placeholder="Enter password"
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <p
          aria-live="polite"
          className={`text-sm leading-6 ${state.error ? "text-rose-600" : "text-slate-500"}`}
        >
          {state.error || "Protected access for Ziffera Core administrators."}
        </p>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
