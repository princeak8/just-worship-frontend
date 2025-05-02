import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetContactQuery } from '@/app/api';

interface ContactData {
  id: string | null;
  address: string | null;
  email: string | null;
  phoneNumber: string | null;
}


export default function ContactCMS() {
  const { data, isLoading } = useGetContactQuery<ContactData | any | undefined>(undefined);
  const [contactData, setContactData] = useState<ContactData | any>({});

  useEffect(() => {
    
      setContactData(data?.data || []);
    
  }, [data]);

  if (isLoading) return <div className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-[#BA833C] animate-spin' /></div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Contact Page Manager</h1>
          <Link 
            to={'/dashboard/cms/contact/edit'} 
            className="flex gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Contact Info
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-4">
            <div className="border w-full rounded-lg p-4 bg-white">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-xl">Address</h3>
                <p className="text-sm text-gray-600">
                  {contactData.address || 'No address provided.'}
                </p>
              </div>
            </div>
            <div className="border w-full rounded-lg p-4 bg-white">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-xl">Email</h3>
                <p className="text-sm text-gray-600">
                  {contactData.email || 'No email provided.'}
                </p>
              </div>
            </div>
            <div className="border w-full rounded-lg p-4 bg-white">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-xl">Phone Number</h3>
                <p className="text-sm text-gray-600">
                  {contactData.phoneNumber || 'No phone number provided.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
