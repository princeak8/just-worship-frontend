import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus, Trash2, Search, Loader2, Users, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSaveDiscipleshipMutation, useGetDiscipleshipsQuery, useUpdateDiscipleshipOpenMutation, useUpdateDiscipleshipCloseMutation } from '@/app/api';
import type { Discipleship } from '@/app/types';
import background from '@/live.jpeg'

interface GetDiscipleship {
  data: Discipleship[]
}

interface Select {
  name: string,
  id: string | undefined
}

export default function DiscipleshipCMS() {
  const { data, isLoading } = useGetDiscipleshipsQuery<GetDiscipleship[] | any | undefined>(undefined);
  const [saveDiscipleship] = useSaveDiscipleshipMutation()
  const [updateOpen] = useUpdateDiscipleshipOpenMutation<any>();
  const [updateClose] = useUpdateDiscipleshipCloseMutation<any>();
  const [discipleships, setDiscipleships] = useState<Discipleship[]>([]);
  const [warning, setWarning] = useState(false)
  const [selectedDiscipleship, setSelectedDiscipleship] = useState<Select>({
    name: '',
    id: ''
  })

  useEffect(() => {
    setDiscipleships(data?.data || []);
  }, [data]);

  // const handleDeleteDiscipleship = async (id?: string) => {
  //   if (!id) return;
  //   try {
  //     await deleteDiscipleship(id).unwrap()
  //     setEvents(prev => prev.filter(event => event.id !== id));
  //     setWarning(false);
  //     setSelectedEvent({ name: '', id: '' });
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };

  const setOpen = async (id: string, open: string) => {
    try {
      if (open === "1") {
        console.log("closing", id);
        await updateClose({id}).unwrap();
  
        setDiscipleships(prev =>
          prev.map(d =>
            d.id === id ? { ...d, open: "0" } : d
          )
        );
  
      } else {
        console.log("opening", id);
        const response = await updateOpen({id}).unwrap();
  
        setDiscipleships(prev =>
          prev.map(d =>
            d.id === id ? { ...d, open: "1" } : d
          )
        );
      }
  
    } catch (err) {
      console.log("error", err);
    }
  };
  

  if (isLoading) return <div className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-[#BA833C] animate-spin' /></div>;

  console.log("disciple: ", discipleships)

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {warning && (
        <section className=' fixed w-full h-screen inset-0 bg-black/50 bg-opacity-20 flex items-center justify-center'>
          <div className='w-[25em] bg-white rounded-md border border-yellow-500 overflow-hidden p-4 text-center space-y-4'>
            <p>Are you sure you want to delete &apos;<span className='italic font-bold text-red-700'>{selectedDiscipleship?.name || "member"}</span></p>
            <div className='flex items-center justify-between'>
              <Button size={'sm'} onClick={() => { setWarning(false); setSelectedDiscipleship({ name: '', id: '' }) }} variant={'default'} >Cancel</Button>
              {/* <Button size={'sm'} onClick={() => handleDeleteDiscipleship(selectedDiscipleship.id)} variant={'destructive'} >Delete</Button> */}
            </div>
          </div>
        </section>
      )}
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Discipleship Page Manager</h1>
          <Link
            to="/dashboard/cms/discipleships/add"
            className="flex gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white"
          >
            <Plus className="w-4 h-4" />
            Add Discipleship
          </Link>
        </div>
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discipleships?.length > 0 ? (
                discipleships?.map((discipleship) => (
                  <Card key={discipleship.id}>
                    <img
                    loading="lazy"
                      src={discipleship?.photo?.url ?? background}
                      alt={discipleship.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-xl">{discipleship.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className='flex items-center justify-between'>
                        <div>
                          {discipleship?.venue && (
                            <p className="text-sm pb-2 flex">
                              <MapPin className='' size={20} />Venue: {discipleship?.venue}
                            </p>
                          )}

                        {discipleship?.deadline && (
                          <p className="text-sm text-gray-500 flex pb-2">
                            <Calendar size={20} /> Deadline: {discipleship.deadline}
                          </p>
                        )}
                        {discipleship?.open &&(
                          <label className="switch">
                          <input type="checkbox" checked={discipleship?.open === "1" ? true: false} onClick={() => setOpen(discipleship.id, discipleship?.open)} />
                          <span className="slider round"></span>
                        </label>
                        )}
                        </div>
                        {discipleship?.members && (
                          <p className="text-sm text-white flex items-center gap-2 bg-[#BA833C] p-1 px-2 rounded-md"><Users size={15} className='' />{discipleship.members.length}</p>
                        )}
                        
                      </div>
                    </CardContent>
                    <div className="flex justify-between p-4">
                      <Button asChild size="sm" variant="default">
                        <Link to={`/dashboard/cms/discipleships/${discipleship.id}`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" onClick={() => { setWarning(true); setSelectedDiscipleship({ name: discipleship.name, id: discipleship.id }) }} variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto mb-4" />
                  <p>No Discipleship Class found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
