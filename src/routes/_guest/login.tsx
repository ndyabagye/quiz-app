import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/auth';
import { toast } from 'sonner';

// form validation schema
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Route = createFileRoute('/_guest/login')({
  component: LoginPage,
})

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();


  // create form 
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  }

  // set up login mutation
  const loginMutation = useMutation({
    mutationKey:['loginMutation'],
    mutationFn: async (data: LoginFormValues) => {
      const response = await auth.login(data);
      console.log(response)
    },
    onSuccess: () => {
      toast.success("Welcome")
      // redirect to login page after succeessful login
      navigate({ to: '/home' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Sign up failed. Please try again.')
    }
  });

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your username' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Enter your password' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className='w-full'
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-2'>
        <div className="text-sm text-center">
          Don't have an account? <Link to="/signup" className='text-blue-600 hover:underline'>Sign Up</Link>
        </div>
      </CardFooter>
    </Card>
  )
}
