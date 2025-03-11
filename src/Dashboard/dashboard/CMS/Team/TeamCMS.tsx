import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAboutQuery, useGetTeamQuery } from '@/app/api';

interface TeamData {
  data: TeamData[]
}

interface TeamMember {
  id?: string;
  name: string;
  position: string;
  biography: string;
  avatar: string;
}

export const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    position: 'President',
    biography: 'Seasoned academic leader with 20+ years experience...',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Vice President',
    biography: 'Experienced administrator with focus on student success...',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
  {
    id: 3,
    name: 'Jane Smith',
    position: 'Vice President',
    biography: 'Experienced administrator with focus on student success...',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  },
];

export default function TeamCMS() {
  const { data, isLoading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({});

  useEffect(() => {
    setMembers(data?.data || teamMembers || []);
  }, [data]);

  const handleDeleteMember = (id?: string) => {
    if (!id) return;
    setMembers(prev => prev.filter(member => member.id !== id));
    if (currentMember.id === id) setCurrentMember({});
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="w-full mx-auto">
        <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold mb-8">Team Page Manager</h1>
          <Link
            to={'/dashboard/cms/team/add'}
            className='flex gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'
          >
            <Plus /> Add Member
          </Link>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardContent className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members?.length > 0 ? (
                  members.map((member) => (
                    <Card key={member.id}>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-gray-500">{member.position}</p>
                        <p className="text-base text-gray-700">{member.biography}</p>
                      </CardContent>
                      <div className="flex justify-between p-4">
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/dashboard/cms/team/${member.id}`}>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}