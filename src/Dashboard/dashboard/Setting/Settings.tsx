import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit, Palette, Moon, Sun, Brush, Bell, Globe, Upload, Key } from 'lucide-react';
import { useGetUserQuery } from '@/app/api';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    bio?: string;
    profileImage?: string;
}

export default function UserProfileSettings() {
    const { data } = useGetUserQuery<User | any | undefined>(undefined);
    const [user, setUser] = useState<User>({
        id: '',
        name: '',
        email: '',
        phone: '',
        bio: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [selectedTab, setSelectedTab] = useState('profile');

    useEffect(() => {
        if (data) setUser(data);
    }, [data]);

    return (
        <div className={`min-h-screen p-8 transition-colors`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex gap-8">
                    <div className="w-64 space-y-2 border-l border-purple-600 pl-4 ">
                        <Button
                            variant={selectedTab === 'profile' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setSelectedTab('profile')}
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Profile
                        </Button>
                        <Button
                            variant={selectedTab === 'notifications' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => setSelectedTab('notifications')}
                        >
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications
                        </Button>
                    </div>

                    <div className="flex-1">
                        {selectedTab === 'profile' && (
                            <Card className="relative">
                                <div className="absolute top-4 right-4">
                                    <Button
                                        variant={editMode ? 'default' : 'outline'}
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        {editMode ? 'Preview' : 'Edit'}
                                    </Button>
                                </div>

                                <CardContent className="pt-12">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="relative group">
                                            <img
                                                src={user.profileImage || '/src/public/card5.jpeg'}
                                                alt='profile'
                                                className="w-24 h-24 rounded-full object-cover border-4 border-[#BA833C]"
                                            />
                                            {editMode && (
                                                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer">
                                                    <Upload className="w-5 h-5" />
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                    // onChange={(e) => {}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={user.name}
                                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                className="text-2xl font-bold bg-transparent border-b-2"
                                            />
                                        ) : (
                                            <h2 className="text-2xl font-bold">{user.name}</h2>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid gap-6">
                                            <section className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Email</label>
                                                    {editMode ? (
                                                        <input
                                                            type="email"
                                                            value={user.email}
                                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                            className="w-full p-2 rounded border"
                                                        />
                                                    ) : (
                                                        <p>{user.email}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                                    {editMode ? (
                                                        <input
                                                            type="text"
                                                            value={user.phone}
                                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                                            className="w-full p-2 rounded border"
                                                        />
                                                    ) : (
                                                        <p>{user.phone}</p>
                                                    )}
                                                </div>
                                            </section>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Bio</label>
                                                {editMode ? (
                                                    <textarea
                                                        value={user.bio}
                                                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                                        className="w-full p-2 rounded border"
                                                        rows={3}
                                                    />
                                                ) : (
                                                    <p>{user.bio || 'No bio yet'}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                    </div>
                </div>

                <Card className="mt-8 border-red-200 bg-red-50 font-bold">
                    <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-2 text-blue-600">
                            <Key className="w-5 h-5" />
                            <span>Change Password</span>
                        </div>
                        <Button variant={'default'}>Change Password</Button>
                    </CardContent>
                    <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-2 text-red-600">
                            <Trash2 className="w-5 h-5" />
                            <span>Delete Account</span>
                        </div>
                        <Button variant="destructive">Delete Account</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}