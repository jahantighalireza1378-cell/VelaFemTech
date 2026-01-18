import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F7F2] py-10">
      <SignIn redirectUrl="/" />
    </div>
  );
}