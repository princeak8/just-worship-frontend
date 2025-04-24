import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteMemberMutation, useGetTeamQuery } from '@/app/api';

interface TeamData {
  data: TeamMember[]
}

interface TeamMember {
  id?: string;
  name: string;
  position: string;
  biography: string;
  photo:{
    url: string;
  } 
}

interface Select{
  name: string,
  id: string | undefined
}


export default function TeamCMS() {
  const { data, isLoading } = useGetTeamQuery<TeamData | any | undefined>(undefined);
  const [deleteMember] = useDeleteMemberMutation()
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({});
  const [warning, setWarning] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Select>({
    name: '',
    id: ''
  })

  useEffect(() => {
    setMembers(data?.data || []);
  }, [data]);

  const handleDeleteMember = async (id?: string) => {
    if (!id) return;
    try{
      await deleteMember(id).unwrap()
      setMembers(prev => prev.filter(member => member.id !== id));
      setWarning(false); 
      setSelectedMember({name: '', id: ''});
    }catch(err){
      console.log(err)
    }
  };

  if (isLoading) return <div className='w-full h-screen flex items-center justify-center'><Loader2 size={50} className='text-purple-500 animate-spin' /></div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {warning && (
        <section className=' fixed w-full h-screen inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center'>
          <div className='w-[25em] bg-white rounded-md border border-yellow-500 overflow-hidden p-4 text-center space-y-4'>
            <p>Are you sure you want to delete &apos;<span className='italic font-bold text-red-700'>{selectedMember?.name || "member"}</span>&apos;?</p>
            <div className='flex items-center justify-between'> 
              <Button size={'sm'} onClick={() =>{setWarning(false); setSelectedMember({name: '', id: ''})}} variant={'default'} >Cancel</Button>
              <Button size={'sm'} onClick={() => handleDeleteMember(selectedMember.id)} variant={'destructive'} >Delete</Button>
            </div>
          </div>
        </section>
      )}
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
                        src={member.photo.url}
                        alt={member.name}
                         className="w-full max-h-64 object-cover object-top"
                      />
                      <CardHeader>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-gray-500">{member.position}</p>
                        <p className="text-base text-gray-700 line-clamp-4 md:h-24">{member.biography}</p>
                      </CardContent>
                      <div className="flex justify-between p-4 pt-0">
                        <Button asChild size="sm" variant="default">
                          <Link to={`/dashboard/cms/team/${member.id}`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" onClick={()=>{setWarning(true); setSelectedMember({name: member.name, id: member.id})}} variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Search className="mx-auto mb-4" />
                    <p>No member yet</p>
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