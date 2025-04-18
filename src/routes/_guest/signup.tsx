import { useNavigate, createFileRoute } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/auth';
import { toast } from 'sonner';

const signUpSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export const Route = createFileRoute('/_guest/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  // create form
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: SignUpFormValues) => {
    signUpMutation.mutate(data);
  };

  // sign up mutation
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      // Remove confirmPassword as it's not needed in the API
      const { confirmPassword, ...userData } = data;

      const response = await auth.register(userData);
      console.log(response)
      // return response.data;
    },
    onSuccess: () => {
      toast.success("Sign Up successful!")
      // redirect to login page after succeessful signup
      navigate({ to: '/home' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Sign up failed. Please try again.')
    },
  })

 

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Fill in your details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </CardFooter>
    </Card>
  )
}
