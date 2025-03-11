import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
// Replace with your actual API hook
import { useGetEventQuery } from '@/app/api';

interface GetEvent {
  data: Event[]
}

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

const dummyEvents: Event[] = [
  {
    id: 1,
    title: 'Tech Conference 2023',
    date: '2023-11-15',
    description: 'Join us for the biggest tech conference of the year!',
    imageUrl:
      'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
  },
  {
    id: 2,
    title: 'Art Exhibition',
    date: '2023-12-01',
    description: 'Explore the latest in contemporary art.',
    imageUrl:
      'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
  },
  {
    id: 3,
    title: 'Music Festival',
    date: '2024-01-20',
    description: 'A weekend of live music and performances.',
    imageUrl:
      'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
  },
];

export default function EventCMS() {
  const { data, isLoading } = useGetEventQuery<GetEvent[] | any | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(data?.data || dummyEvents);
  }, [data]);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-8">Event Page Manager</h1>
          <Link
            to="/dashboard/cms/events/add"
            className="flex gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.length > 0 ? (
            events.map((event) => (
              <Card key={event.id}>
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p className="text-base text-gray-700">{event.description}</p>
                </CardContent>
                <div className="flex justify-between p-4">
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/dashboard/cms/event/${event.id}`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button size="sm" variant="destructive">
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
      </div>
    </div>
  );
}
