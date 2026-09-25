import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../utils/helpers';

const ImageUpload = ({ onImageSelect, currentImage, error }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (currentImage && !preview) {
      setPreview(getImageUrl(currentImage));
    }
  }, [currentImage, preview]);

  const handleFiles = (file) => {
    setLocalError('');
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      setLocalError('Only JPG, JPEG, PNG, and WebP formats are supported.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLocalError('Image size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onImageSelect(file);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    setLocalError('');
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full space-y-2">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20'
            : error || localError
            ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20'
            : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/20 dark:hover:bg-orange-950/10'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="relative w-full aspect-[16/10] max-h-72 rounded-2xl overflow-hidden group border border-slate-200 dark:border-slate-800 shadow-sm">
            <img
              src={preview}
              alt="Recipe Preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
              <span className="text-white text-xs font-bold px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-md transition-colors">
                Change Image
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 transition-colors shadow-sm"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-3 shadow-inner">
              <UploadCloud size={28} />
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Drag & drop recipe cover photo, or <span className="text-orange-500 hover:text-orange-600 underline font-bold">browse</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              JPG, PNG or WebP up to 5MB
            </p>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
              <ImageIcon size={13} className="text-orange-500" />
              <span>Crisp high-resolution photos give recipes the best showcase</span>
            </div>
          </div>
        )}
      </div>

      {(error || localError) && (
        <p className="text-xs font-semibold text-rose-500 pl-1">
          {error || localError}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
