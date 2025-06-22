import React, { useState, useRef } from 'react';
import { Button } from '../../TSX-src/components/ui/button';
import { Bold, Italic, Link, Image, Plus, Quote, List, ListOrdered, Minus } from 'lucide-react';

interface MediumStyleEditorProps {
  title: string;
  content: string;
  excerpt: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onExcerptChange: (excerpt: string) => void;
  onImageUpload: (file: File) => void;
}

const MediumStyleEditor: React.FC<MediumStyleEditorProps> = ({
  title,
  content,
  excerpt,
  onTitleChange,
  onContentChange,
  onExcerptChange,
  onImageUpload
}) => {
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [showSideToolbar, setShowSideToolbar] = useState(false);
  const [sideToolbarTop, setSideToolbarTop] = useState(0);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [currentLine, setCurrentLine] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const detectActiveFormats = () => {
    if (!contentRef.current) return;

    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    const formats: string[] = [];
    if (selectedText.match(/\*\*[^\*]+\*\*/)) formats.push('bold');
    if (selectedText.match(/\*[^\*]+\*/)) formats.push('italic');
    if (selectedText.match(/\[.*\]\(url\)/)) formats.push('link');
    if (selectedText.match(/^> /m)) formats.push('quote');
    if (selectedText.match(/^(-|\*|\+) /m)) formats.push('list');
    if (selectedText.match(/^\d+\. /m)) formats.push('ordered-list');
    if (content.substring(0, start).match(/^(# )[^#]/m)) formats.push('h1');
    if (content.substring(0, start).match(/^(## )[^#]/m)) formats.push('h2');
    if (content.substring(0, start).match(/^(### )[^#]/m)) formats.push('h3');

    setActiveFormats(formats);
  };

  const formatText = (format: string) => {
    if (!contentRef.current) return;
    
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let prefix = '';
    let suffix = '';
    
    switch (format) {
      case 'bold':
        prefix = '**';
        suffix = '**';
        break;
      case 'italic':
        prefix = '*';
        suffix = '*';
        break;
      case 'h1':
        prefix = '# ';
        break;
      case 'h2':
        prefix = '## ';
        break;
      case 'h3':
        prefix = '### ';
        break;
      case 'quote':
        prefix = '> ';
        break;
      case 'link':
        prefix = '[';
        suffix = '](url)';
        break;
      case 'list':
        prefix = '- ';
        break;
      case 'ordered-list':
        prefix = '1. ';
        break;
      default:
        formattedText = selectedText;
    }

    if (prefix || suffix) {
      formattedText = prefix + selectedText + suffix;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    onContentChange(newContent);
    
    // Update active formats
    detectActiveFormats();
    
    // Hide floating toolbar after formatting
    setShowFloatingToolbar(false);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + prefix.length;
      textarea.setSelectionRange(newPosition, newPosition + selectedText.length);
    }, 0);
  };

  const insertElement = (element: string) => {
    if (!contentRef.current) return;
    
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    
    let elementText = '';
    switch (element) {
      case 'image':
        elementText = '\n![Image description](image-url)\n';
        break;
      case 'divider':
        elementText = '\n---\n';
        break;
      case 'paragraph':
        elementText = '\n\n';
        break;
      default:
        elementText = element;
    }

    const newContent = content.substring(0, start) + elementText + content.substring(start);
    onContentChange(newContent);
    
    // Focus back and position cursor
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + elementText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleTextSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    const hasSelection = textarea.selectionStart !== textarea.selectionEnd;
    
    if (hasSelection) {
      // Calculate position for floating toolbar
      const rect = textarea.getBoundingClientRect();
      const lines = textarea.value.substring(0, textarea.selectionStart).split('\n');
      const lineHeight = 24; // Approximate line height
      const currentLineIndex = lines.length - 1;
      
      setToolbarPosition({
        top: rect.top + (currentLineIndex * lineHeight) - 50,
        left: rect.left + (lines[currentLineIndex].length * 8) // Approximate character width
      });
      setShowFloatingToolbar(true);
      detectActiveFormats();
    } else {
      setShowFloatingToolbar(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!contentRef.current) return;
    
    const textarea = contentRef.current;
    const rect = textarea.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const lineHeight = 32;
    const lineNumber = Math.floor(y / lineHeight);
    
    // Show side toolbar when hovering near the left edge
    if (e.clientX - rect.left < 60) {
      setShowSideToolbar(true);
      setSideToolbarTop(rect.top + (lineNumber * lineHeight));
      setCurrentLine(lineNumber);
    } else {
      setShowSideToolbar(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white relative shadow-lg rounded-xl p-6 border border-gray-200">
      {/* Floating Selection Toolbar */}
      {showFloatingToolbar && (
        <div 
          className="fixed bg-gray-800 text-white px-4 py-2 rounded-full shadow-xl z-50 flex gap-2 border border-gray-700"
          style={{ 
            top: `${toolbarPosition.top}px`, 
            left: `${toolbarPosition.left}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <Button
            size="sm"
            variant="ghost"
            onClick={() => formatText('bold')}
            className={`text-white hover:bg-gray-700 h-8 w-8 p-0 ${activeFormats.includes('bold') ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => formatText('italic')}
            className={`text-white hover:bg-gray-700 h-8 w-8 p-0 ${activeFormats.includes('italic') ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => formatText('link')}
            className={`text-white hover:bg-gray-700 h-8 w-8 p-0 ${activeFormats.includes('link') ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
            title="Link"
          >
            <Link className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => formatText('quote')}
            className={`text-white hover:bg-gray-700 h-8 w-8 p-0 ${activeFormats.includes('quote') ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Side Plus Toolbar */}
      {showSideToolbar && (
        <div 
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg z-40 p-2"
          style={{ 
            top: `${sideToolbarTop}px`, 
            left: '-80px'
          }}
        >
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0 hover:bg-green-100"
              onClick={() => document.getElementById('image-upload')?.click()}
              title="Add Image"
            >
              <Image className="w-4 h-4 text-green-600" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0 hover:bg-blue-100"
              onClick={() => insertElement('divider')}
              title="Add Divider"
            >
              <Minus className="w-4 h-4 text-blue-600" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0 hover:bg-purple-100"
              onClick={() => formatText('list')}
              title="Bullet List"
            >
              <List className="w-4 h-4 text-purple-600" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="w-8 h-8 p-0 hover:bg-orange-100"
              onClick={() => formatText('ordered-list')}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4 text-orange-600" />
            </Button>
          </div>
        </div>
      )}

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Title Input */}
      <div className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Title"
          className="w-full text-5xl font-bold border-none outline-none text-gray-900 placeholder-gray-400 leading-tight tracking-tight focus:ring-0"
          style={{ 
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontWeight: '700'
          }}
        />
      </div>

      {/* Subtitle/Excerpt */}
      <div className="mb-12">
        <input
          type="text"
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Tell your story..."
          className="w-full text-2xl text-gray-600 border-none outline-none placeholder-gray-400 leading-relaxed font-light focus:ring-0"
          style={{ 
            fontFamily: '"Georgia", "Times New Roman", serif'
          }}
        />
      </div>

      {/* Main Content Editor */}
      <div className="relative" onMouseLeave={() => setShowSideToolbar(false)}>
        <textarea
          ref={contentRef}
          id="content-editor"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          onSelect={handleTextSelection}
          onMouseMove={handleMouseMove}
          placeholder="Write your story..."
          className="w-full min-h-[400px] text-xl leading-relaxed border border-gray-200 rounded-lg p-4 outline-none resize-none text-gray-800 placeholder-gray-400 font-light tracking-wide focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          style={{ 
            fontFamily: '"Georgia", "Times New Roman", serif',
            lineHeight: '2',
            letterSpacing: '0.01em'
          }}
        />
      </div>

      {/* Enhanced Format Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-6 mt-12">
        <div className="flex flex-wrap items-center gap-3 pb-4">
          <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
            <span className="text-sm text-gray-500 font-medium">Headings</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('h1')}
              className={`text-sm font-semibold hover:bg-gray-50 ${activeFormats.includes('h1') ? 'bg-orange-100 text-orange-600' : ''}`}
            >
              H1
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('h2')}
              className={`text-sm font-semibold hover:bg-gray-50 ${activeFormats.includes('h2') ? 'bg-orange-100 text-orange-600' : ''}`}
            >
              H2
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('h3')}
              className={`text-sm font-semibold hover:bg-gray-50 ${activeFormats.includes('h3') ? 'bg-orange-100 text-orange-600' : ''}`}
            >
              H3
            </Button>
          </div>
          
          <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
            <span className="text-sm text-gray-500 font-medium">Format</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('bold')}
              className={`hover:bg-gray-50 ${activeFormats.includes('bold') ? 'bg-orange-100 text-orange-600' : ''}`}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('italic')}
              className={`hover:bg-gray-50 ${activeFormats.includes('italic') ? 'bg-orange-100 text-orange-600' : ''}`}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('quote')}
              className={`hover:bg-gray-50 ${activeFormats.includes('quote') ? 'bg-orange-100 text-orange-600' : ''}`}
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">Lists</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('list')}
              className={`hover:bg-gray-50 ${activeFormats.includes('list') ? 'bg-orange-100 text-orange-600' : ''}`}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('ordered-list')}
              className={`hover:bg-gray-50 ${activeFormats.includes('ordered-list') ? 'bg-orange-100 text-orange-600' : ''}`}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumStyleEditor;