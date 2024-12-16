import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        <LoginForm />
      </div>
    </div>)
  );
}

