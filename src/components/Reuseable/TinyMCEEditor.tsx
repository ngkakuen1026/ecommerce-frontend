import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor: React.FC<{
  value: string; 
  onEditorChange: (content: string) => void;
  disabled?: boolean;
}> = ({ value, onEditorChange, disabled = false }) => {
  const handleEditorChange = (content: string) => {
    onEditorChange(content);
  };

  return (
    <Editor
      value={value}
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_css: "//www.tiny.cloud/css/codepen.min.css",
      }}
      onEditorChange={handleEditorChange}
      disabled={disabled}
    />
  );
};

export default TinyMCEEditor;
