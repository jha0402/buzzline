'use client';

import { BsSlack } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RxGithubLogo } from 'react-icons/rx';
import { SiKakao } from 'react-icons/si';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Provider } from '@supabase/supabase-js';
import { createClient } from '@/supabase/supabaseClient';
import { registerWithEmail } from '@/actions/register-with-email';

const AuthPage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const supabase = createClient();

  const formSchema = z.object({
    email: z.string().email().min(5, { message: 'Email must be 5 characters' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);
    const response = await registerWithEmail(values);
    const { data, error } = JSON.parse(response);
    setIsAuthenticating(false);
  }

  async function socialAuth(provider: Provider) {
    setIsAuthenticating(true);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsAuthenticating(false);
  }

  return (
    <div className='grid min-h-screen place-content-center bg-white p-5 text-center'>
      <div className='max-w-[450px]'>
        <div className='mb-4 flex items-center justify-center gap-3'>
          <BsSlack size={30} />
          <Typography text='Buzzline' variant='h2' />
        </div>
        <Typography text='Sign in to your Buzzline' variant='h2' className='mb-3' />
        <Typography
          text='We suggest using the email address that you use at work'
          variant='p'
          className='mb-7 opacity-90'
        />
        <div className='flex flex-col space-y-4'>
          <Button
            disabled={isAuthenticating}
            variant='outline'
            className='flex space-x-3 border-2 py-6'
            onClick={() => socialAuth('google')}
          >
            <FcGoogle size={30} />
            <Typography text='Sign in with Google' variant='p' className='text-xl' />
          </Button>
          <Button
            disabled={isAuthenticating}
            variant='outline'
            className='flex space-x-3 border-2 py-6'
            onClick={() => socialAuth('github')}
          >
            <RxGithubLogo size={30} />
            <Typography text='Sign in with Github' variant='p' className='text-xl' />
          </Button>
          <Button
            disabled={isAuthenticating}
            variant='outline'
            className='flex space-x-3 border-2 py-6'
            onClick={() => socialAuth('kakao')}
          >
            <SiKakao size={30} />
            <Typography text='Sign in with Kakao' variant='p' className='text-xl' />
          </Button>
        </div>

        <div>
          <div className='my-6 flex items-center'>
            <div className='mr-[10px] flex-1 border-t bg-neutral-300' />
            <Typography text='OR' variant='p' />
            <div className='ml-[10px] flex-1 border-t bg-neutral-300' />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isAuthenticating}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='email@work-email.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant='secondary'
                type='submit'
                className='my-5 w-full bg-primary-dark text-white hover:bg-primary-dark/90'
              >
                <Typography text='Sign in with email' variant='p' />
              </Button>

              <div className='rounded-sm bg-gray-100 px-5 py-4'>
                <div className='flex items-center space-x-3 text-gray-500'>
                  <MdOutlineAutoAwesome />
                  <Typography
                    text='We will email you a link for a password-free sign-in'
                    variant='p'
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
