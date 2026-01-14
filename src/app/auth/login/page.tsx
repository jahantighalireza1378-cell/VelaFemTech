import LoginForm from '@/components/auth/LoginForm';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-vela-marble p-4">
      <div className="absolute top-0 left-0 p-8"><h1 className="text-2xl font-serif text-vela-navy font-bold">VELA</h1></div>
      <LoginForm />
    </div>
  );
}