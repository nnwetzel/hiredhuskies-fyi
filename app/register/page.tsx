import Link from 'next/link';
import { Form } from 'app/form';
import { redirect } from 'next/navigation';
import { createUser, getUser } from 'app/db';
import { SubmitButton } from 'app/submit-button';

export default function Register() {
  async function register(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const user = await getUser(email);

    if (user.length > 0) {
      return 'User already exists'; // TODO: Display user feedback
    } else {
      await createUser(email, password);
      redirect('/login');
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 px-4 py-16">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-zinc-200 px-6 py-6 text-center">
          <h3 className="text-2xl font-semibold text-black">Sign Up</h3>
          <p className="text-sm text-zinc-600">
            Create an account using your <strong>northeastern.edu email</strong>.
          </p>
        </div>
        <Form action={register}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-zinc-600 pb-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-black underline">
              Sign in
            </Link>{' '}
            instead.
          </p>
        </Form>
      </div>
    </div>
  );
}