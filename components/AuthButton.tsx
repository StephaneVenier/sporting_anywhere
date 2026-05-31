"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

const buttonClassName =
  "rounded-full border border-white/30 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(135,198,255,0.18)] backdrop-blur-md transition hover:border-white/65 hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-sm";

type Profile = {
  username: string | null;
};

export function AuthButton() {
  const { isConfigured, isLoading, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!supabase || !user) {
      setUsername(null);
      setIsMenuOpen(false);
      return;
    }

    let isMounted = true;

    supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }

        setUsername((data as Profile | null)?.username || null);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase) {
      setMessage("Supabase n'est pas encore configuré.");
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setPassword("");
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    if (!supabase) {
      return;
    }

    setIsSubmitting(true);
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    setIsSubmitting(false);
  };

  if (user) {
    return (
      <div className="relative">
        <button
          type="button"
          className={buttonClassName}
          disabled={isSubmitting}
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {username ? `Bonjour ${username}` : "Mon compte"}
        </button>

        {isMenuOpen && (
          <div
            className="absolute right-0 top-[calc(100%+12px)] z-[90] grid min-w-48 overflow-hidden rounded-2xl border border-white/18 bg-black/76 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_32px_rgba(77,216,255,0.16)] backdrop-blur-md"
            role="menu"
          >
            <a
              className="px-4 py-3 text-white/78 transition hover:bg-white/10 hover:text-white"
              href="#"
              role="menuitem"
            >
              Profil
            </a>
            <a
              className="px-4 py-3 text-white/78 transition hover:bg-white/10 hover:text-white"
              href="https://actyv-iota.vercel.app"
              rel="noopener noreferrer"
              role="menuitem"
              target="_blank"
            >
              Actyv
            </a>
            <button
              type="button"
              className="px-4 py-3 text-left text-white/78 transition hover:bg-white/10 hover:text-white"
              disabled={isSubmitting}
              onClick={handleSignOut}
              role="menuitem"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        data-auth-provider="supabase"
        className={buttonClassName}
        disabled={isLoading || !isConfigured}
        onClick={() => setIsOpen(true)}
        title={
          isConfigured
            ? "Connexion Supabase"
            : "Variables Supabase manquantes"
        }
      >
        Connexion
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/58 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Connexion Sporting Anywhere"
        >
          <form
            className="grid w-full max-w-sm gap-4 rounded-2xl border border-white/18 bg-black/78 p-6 text-white shadow-[0_0_42px_rgba(77,216,255,0.18)]"
            onSubmit={handleSignIn}
          >
            <div className="grid gap-1">
              <strong className="text-lg uppercase tracking-[0.18em]">
                Connexion
              </strong>
              <span className="text-sm text-white/62">
                Utilise les identifiants Supabase d'Actyv.
              </span>
            </div>

            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-xl border border-white/16 bg-white/10 px-3 py-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-200/70"
                autoComplete="email"
                required
              />
            </label>

            <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Mot de passe
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-xl border border-white/16 bg-white/10 px-3 py-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-200/70"
                autoComplete="current-password"
                required
              />
            </label>

            {message && <p className="m-0 text-sm text-red-200">{message}</p>}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/74 transition hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </button>
              <button type="submit" className={buttonClassName}>
                {isSubmitting ? "..." : "Valider"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
