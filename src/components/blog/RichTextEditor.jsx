"use client";

import { Editor } from "@tinymce/tinymce-react";

function RichTextEditor({ initialValue, onChange, error }) {
  return (
    <div className={`rich-text-editor ${error ? "error" : ""}`}>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={initialValue}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 400,
          menubar: false,
          skin: "oxide-dark",
          content_css: "dark",
          directionality: "ltr",
          forced_root_block: "p",
          keep_styles: true,
          paste_as_text: false,
          entity_encoding: "raw",
          verify_html: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
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
            "imagetools",
            "image",
            "media",
            "imagetools",
            "textpattern",
            "template",
            "visualchars",
            "nonbreaking",
            "emoticons",
            "advlist",
            "autoresize",
            "directionality",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic underline strikethrough | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image media | template | " +
            "help",
          image_advtab: true,
          image_title: true,
          image_caption: true,
          image_uploadtab: true,
          image_class_list: [
            { title: "None", value: "" },
            { title: "Full Width", value: "full-width" },
            { title: "Left Align", value: "left-align" },
            { title: "Right Align", value: "right-align" },
            { title: "Gallery", value: "gallery-image" },
          ],
          image_dimensions: true,
          image_description: true,
          image_upload_url: "/api/upload",
          image_prepend_url: import.meta.env.VITE_API_URL,
          image_list: [],
          image_upload_handler: function (blobInfo, progress) {
            return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.withCredentials = false;
              xhr.open("POST", "/api/upload");

              xhr.upload.onprogress = (e) => {
                progress((e.loaded / e.total) * 100);
              };

              xhr.onload = function () {
                if (xhr.status === 403) {
                  reject({
                    message: "Error 403: Upload forbidden",
                    remove: true,
                  });
                  return;
                }

                if (xhr.status < 200 || xhr.status >= 300) {
                  reject("Error: Image upload failed");
                  return;
                }

                const json = JSON.parse(xhr.responseText);

                if (!json || typeof json.location != "string") {
                  reject("Invalid JSON: " + xhr.responseText);
                  return;
                }

                resolve(json.location);
              };

              xhr.onerror = function () {
                reject("Image upload failed due to a XHR Transport error");
              };

              const formData = new FormData();
              formData.append("file", blobInfo.blob(), blobInfo.filename());

              xhr.send(formData);
            });
          },
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              font-size: 16px;
              color: white;
              background-color: rgba(88, 28, 135, 0.5);
              direction: ltr !important;
              text-align: left !important;
            }
            p { 
              margin: 0; 
              padding: 0; 
              text-align: left !important;
              direction: ltr !important;
            }
            * {
              direction: ltr !important;
            }
          `,
          text_direction: "ltr",
          language_url: "/langs/hu_HU.js",
          language: "hu_HU",
          //   setup: function (editor) {
          //     editor.on("init", function () {
          //       editor.getBody().dir = "ltr";
          //       editor.getBody().style.textAlign = "left";
          //     });
          //   },
          setup: function (editor) {
            editor.on("init", function () {
              editor.execCommand("mceFocus");
            });
          },
        }}
        // onEditorChange={(content) => onChange(content)}
      />
      <style>{`
        .rich-text-editor .tox-tinymce {
          border: 1px solid ${error ? "rgb(239, 68, 68)" : "rgb(147, 51, 234)"};
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .rich-text-editor .tox-toolbar {
          background-color: rgba(88, 28, 135, 0.8) !important;
        }
        .rich-text-editor .tox-toolbar__primary {
          background-color: rgba(88, 28, 135, 0.8) !important;
        }
        .rich-text-editor .tox-edit-area__iframe {
          background-color: rgba(88, 28, 135, 0.5) !important;
          direction: ltr !important;
        }
        .rich-text-editor .tox-edit-area__iframe body {
          direction: ltr !important;
        }
        [dir="rtl"] .rich-text-editor .tox-edit-area__iframe {
          direction: ltr !important;
        }
        
        /* Comprehensive forced colors mode support */
        @media (forced-colors: active) {
          .rich-text-editor .tox-tinymce {
            border-color: CanvasText;
          }
          .rich-text-editor .tox-toolbar,
          .rich-text-editor .tox-toolbar__primary,
          .rich-text-editor .tox-edit-area__iframe {
            background-color: Canvas !important;
            forced-color-adjust: none;
          }
          .rich-text-editor .tox-tbtn {
            border: 1px solid transparent;
          }
          .rich-text-editor .tox-tbtn:hover,
          .rich-text-editor .tox-tbtn:focus {
            border-color: CanvasText;
            background-color: Canvas !important;
          }
          .rich-text-editor .tox-tbtn--enabled {
            border-color: CanvasText;
            background-color: Canvas !important;
          }
          .rich-text-editor .tox-tbtn svg {
            fill: CanvasText !important;
          }
          .rich-text-editor .tox-tbtn--disabled svg {
            fill: GrayText !important;
          }
          /* Override any remaining -ms-high-contrast styles */
          .rich-text-editor *[style*="-ms-high-contrast"] {
            forced-color-adjust: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default RichTextEditor;
