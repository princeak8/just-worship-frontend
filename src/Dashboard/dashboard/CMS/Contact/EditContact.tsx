import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftCircle, Loader2, Save } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import useContact from './useContact';
import { Button } from '@/components/ui/button';

export default function EditContact() {
  const { id } = useParams();
  const { formInstance, isLoading9, onSubmit } = useContact();
  const { handleSubmit, addContactDetail } = formInstance;

  // if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Link to='/dashboard/cms/contact' ><ArrowLeftCircle  className='hover:text-[#BA833C]' /></Link>Contact Page Manager</h1>
          {isLoading9 ?(
            <Button className="flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white"><Loader2 className='animate-spin' /></Button>
          ):(
            <Button type="submit" className="flex items-center gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white">
            <Save className="w-4 h-4" />
            {id ? 'Update' : 'Save'}
          </Button>
          )}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{id ? 'Edit Contact Info' : 'Create Contact Info'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Address <span className="text-red-500">*</span></Label>
                <Input
                  id="address"
                  {...addContactDetail('address')}
                />
              </div>
              <div>
                <Label>Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  {...addContactDetail('email')}
                />
              </div>
              <div>
                <Label>Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  {...addContactDetail('phoneNumber')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
