/// Original -----------------------------------------------------------------------------------------------------------------------------------------------------------------------


import React, {
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';

if (typeof window !== 'undefined' && !window.Quill) {
  window.Quill = Quill;
}

interface BlogEditorProps {
  title: string;
  content: string;
  excerpt: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onExcerptChange: (excerpt: string) => void;
}

const BlogEditor = forwardRef(({
  title,
  content,
  excerpt,
  onTitleChange,
  onContentChange,
  onExcerptChange,
}: BlogEditorProps, ref) => {
  const quillRef = useRef<ReactQuill>(null);
  const [isReady, setIsReady] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current?.getEditor(),
  }));

  // ✅ Dynamically register the image resize module before rendering editor
  useEffect(() => {
    import('quill-image-resize-module-react').then((module) => {
      const ImageResize = module.default;
      Quill.register('modules/imageResize', ImageResize);
      setIsReady(true); // ✅ Now it's safe to render ReactQuill
    });
  }, []);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          toast.loading('Uploading image...');
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
            initialQuality: 0.8,
          });

          const formData = new FormData();
          formData.append('file', compressedFile);
          formData.append('upload_preset', uploadPreset);
          formData.append('cloud_name', cloudName);

          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
          });

          const result = await res.json();
          if (result.secure_url && quillRef.current) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range?.index ?? 0, 'image', result.secure_url, 'user');
            editor.formatLine(range?.index ?? 0, 1, { align: 'center' });
            toast.dismiss();
            toast.success('Image uploaded!');

          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          toast.dismiss();
          toast.error('Image upload failed.');
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'blockquote',
    'list', 'bullet', 'align',
    'link', 'image',
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white relative shadow-lg rounded-xl p-6 border border-gray-200">
      <div className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Title"
          className="w-full text-[1.25rem] font-bold border-none outline-none text-gray-900 placeholder-gray-400 leading-tight tracking-tight focus:ring-0"
        />
      </div>

      <div className="mb-12">
        <input
          type="text"
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Tell your story..."
          className="w-full text-[1rem] text-gray-600 border-none outline-none placeholder-gray-400 leading-relaxed font-light focus:ring-0"
        />
      </div>

      {isReady && (
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={onContentChange}
          modules={modules}
          formats={formats}
          className="mb-[4rem]"
          placeholder="Write your story..."
          style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: '1.25rem',
            lineHeight: '2',
            letterSpacing: '0.01em',
            minHeight: '400px',
          }}
        />
      )}
    </div>
  );
});

BlogEditor.displayName = 'BlogEditor';
export default BlogEditor;


/// Original -----------------------------------------------------------------------------------------------------------------------------------------------------------------------