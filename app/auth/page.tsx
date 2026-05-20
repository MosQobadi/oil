"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth-context";

function getSafeRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

export default function AuthPage() {
  const router = useRouter();
  const { user, isLoading, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") return "/";
    return getSafeRedirect(new URLSearchParams(window.location.search).get("redirect"));
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [isLoading, redirectTo, router, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await register({ name, email, password });
      } else {
        await login({ email, password });
      }

      router.replace(redirectTo);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Authentication failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="px-4 pb-20 pt-28">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="space-y-5">
            <Link
              href="/cart"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Back to cart
            </Link>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Secure checkout
              </p>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Create your account in a minute.
              </h1>
              <p className="max-w-xl text-muted-foreground">
                Register once to finalize orders, save your contact details, and
                keep admin tools hidden from regular customers.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 grid grid-cols-2 rounded-lg bg-secondary p-1">
              <Button
                type="button"
                variant={mode === "register" ? "default" : "ghost"}
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
              >
                Register
              </Button>
              <Button
                type="button"
                variant={mode === "login" ? "default" : "ghost"}
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
              >
                Login
              </Button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full"
              >
                {isSubmitting
                  ? "Please wait..."
                  : mode === "register"
                    ? "Create account"
                    : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
