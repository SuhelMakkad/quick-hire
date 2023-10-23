"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/use-toast";

import { authenticate } from "@/utils/api";
import { routes } from "@/utils/routes";

const formSchema = z.object({
  username: z.string({ required_error: "Please enter your user name" }).trim(),
  password: z.string({ required_error: "Please enter your password" }).trim(),
});

const UserLoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const res = await authenticate(values.username, values.password);
    setIsLoading(false);

    if (res) {
      router.replace(routes.admin);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Wrong credentials.",
        description: "Please verify your user name and password again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your user name" {...field} />
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
                <Input type="password" placeholder="Your account password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-2 w-full" type="submit" disabled={isLoading}>
          Sign in
          {isLoading && <Loader2 className="animate-spin ml-2" width={16} />}
        </Button>
      </form>
    </Form>
  );
};

export default UserLoginForm;
