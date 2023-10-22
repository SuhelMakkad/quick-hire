"use client";

import { useState } from "react";
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
import RichTextEditor from "@/components/rich-text-editor";
import { useToast } from "@/components/ui/toast/use-toast";

import { jobSchema, type JobSchema } from "@/utils/schema";
import { addJobPost } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { getJobDetailsRoute } from "@/utils/routes";

export type CreateJobFormProps = { jobId: string };

const defaultValues = {
  title: "",
  shortDescription: "",
  description: `<h2>About the Role</h2><h2><strong>What you'll do</strong></h2><h2><strong>What you'll need</strong></h2><p>&nbsp;</p><p>*Accommodations may be available based on religious and/or medical conditions, or as required by applicable law. To request an accommodation, please reach out to <a href="mailto:makadsuhel11@gmail.com">makadsuhel11@gmail.com</a>.</p>`,
  categories: [],
  locations: [],
};

const CreateJobForm = ({ jobId }: CreateJobFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<JobSchema>({
    resolver: zodResolver(jobSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: JobSchema) => {
    setIsLoading(true);
    const res = await addJobPost(data);
    setIsLoading(false);
    if (res.status === "success") {
      toast({
        title: "New Job Post Published!",
        action: (
          <ToastAction altText="See New Job">
            <Link href={getJobDetailsRoute(res.jobId)} target="_blank">
              Visit Page
            </Link>
          </ToastAction>
        ),
      });
      return;
    }

    // tost error return
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-4 gap-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="md:col-span-2 col-span-4">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer Frontend" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem className="md:col-span-2 col-span-4">
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="CAE - Frontend Engineer - Product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minSalary"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Min Salary</FormLabel>
              <FormControl>
                <Input placeholder="750000" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxSalary"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Max Salary</FormLabel>
              <FormControl>
                <Input placeholder="100000" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minExperience"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Min Experience in years</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxExperience"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Max Experience in years</FormLabel>
              <FormControl>
                <Input placeholder="2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  className="max-h-96 overflow-auto border border-input"
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="col-span-4 md:ml-auto">
          Create new post
          {isLoading && <Loader2 className="animate-spin w-4 ml-2" />}
        </Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
