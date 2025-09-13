// components/Editor.jsx
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

import "./Editor.css";

const TiptapEditor = ({ onChange, onImagesChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Placeholder.configure({
                placeholder: "Start writing your article...",
            }),
        ],
        content: "",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);

            // extract image URLs
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const imgTags = tempDiv.querySelectorAll("img");
            const imageUrls = Array.from(imgTags).map((img) => img.getAttribute("src"));

            if (onImagesChange) {
                onImagesChange(imageUrls);
            }
        },
    });

    const addImage = () => {
        const url = window.prompt("Enter image URL");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    if (!editor) return null;

    return (
        <div className="editor-wrapper">
            <div className="toolbar">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "active" : ""}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "active" : ""}
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "active" : ""}
                >
                    • List
                </button>
                <button type="button" onClick={addImage}>
                    Add Image
                </button>
            </div>

            <EditorContent editor={editor} className="editor-box" />
        </div>
    );
};

export default TiptapEditor;
