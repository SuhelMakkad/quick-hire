import Link from "next/link";

import LoginFrom from "./components/login-form";

const LoginPage = () => {
  return (
    <main className="container">
      <div className="my-4 pb-16 min-h-[80vh] max-w-sm mx-auto flex h-full w-full flex-col justify-center space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-center">Sign In</h1>

        <LoginFrom />

        <div className="text-center">
          <span>Facing trouble in Sign up? </span>
          <Link href="#" className="underline">
            contact support
          </Link>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="#"
            className="whitespace-nowrap underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="whitespace-nowrap underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
