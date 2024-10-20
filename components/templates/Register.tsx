"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Infer the type from the schema
type FormData = z.infer<typeof formSchema>;

const Register: React.FC = () => {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, setError, watch, clearErrors } = methods;

  // Redirect if user already logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username: data.username,
        password: data.password,
      });

      const { access_token } = response.data;

      // Simpan token di localStorage
      localStorage.setItem("access_token", access_token);

      // Redirect ke halaman login
      router.push("/");
    } catch (error) {
      setError("username", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    }
  };

  const watchFields = watch(["username", "password", "confirmPassword"]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const validationResult = formSchema.safeParse({
        username: watchFields[0],
        password: watchFields[1],
        confirmPassword: watchFields[2],
      });

      if (validationResult.success) {
        clearErrors();
      } else {
        const errors = validationResult.error.flatten().fieldErrors;

        if (watchFields[0]) {
          if (errors.username) {
            setError("username", {
              type: "manual",
              message: errors.username[0],
            });
          } else {
            clearErrors("username");
          }
        }

        if (watchFields[1]) {
          if (errors.password) {
            setError("password", {
              type: "manual",
              message: errors.password[0],
            });
          } else {
            clearErrors("password");
          }
        }

        if (watchFields[2]) {
          if (errors.confirmPassword) {
            setError("confirmPassword", {
              type: "manual",
              message: errors.confirmPassword[0],
            });
          } else {
            clearErrors("confirmPassword");
          }
        }
      }
    }, 1000); // Set delay time in milliseconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watchFields, methods]);

  return (
    <div className="flex items-center justify-center py-16 bg-gray-100">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

          <FormField
            control={methods.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            Register
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
