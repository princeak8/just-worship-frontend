import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, Loader2, Save, Users2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png';
import useHome from './useMessages';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function EditMessages() {
  const { id } = useParams();
  const { formInstance, isLoading22, onSubmit, fetchedImage } = useHome();
  const { handleSubmit, addHeroDetail } = formInstance;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(()=>{
    if(fetchedImage){
      setPreviewImage(fetchedImage)
    }
  },[fetchedImage])


  // const handleFileChange = (field: keyof typeof previews) => 
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPreviews(prev => ({ ...prev, [field]: reader.result as string }));
  //       };
  //       reader.readAsDataURL(file);
  //       addHeroDetail(`${field}Photo`).onChange(file);
  //     }
  //   };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className='flex items-center justify-between mb-8'>
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Link to='/dashboard/cms/messages' ><ArrowLeftCircle  className='hover:text-purple-500' /></Link>Message Broadcast</h1>
          {isLoading22 ?(
            <Button className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'>
            <Loader2 className='animate-spin' />
            </Button>
          ):(

            <Button type='submit' className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'>
            <Users2 className="w-4 h-4" />{id ? 'Update' : 'Send'}
            </Button>
          )}
        </div>

        <div className="grid gap-8">
          <Card className='p-4'>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Title <span className='text-red-500'>*</span></Label>
                  <Input
                    {...addHeroDetail('header')}
                    placeholder="Title"
                  />
                </div>
              </div>
            </CardContent>

            <CardContent className="grid gap-8">
              <div className="space-y-4">
                <div>
                  <Label>Message <span className='text-red-500'>*</span></Label>
                  <TextArea
                    {...addHeroDetail('vision')}
                    rows={10}
                    placeholder="message body"
                  />
                  </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}