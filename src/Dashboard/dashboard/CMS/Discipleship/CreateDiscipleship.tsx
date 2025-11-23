import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, Loader2, Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '@/public/photo1.png'
import useDiscipleship from '../Discipleship/useDiscipleship';
import { TextArea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCountriesQuery } from '@/app/api';
import type { Country } from '@/Types';

export default function CreateDiscipleship() {

  interface GetCountry {
    data: Country[]
  }

  const { id } = useParams()
  const { formInstance, isLoading101, online, setOnline, onSubmit, fetchedPhoto } = useDiscipleship()
  const { data:countries, isLoading: isLoadingCountries } = useCountriesQuery<GetCountry[] | any | undefined>(undefined);
  const { handleSubmit, addDiscipleshipDetail } = formInstance;

  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  

  useEffect(() => {
    if (fetchedPhoto) {
      setPreviewPhoto(fetchedPhoto)
    }
  }, [fetchedPhoto])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Link to='/dashboard/cms/events' ><ArrowLeftCircle className='hover:text-[#BA833C]' /></Link>Discipleship Page Manager</h1>
          {isLoading101 ? (
            <Button className='flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white'><Loader2 className='animate-spin' /></Button>
          ) : (
            <Button type='submit' className='flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white'><Save className="w-4 h-4" />{id ? 'Update Discipleship' : 'Save Discipleship'}</Button>
          )}
        </div>

        <div className="flex gap-8">
          <div className='w-8/12'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  {id ? 'Edit Discipleship' : 'Create New Discipleship Class'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Title <span className='text-red-500'>*</span></Label>
                    <Input
                      id="name"
                      required
                      {...addDiscipleshipDetail('name')}
                    />
                  </div>

                  <div>
                    <Label>Month <span className='text-red-500'>*</span></Label>
                    <Input
                      type='number'
                      id="month"
                      required
                      {...addDiscipleshipDetail('month')}
                    />
                  </div>
                  <div>
                    <Label>Year <span className='text-red-500'>*</span></Label>
                    <Input
                      type='number'
                      id="year"
                      required
                      {...addDiscipleshipDetail('year')}
                    />
                  </div>

                  <div>
                    <Label>Registration Deadline</Label>
                    <Input
                      type='date'
                      id="date"
                      {...addDiscipleshipDetail('deadline')}
                    />
                  </div>

                  <div>
                    <Label>Country</Label>
                    <select id="countryId" className="w-full border rounded p-2 mt-1 bg-white text-black" 
                      defaultValue={id ? undefined : 156}
                      {...addDiscipleshipDetail('countryId')}
                    >
                      <option value="">Select Country</option>
                      {countries?.data?.map((country: Country) => (
                        <option key={country.id} value={country.id.toString()}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Venue</Label>
                    <Input
                      id="venue"
                      {...addDiscipleshipDetail('venue')}
                    />
                  </div>
                 
                  <div className='flex gap-2 items-center'>
                      <p>Online?:</p>
                    <label className="switch">
                      <input type="checkbox" checked={online} onClick={() => setOnline(!online)} />
                        <span className="slider round"></span> 
                    </label>
                  </div>

                  {online && <div>
                    <Label>Link</Label>
                    <TextArea id="link" rows={3} {...addDiscipleshipDetail('link')} />
                  </div>}

                  {/* <div className="flex gap-2">
                    <Button onClick={handleSaveSlide}>
                      <Save className="w-4 h-4 mr-2" />
                      {isEditing ? 'Update Slide' : 'Save Slide'}
                    </Button>
                    {isEditing && (
                      <Button variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div> */}

                </div>
              </CardContent>
            </Card>
          </div>
          <div className='w-4/12'>
            <Card>
              <CardHeader>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Photo <span className='text-red-500'>*</span></Label>
                  <img
                    src={previewPhoto || Placeholder}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                  <Input
                    id="Photo"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    {...addDiscipleshipDetail('photo', {
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        addDiscipleshipDetail('photo');
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