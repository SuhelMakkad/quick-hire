"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { cn } from "@/utils/ui";

export type RichTextEditorProps = {
  className?: string;
  value: string;
  setValue: (val: string) => void;
};

const config: React.ComponentProps<typeof CKEditor>["config"] = {
  heading: {
    options: [
      { model: "heading1", view: "h2", title: "Heading", class: "" },
      { model: "paragraph", title: "Normal", class: "" },
    ],
  },
  toolbar: [
    "Undo",
    "Redo",
    "|",
    "Heading",
    "|",
    "Bold",
    "Italic",
    "|",
    "NumberedList",
    "BulletedList",
    "BlockQuote",
    "|",
    "Link",
    "MediaEmbed",
    "InsertTable",
  ],
};

const RichTextEditor = ({ className, value, setValue }: RichTextEditorProps) => {
  return (
    <div
      className={cn(
        "prose prose-sm md:prose-base prose-headings:font-medium md:prose-headings:text-base dark:prose-invert prose-headings:text-sm prose-strong:font-medium",
        className
      )}
    >
      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={value}
        onChange={(_event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
