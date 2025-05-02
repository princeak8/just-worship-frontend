import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, Loader2, Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png';
import useGallery from './useGallery';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGetEventQuery } from '@/app/api';

export default function AddImage() {

  interface GetEvent {
    data: Event[]
  }
  
  interface Event {
    id: string;
    name: string;
    date: string;
    bookings: string;
    content: string;
    coverPhoto: {
      url: string;
    }
  }

  const { id } = useParams();
  const { data:events, isLoading: isLoadingEvents } = useGetEventQuery<GetEvent[] | any | undefined>(undefined);
  const { formInstance, isLoading10, onSubmit, fetchedImage } = useGallery();
  const { handleSubmit, addItemDetail } = formInstance;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if(fetchedImage){
      setPreviewImage(fetchedImage)
    }
  },[fetchedImage])

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
        <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Link to='/dashboard/cms/gallery' ><ArrowLeftCircle  className='hover:text-[#BA833C]' /></Link>Gallery Page Manager</h1>
          {isLoading10 ?(
            <Button className="flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white">
            <Loader2 className='animate-spin' />
            </Button>
          ):(
            <Button type="submit" className="flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white">
            <Save className="w-4 h-4" />
            {id ? 'Update Item' : 'Save Item'}
            </Button>
          )}
        </div>

        <div className="flex gap-8">
          <div className="w-8/12">
            <Card>
              <CardHeader>
                <CardTitle>
                  {id ? 'Edit Item' : 'New Item'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Image title <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      {...addItemDetail('title')}
                    />
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input
                      id="location"
                      type="text"
                      {...addItemDetail('location')}
                    />
                  </div>

                  <div>
                    <Label>year</Label>
                    <Input
                      id="year"
                      type="text"
                      {...addItemDetail('year')}
                    />
                  </div>

                  <div>
                    <Label>Event</Label>
                    <select id="event" className="w-full border rounded p-2 mt-1 bg-white text-black" {...addItemDetail('event')}>
                      <option value="">Select an event</option>
                      {events?.data?.map((event: Event) => (
                        <option key={event.id} value={event.id}>
                          {event.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-4/12">
            <Card>
              <CardContent className="space-y-4 p-8">
                <div>
                  <Label>Image <span className="text-red-500">*</span></Label>
                  <img
                    src={previewImage || Placeholder}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    {...addItemDetail('image', {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        addItemDetail('image').onChange(e);
                        handleFileChange(e);
                      },
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}
