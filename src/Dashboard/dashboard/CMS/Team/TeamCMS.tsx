import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAboutQuery } from '@/app/api';

interface AboutSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  teamMembers?: TeamMember[];
}

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  avatar: string;
}

export const dummyAboutContent = [
  {
    id: '1',
    title: 'Our Mission',
    subtitle: 'Dedicated to excellence in education',
    content: "At our institution, we are committed to fostering intellectual growth and personal development...",
    image: 'https://example.com/mission-image.jpg'
  },
  {
    id: '2',
    title: 'Our Team',
    subtitle: 'Experienced professionals',
    content: "Meet our dedicated team of educators and administrators...",
    teamMembers: [
      {
        name: 'John Doe',
        position: 'President',
        bio: 'Seasoned academic leader with 20+ years experience...',
        avatar: 'https://example.com/avatar1.jpg'
      }
    ]
  },
];

export default function TeamCMS() {
  const { data, isLoading } = useGetAboutQuery();
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [currentSection, setCurrentSection] = useState<Partial<AboutSection>>({});

  useEffect(() => {
    setSections(data?.data || []);
  }, [data]);

  const handleEditSection = (section: AboutSection) => {
    setCurrentSection(section);
  };

  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
    if (currentSection.id === id) setCurrentSection({});
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="w-full mx-auto">
        <div className='flex items-center justify-between'>
          <h1 className="text-3xl font-bold mb-8">Team Page Manager</h1>
          <Link 
            to={'/dashboard/cms/about/create'} 
            className='flex gap-2 bg-purple-500 hover:bg-purple-600 rounded-md p-2 px-4 text-white'
          >
            <Plus /> Add Member
          </Link>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardContent className="space-y-4 py-4">
              {sections?.length > 0 ? sections.map(section => (
                <div key={section.id} className="border w-full rounded-lg p-4 bg-white">
                  <div className="flex gap-4 w-full">
                    <div className="flex flex-col justify-between w-full p-2">
                      <div>
                        <h3 className="font-semibold text-xl mb-2">{section.title}</h3>
                        {section.subtitle && (
                          <h4 className="text-lg text-gray-600 mb-2">{section.subtitle}</h4>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-4 text-justify">
                          {section.content}
                        </p>
                        
                        {section.teamMembers && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Team Members:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {section.teamMembers.map(member => (
                                <div key={member.name} className="flex items-center gap-3">
                                  <img 
                                    src={member.avatar} 
                                    alt={member.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-gray-600">{member.position}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditSection(section)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    
                    {section.image && (
                      <div className='w-4/12'>
                        <img 
                          src={section.image} 
                          alt={section.title} 
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <p className='flex gap-2'><Search /> No sections available...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}