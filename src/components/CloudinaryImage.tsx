'use client';

import { CldImage } from 'next-cloudinary';

interface CloudinaryImageProps {
    publicId: string;
    alt: string;
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    gravity?: string;
    className?: string;
}

export default function CloudinaryImage({
    publicId,
    alt,
    width = 800,
    height = 600,
    crop = 'fill',
    gravity = 'auto',
    className,
}: CloudinaryImageProps) {
    return (
        <CldImage
            src={publicId}
            alt={alt}
            width={width}
            height={height}
            crop={crop}
            gravity={gravity}
            quality="auto"
            format="auto"
            loading="lazy"
            className={className}
        />
    );
}
