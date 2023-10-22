"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const coerceNumberError = { invalid_type_error: "Must be a valid number" };

const formSchema = z.object({
  title: z.string().min(2).max(50),
  shortDescription: z.string().min(20),
  description: z.string().min(20),
  minExperience: z.coerce.number(coerceNumberError),
  maxExperience: z.coerce.number(coerceNumberError).min(0).max(30),
  minSalary: z.coerce.number(coerceNumberError).min(0),
  maxSalary: z.coerce.number(coerceNumberError).min(0),
  categories: z.array(z.string()),
  locations: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export type CreateJobFormProps = { jobId: string };
const defaultValues = {
  title: "",
  shortDescription: "",
  description: `<h2>About the Role</h2><h2><strong>What you'll do</strong></h2><h2><strong>What you'll need</strong></h2><p>&nbsp;</p><p>*Accommodations may be available based on religious and/or medical conditions, or as required by applicable law. To request an accommodation, please reach out to <a href="mailto:makadsuhel11@gmail.com">makadsuhel11@gmail.com</a>.</p>`,
  categories: [],
  locations: [],
};

const CreateJobForm = ({ jobId }: CreateJobFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormSchema) => {
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
                <RichTextEditor value={field.value} setValue={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-4 md:ml-auto">
          Create new post
        </Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
