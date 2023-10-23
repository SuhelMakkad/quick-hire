"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { profileSchemaClient, type ProfileSchemaClient } from "@/utils/schema";
import { submitProfile } from "@/utils/api";

export type ApplicationFormProps = { jobId: string };

const ApplicationForm = ({ jobId }: ApplicationFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
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

    const formData = new FormData(formRef.current);
    const res = await submitProfile(formData);
    if (res.status === "success") {
      // success toast
      return;
    }

    // res.message
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

        <Button type="submit" className="col-span-2">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ApplicationForm;
