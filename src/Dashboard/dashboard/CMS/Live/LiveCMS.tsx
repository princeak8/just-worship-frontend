import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus, Trash2, Search, Loader2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetLiveQuery } from '@/app/api';

interface GetLive {
  data: Live[]
}

interface Live {
  id: string;
  title: string;
  date: string;
  bookings: string;
  description: string;
  coverPhoto: {
    url: string;
  }
}

interface Select {
  title: string,
  id: string | undefined
}

export default function LiveCMS() {
  const { data, isLoading } = useGetLiveQuery<GetLive[] | any | undefined>(undefined);
  // const [deleteLive] = useDeleteLiveMutation()
  const [live, setLive] = useState<Live[]>([]);
  const [warning, setWarning] = useState(false)
  const [selectedLive, setSelectedLive] = useState<Select>({
    title: '',
    id: ''
  })

  useEffect(() => {
    setLive(data?.data || []);
  }, [data]);

  const handleDeleteLive = async (id?: string) => {
    if (!id) return;
    try {
      // await deleteLive(id).unwrap()
      setLive(prev => prev.filter(live => live.id !== id));
      setWarning(false);
      setSelectedLive({ title: '', id: '' });
    } catch (err) {
      console.log(err)
    }
  };

  if (isLoading) return <div className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-[#BA833C] animate-spin' /></div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {warning && (
        <section className=' fixed w-full h-screen inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center'>
          <div className='w-[25em] bg-white rounded-md border border-yellow-500 overflow-hidden p-4 text-center space-y-4'>
            <p>Are you sure you want to delete &apos;<span className='italic font-bold text-red-700'>{selectedLive?.title || "member"}</span>&apos; live event?</p>
            <div className='flex items-center justify-between'>
              <Button size={'sm'} onClick={() => { setWarning(false); setSelectedLive({ title: '', id: '' }) }} variant={'default'} >Cancel</Button>
              <Button size={'sm'} onClick={() => handleDeleteLive(selectedLive.id)} variant={'destructive'} >Delete</Button>
            </div>
          </div>
        </section>
      )}
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Live Page Manager</h1>
          <Link
            to="/dashboard/cms/live/add"
            className="flex gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white"
          >
            <Plus className="w-4 h-4" />
            Add Live
          </Link>
        </div>
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {live?.length > 0 ? (
                live?.map((live) => (
                  <Card key={live.id}>
                    <img
                      src={live.coverPhoto.url}
                      alt={live.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-xl">{live.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <div className='flex items-center justify-between'>
                        <p className="text-sm text-gray-500">{live.date}</p>
                      </div>
                      <p className="text-base text-gray-700 text-justify">{live.description}</p>
                    </CardContent>
                    <div className="flex justify-between p-4">
                      <Button asChild size="sm" variant="default">
                        <Link to={`/dashboard/cms/live/${live.id}`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" onClick={() => { setWarning(true); setSelectedLive({ title: live.title, id: live.id }) }} variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto mb-4" />
                  <p>No live event available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
