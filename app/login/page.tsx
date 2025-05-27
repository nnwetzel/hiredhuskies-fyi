import Link from 'next/link';
import { Form } from 'app/form';
import { signIn } from 'app/auth';
import { SubmitButton } from 'app/submit-button';

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 px-4 py-16">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-zinc-200 px-6 py-6 text-center">
          <h3 className="text-2xl font-semibold text-black">Sign In</h3>
          <p className="text-sm text-zinc-600">
            You must register first using your <strong>northeastern.edu</strong> email.
          </p>
        </div>
        <Form
          action={async (formData: FormData) => {
            'use server';
            await signIn('credentials', {
              redirectTo: '/protected',
              email: formData.get('email') as string,
              password: formData.get('password') as string,
            });
          }}
        >
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-zinc-600 pb-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-black underline">
              Sign up
            </Link>{' '}
            for free.
          </p>
        </Form>
      </div>
    </div>
  );
}