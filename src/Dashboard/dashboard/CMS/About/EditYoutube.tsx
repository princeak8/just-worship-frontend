import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, Loader2, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGetYoutubeQuery, useUpdateYoutubeMutation } from '@/app/api';

interface ApiResponse {
  statusCode: number;
  data: any;
}

interface FormValues {
  title: string;
  videoUrl: string;
}

export default function EditYoutube() {
  const { data: response, isLoading: fetching, isError } = useGetYoutubeQuery<ApiResponse | any>(undefined);
  const [updateYoutube, { isLoading: updating }] = useUpdateYoutubeMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: '', videoUrl: '' },
  });

  useEffect(() => {
    if (response?.data) {
      const { title, videoUrl } = response.data;
      reset({ title, videoUrl });
    }
  }, [response, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        url: formData.videoUrl,
      };
      await updateYoutube(payload).unwrap();
    } catch (err: any) {
      if (err?.status === 422) {
        console.error('Validation Error:', err?.data);
      } else {
        console.error('Update failed', err);
      }
    }
  };

  const watchedUrl = watch('videoUrl');
  const embedUrl = watchedUrl
    ? watchedUrl.includes('youtu.be/')
      ? watchedUrl.replace('youtu.be/', 'www.youtube.com/embed/')
      : watchedUrl.includes('watch?v=')
      ? watchedUrl.replace('watch?v=', 'embed/')
      : ''
    : '';

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <p className="text-red-600">Failed to load YouTube data.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Link to="/dashboard/cms/about">
              <ArrowLeftCircle className="hover:text-[#BA833C]" />
            </Link>
            Edit YouTube Link
          </h1>
          <Button
            type="submit"
            className="flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white"
            disabled={updating}
          >
            {updating ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>YouTube Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Video title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="videoUrl">
                  YouTube Video URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="videoUrl"
                  {...register('videoUrl', {
                    required: 'Video URL is required',
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/,
                      message: 'Enter a valid YouTube link',
                    },
                  })}
                  placeholder="https://youtu.be/..."
                />
                {errors.videoUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>
                )}
              </div>

              {embedUrl && (
                <>
                  <p className="text-xl font-semibold">Preview:</p>
                  <div className="w-full h-64 bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title="YouTube Preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
