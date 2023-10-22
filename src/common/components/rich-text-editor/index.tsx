"use client";

import { useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import type {} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export type RichTextEditorProps = {
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

const RichTextEditor = ({ value, setValue }: RichTextEditorProps) => {
  return (
    <div className="prose prose-sm md:prose-base prose-headings:font-medium md:prose-headings:text-base prose-headings:text-sm prose-strong:font-medium">
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
