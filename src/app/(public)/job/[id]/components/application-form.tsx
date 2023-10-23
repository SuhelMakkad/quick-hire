"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/ui/toast/use-toast";
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
import { Checkbox } from "@/components/ui/checkbox";

import { routes } from "@/utils/routes";
import { submitProfile } from "@/utils/api";
import { profileSchemaClient, type ProfileSchemaClient } from "@/utils/schema";
import { Loader2 } from "lucide-react";

export type ApplicationFormProps = { jobId: string };

const ApplicationForm = ({ jobId }: ApplicationFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProfileSchemaClient>({
    resolver: zodResolver(profileSchemaClient),
    defaultValues: {
      jobId,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      contactForFutureOpp: false,
    },
  });

  const onSubmit = async (data: ProfileSchemaClient) => {
    if (!formRef.current) return;
    setIsLoading(true);
    const formData = new FormData(formRef.current);
    const res = await submitProfile(formData);
    setIsLoading(false);

    if (res.status === "success") {
      form.reset(data);
      router.push(routes.thankYou);
      return;
    }

    if (res.message) {
      toast({
        title: res.message,
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Oh no! Something is not right",
      variant: "destructive",
    });
  };

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="jobId"
          render={({ field }) => <Input type="hidden" {...field} value={jobId} />}
        />

        <FormItem className="col-span-2">
          <FormLabel>Resume</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="application/pdf"
              {...form.register("resume", { required: true })}
            />
          </FormControl>

          {!!form.getFieldState("resume").error && (
            <FormMessage>{form.getFieldState("resume").error?.message}</FormMessage>
          )}
        </FormItem>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+91 98765 43210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="https://www.linkedin.com/in/john-doe-606a3219b" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/JohnDoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactForFutureOpp"
          render={({ field }) => (
            <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Contact for future opportunities</FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-2" disabled={isLoading}>
          Submit
          {isLoading && <Loader2 className="w-4 ml-2 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default ApplicationForm;
