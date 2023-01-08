export interface PostImageUploadBody {
  fileName: string;
  data: FormData;
  bucketName?: string;
}
