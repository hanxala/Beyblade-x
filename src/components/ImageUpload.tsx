'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
    onUploadComplete: (url: string, publicId: string) => void;
    folder?: string;
    currentImage?: string;
    maxSizeMB?: number;
}

export default function ImageUpload({
    onUploadComplete,
    folder = 'beyblade-x',
    currentImage,
    maxSizeMB = 5,
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            return 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.';
        }

        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            return `File size exceeds ${maxSizeMB}MB limit`;
        }

        return null;
    };

    const uploadFile = async (file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setUploading(true);
        setError(null);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => Math.min(prev + 10, 90));
            }, 200);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Upload failed');
            }

            const data = await response.json();
            setPreview(data.data.url);
            onUploadComplete(data.data.url, data.data.publicId);
        } catch (err: any) {
            setError(err.message || 'Failed to upload image');
            setPreview(null);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
            uploadFile(files[0]);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
            uploadFile(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.container}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className={styles.fileInput}
            />

            {preview ? (
                <div className={styles.previewContainer}>
                    <div className={styles.imageWrapper}>
                        <img src={preview} alt="Preview" className={styles.previewImage} />
                        {uploading && (
                            <div className={styles.uploadingOverlay}>
                                <div className={styles.spinner}></div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                <p className={styles.uploadingText}>Uploading... {uploadProgress}%</p>
                            </div>
                        )}
                    </div>
                    {!uploading && (
                        <div className={styles.previewActions}>
                            <button
                                type="button"
                                onClick={handleClick}
                                className={styles.changeButton}
                            >
                                Change Image
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className={styles.removeButton}
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <div className={styles.dropzoneContent}>
                        <div className={styles.uploadIcon}>📸</div>
                        <h3 className={styles.dropzoneTitle}>
                            {isDragging ? 'Drop image here' : 'Upload Image'}
                        </h3>
                        <p className={styles.dropzoneText}>
                            Drag and drop or click to browse
                        </p>
                        <p className={styles.dropzoneHint}>
                            JPEG, PNG, WebP, or GIF • Max {maxSizeMB}MB
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className={styles.error}>
                    <span className={styles.errorIcon}>⚠️</span>
                    {error}
                </div>
            )}
        </div>
    );
}
