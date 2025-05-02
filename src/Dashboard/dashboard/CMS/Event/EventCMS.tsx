import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus, Trash2, Search, Loader2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteEventMutation, useGetEventQuery } from '@/app/api';

interface GetEvent {
  data: Event[]
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  bookings: string;
  content: string;
  coverPhoto: {
    url: string;
  }
}

interface Select {
  name: string,
  id: string | undefined
}

export default function EventCMS() {
  const { data, isLoading } = useGetEventQuery<GetEvent[] | any | undefined>(undefined);
  const [deleteEvent] = useDeleteEventMutation()
  const [events, setEvents] = useState<Event[]>([]);
  const [warning, setWarning] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Select>({
    name: '',
    id: ''
  })

  useEffect(() => {
    setEvents(data?.data || []);
  }, [data]);

  const handleDeleteEvent = async (id?: string) => {
    if (!id) return;
    try {
      await deleteEvent(id).unwrap()
      setEvents(prev => prev.filter(event => event.id !== id));
      setWarning(false);
      setSelectedEvent({ name: '', id: '' });
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
            <p>Are you sure you want to delete &apos;<span className='italic font-bold text-red-700'>{selectedEvent?.name || "member"}</span>&apos; event?</p>
            <div className='flex items-center justify-between'>
              <Button size={'sm'} onClick={() => { setWarning(false); setSelectedEvent({ name: '', id: '' }) }} variant={'default'} >Cancel</Button>
              <Button size={'sm'} onClick={() => handleDeleteEvent(selectedEvent.id)} variant={'destructive'} >Delete</Button>
            </div>
          </div>
        </section>
      )}
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Event Page Manager</h1>
          <Link
            to="/dashboard/cms/events/add"
            className="flex gap-2 bg-[#BA833C] hover:bg-[#F8DA94] hover:text-black rounded-md p-2 px-4 text-white"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </Link>
        </div>
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events?.length > 0 ? (
                events?.map((event) => (
                  <Card key={event.id}>
                    <img
                      src={event.coverPhoto.url}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-xl">{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className='flex items-center justify-between'>
                        <div>
                        <p className="text-sm text-gray-500">{event?.date}</p>
                        <p className="text-sm text-gray-500">{event?.time}</p>
                        </div>
                        <p className="text-sm text-white flex items-center gap-2 bg-purple-500 p-1 px-2 rounded-md"><Users size={15} className='' />{event.bookings.length}</p>
                      </div>
                      <p className="text-base text-gray-700 text-justify">{event.content}</p>
                    </CardContent>
                    <div className="flex justify-between p-4">
                      <Button asChild size="sm" variant="default">
                        <Link to={`/dashboard/cms/events/${event.id}`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" onClick={() => { setWarning(true); setSelectedEvent({ name: event.name, id: event.id }) }} variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto mb-4" />
                  <p>No events found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
