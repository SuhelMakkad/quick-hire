"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/app/components/query-client";
import { Loader2, Plus, Trash } from "lucide-react";

import { ToastAction } from "@/components/ui/toast";
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

import { jobSchema, type JobWithId, type JobSchema } from "@/utils/schema";
import { addJobPost } from "@/utils/api";
import { adminRoutes, getJobDetailsRoute } from "@/utils/routes";

export type CreateJobFormProps = { job?: JobWithId | null };

const defaultValues = {
  title: "",
  shortDescription: "",
  description: `<h2>About the Role</h2><h2><strong>What you'll do</strong></h2><h2><strong>What you'll need</strong></h2><p>&nbsp;</p><p>*Accommodations may be available based on religious and/or medical conditions, or as required by applicable law. To request an accommodation, please reach out to <a href="mailto:makadsuhel11@gmail.com">makadsuhel11@gmail.com</a>.</p>`,
  categories: [{ label: "" }],
  locations: [{ label: "" }],
};

const CreateJobForm = ({ job }: CreateJobFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<JobSchema>({
    resolver: zodResolver(jobSchema),
    defaultValues: job || defaultValues,
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    name: "categories",
    control: form.control,
  });

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    name: "locations",
    control: form.control,
  });

  const onSubmit = async (data: JobSchema) => {
    const jobId = job?.id || "new";

    setIsLoading(true);
    const res = await addJobPost(data, jobId);
    setIsLoading(false);

    if (res.status === "success") {
      toast({
        title: jobId === "new" ? "New Job Post Published!" : "Job Post Edited!",
        action: (
          <ToastAction altText="See New Job">
            <Link href={getJobDetailsRoute(res.jobId)} target="_blank">
              Visit Page
            </Link>
          </ToastAction>
        ),
      });

      router.replace(adminRoutes.home);
      return;
    }
    if (res.message) {
      toast({
        title: res.message,
        variant: "destructive",
      });

      return;
    }

    await queryClient.refetchQueries();

    toast({
      title: "Oh no! Something is not right",
      variant: "destructive",
    });
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
                <Input placeholder="75000" type="number" {...field} />
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

        <FormItem className="col-span-4">
          <FormLabel className="flex items-center gap-2">Categories</FormLabel>
          {categoryFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-1">
              <Input
                placeholder="example.com"
                className="grow"
                {...form.register(`categories.${index}.label`)}
              />
              {index === categoryFields.length - 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 w-8 h-8"
                  size="icon"
                  onClick={() => appendCategory({ label: "" })}
                >
                  <Plus className="w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  className="shrink-0 w-8 h-8"
                  size="icon"
                  onClick={() => removeCategory(index)}
                >
                  <Trash className="w-4" />
                </Button>
              )}
            </div>
          ))}
          <FormMessage />
        </FormItem>

        <FormItem className="col-span-4">
          <FormLabel className="flex items-center gap-2">Locations</FormLabel>

          {locationFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-1">
              <Input
                placeholder="New York"
                className="grow"
                {...form.register(`locations.${index}.label`)}
              />
              {index === locationFields.length - 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 w-8 h-8"
                  size="icon"
                  onClick={() => appendLocation({ label: "" })}
                >
                  <Plus className="w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  className="shrink-0 w-8 h-8"
                  size="icon"
                  onClick={() => removeLocation(index)}
                >
                  <Trash className="w-4" />
                </Button>
              )}
            </div>
          ))}
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  className="border border-input"
                  value={field.value}
                  setValue={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className=" sticky bottom-3 md:bottom-4 col-span-4 md:ml-auto mb-4"
        >
          Create new post
          {isLoading && <Loader2 className="animate-spin w-4 ml-2" />}
        </Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
