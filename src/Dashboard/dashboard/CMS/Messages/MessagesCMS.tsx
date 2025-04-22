import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search, Loader2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAboutQuery, useGetMessagesQuery } from '@/app/api';

interface AboutSection {
  id: number;
  header: string;
  content: string;
  pastorTitle: string;
  pastorBio: string;
  pastorPhoto?: {
    id: number;
    url: string;
    mimeType: string;
    filename: string;
    extension: string;
    size: number;
  };
  vision: string;
  visionPhoto?: {
    id: number;
    url: string;
    mimeType: string;
    filename: string;
    extension: string;
    size: number;
  };
  mission: string;
  missionPhoto?: {
    id: number;
    url: string;
    mimeType: string;
    filename: string;
    extension: string;
    size: number;
  };
}

interface ApiResponse {
  statusCode: number;
  data: AboutSection;
}

export default function MessagesCMS() {
  const { data, isLoading } = useGetMessagesQuery<ApiResponse|any>(undefined);
  const [messages, setMessages] = useState<any | null>(null);

  useEffect(() => {
    if (data) {
      setMessages(data?.data);
    }
  }, [data]);

  console.log("mess: ", messages)

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="w-full mx-auto">
        <div className='flex items-center justify-between mb-8'>
          <h1 className="text-3xl font-bold">Messages Page Manager</h1>
          <Link 
            to={`/dashboard/cms/messages/create`}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Message
          </Link>
        </div>

        {isLoading ? (
          <section className='w-full h-screen flex items-center justify-center'>
            <Loader2 size={50} className='text-purple-500 animate-spin' />
          </section>
        ) : (
          <section className='space-y-8'>
            {messages?.length > 0 ? (
              messages?.map((message: any, index: number) =>(
                <div key={index}>
                <Card>
              <CardContent className="py-6">
                <div className="space-y-4 ">
                  <div className='flex items-center justify-between'>
                <h2 className="text-lg font-semibold">{message?.title || '--no title--'}</h2>
                <div className='bg-purple-500 rounded-md p-2 px-3 flex items-center justify-center text-white ' title='reply'>
                <Send size={15}/>
                </div>
                  </div>
                  <p className="text-gray-600 text-justify pl-4">
                    {message?.message || '--no body--'}
                  </p>
                  <div className='flex items-center justify-between'>
                    <p>- {message.name}</p>
                    <p className='italic text-xs'>{message.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
              )) 
            ):(
              <Card>
              <CardContent className="py-6">
                  <p className="text-gray-600 text-justify">
                    No message found
                  </p>
              </CardContent>
            </Card>
            )}

          </section>
        )}
      </div>
    </div>
  );
}