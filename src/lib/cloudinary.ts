import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
}

/**
 * Upload an image to Cloudinary
 * @param file - Base64 encoded file or file path
 * @param folder - Cloudinary folder to upload to
 * @param publicId - Optional custom public ID
 * @returns Upload result with URL and public ID
 */
export async function uploadImage(
    file: string,
    folder: string = 'beyblade-x',
    publicId?: string
): Promise<CloudinaryUploadResult> {
    try {
        const uploadOptions: any = {
            folder,
            resource_type: 'image',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' },
                { width: 1200, height: 1200, crop: 'limit' }
            ],
        };

        if (publicId) {
            uploadOptions.public_id = publicId;
        }

        const result = await cloudinary.uploader.upload(file, uploadOptions);

        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - Cloudinary public ID of the image
 * @returns Deletion result
 */
export async function deleteImage(publicId: string): Promise<{ result: string }> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image from Cloudinary');
    }
}

/**
 * Generate optimized image URL with transformations
 * @param publicId - Cloudinary public ID
 * @param transformations - Optional transformation parameters
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
    publicId: string,
    transformations?: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string;
        format?: string;
    }
): string {
    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    if (!transformations) {
        return `${baseUrl}/q_auto,f_auto/${publicId}`;
    }

    const transforms: string[] = [];

    if (transformations.width) transforms.push(`w_${transformations.width}`);
    if (transformations.height) transforms.push(`h_${transformations.height}`);
    if (transformations.crop) transforms.push(`c_${transformations.crop}`);
    if (transformations.quality) transforms.push(`q_${transformations.quality}`);
    if (transformations.format) transforms.push(`f_${transformations.format}`);

    const transformString = transforms.join(',');
    return `${baseUrl}/${transformString}/${publicId}`;
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null
 */
export function extractPublicId(url: string): string | null {
    try {
        const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
}

export default cloudinary;
