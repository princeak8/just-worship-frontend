import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
              {members?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {members.map(member => (
                    <div key={member.id || member.name} className="border rounded-lg p-4 bg-white flex flex-col items-start justify-between">
                      <div className="flex flex-col items-center gap-4 flex-1">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{member.position}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{member.biography}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 my-4 w-full items-center justify-between">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setCurrentMember(member)}
                          asChild
                        >
                          <Link to={`/dashboard/cms/team/${member.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="mx-auto mb-4" />
                  <p>No team members found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}