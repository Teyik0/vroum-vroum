import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 6 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log('file url', file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
