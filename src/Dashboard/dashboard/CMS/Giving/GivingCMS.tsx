import { useState, useEffect } from 'react';
import { Loader2, Edit, Trash, Plus, Currency, Trash2, Eye, X, Search } from 'lucide-react';
import { useBanksQuery, useCountriesQuery, useCreateAccountMutation, useCreateOnlineAccountMutation, useDeleteAccountMutation, useEditAccountMutation, useEditGivingOptionMutation, useEditOnlineAccountMutation, useGetAccountQuery, useGetGivingQuery, useGetOptionsQuery, useOnlineAccountQuery } from '@/app/api';
import { Button } from '@/components/ui/button';

interface PaymentMethod {
    id: number;
    name: string;
    accounts: any[];
}

interface Select {
    name: string,
    id: string | undefined
}

export default function GivingCMS() {
    const { data, isLoading } = useGetGivingQuery<any | undefined>(undefined);
    const { data: Options } = useGetOptionsQuery<any | undefined>(undefined);
    const { data: onlineAccount } = useOnlineAccountQuery<any | undefined>(undefined);
    const { data: banks } = useBanksQuery<any | undefined>(undefined)
    const { data: countries } = useCountriesQuery<any | undefined>(undefined)
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [isOpen, setIsModalOpen] = useState(false);
    const [viewMethod, setViewMethod] = useState<PaymentMethod | any | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newMethodName, setNewMethodName] = useState<any>(null);
    const [linkAccount, setLinkAccount] = useState('');
    const [linkOnlineAccount, setLinkOnlineAccount] = useState('');
    const [editingMethod, setEditingMethod] = useState<PaymentMethod | any | null>(null);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [binary, setBinary] = useState(0)
    const { data: accounts } = useGetAccountQuery<any>(undefined)
    const [createAccount, { isLoading: load }] = useCreateAccountMutation()
    const [editAccount, { isLoading: load2 }] = useEditAccountMutation()
    const [editgivingOptions] = useEditGivingOptionMutation()
    const [Accounts, setAccounts] = useState<any>([])
    const [onlineAccounts, setOnlineAccounts] = useState<any>([])
    const [warning, setWarning] = useState(false)
    const [deleteAccount] = useDeleteAccountMutation()
    const [createOnlineAccount] = useCreateOnlineAccountMutation()
    const [editOnlineAccount] = useEditOnlineAccountMutation()
    const [selectedAccount, setSelectedAccount] = useState<Select>({
        name: '',
        id: ''
    })
    const blankForm = {
        id: '',
        name: '',
        number: '',
        currency: '',
        bank: '',
        country: '',
    };
    const [formState, setFormState] = useState({ ...blankForm });

    const blankForm2 = {
        id: '',
        name: '',
        url: '',
        qrCodePhoto: '',
    };
    const [formState2, setFormState2] = useState({ ...blankForm2 });

    // console.log(formState)

    useEffect(() => {
        if (data?.data) {
            setPaymentMethods(data?.data);
            setAccounts(accounts?.data)
            setOnlineAccounts(onlineAccount?.data)
            setPaymentOptions(Options?.data || []);
        }
    }, [data?.data, Options?.data]);

    // console.log("Data: ", onlineAccounts)

    const handleDelete = (id: number) => {
        setPaymentMethods(prev => prev.filter(method => method.id !== id));
    };

    const handleCreate = async () => {
        // console.log("editing")

        const formdata = new FormData()

        if (binary === 0) {
            formdata.append('name', newMethodName.name);
            formdata.append('number', newMethodName.number);
            formdata.append('bankId', newMethodName.bank);
            formdata.append('currency', newMethodName.currency);
            formdata.append('countryId', newMethodName.country);

            try {
                await createAccount(formdata).unwrap();
                window.location.reload();
            } catch (error) {
                console.error('Creation error:', error);
            }
            // setAccounts((prev: any) => [...prev, newMethod]);
            // setEditingMethod(null);
            // setIsCreateModalOpen(false);
            // }

            // if (newMethodName.trim()) {
            //     const newMethod = {
            //         id: Date.now(),
            //         name: newMethodName,
            //         accounts: []
            //     };
            //     setPaymentMethods(prev => [...prev, newMethod]);
            //     setNewMethodName('');
            //     setIsCreateModalOpen(false);
        }

        if (binary === 1) {
            formdata.append('name', newMethodName.name);
            formdata.append('url', newMethodName.url);

            try {
                await createOnlineAccount(formdata).unwrap();
                window.location.reload();
            } catch (error) {
                console.error('Creation error:', error);
            }
            // setAccounts((prev: any) => [...prev, newMethod]);
            // setEditingMethod(null);
            // setIsCreateModalOpen(false);
            // }

            // if (newMethodName.trim()) {
            //     const newMethod = {
            //         id: Date.now(),
            //         name: newMethodName,
            //         accounts: []
            //     };
            //     setPaymentMethods(prev => [...prev, newMethod]);
            //     setNewMethodName('');
            //     setIsCreateModalOpen(false);
        }
    };

    // console.log("option: ", editingMethod)

    const handleUpdate = async () => {
        const formdata = new FormData()
        if (binary === 0) {
            if (editingMethod?.id) {

                formdata.append('accountId', formState?.id)
                formdata.append('currency', formState?.currency)
                formdata.append('bankId', formState?.bank)
                formdata.append('name', formState?.name)
                formdata.append('number', formState?.number)

                try {
                    await editAccount({ formdata, id: formState?.id }).unwrap()
                    setAccounts((prev: any) =>
                        prev.map((method: any) =>
                            method.id === formState.id ?
                                { ...method, name: formState?.name, ...method, bank: formState?.bank, ...method, number: formState?.number, ...method, currency: formState?.currency, ...method } :
                                method
                        )
                    );
                    setEditingMethod(null);
                    setIsCreateModalOpen(false);
                    setFormState({ ...blankForm });
                    setFormState2({ ...blankForm2 });
                } catch (error) {
                    console.log(error)
                }

            }
        }

        if (binary === 1) {
            if (editingMethod?.id) {

                formdata.append('accountId', formState?.id)
                formdata.append('name', formState2?.name)
                formdata.append('url', formState2?.url)

                try {
                    await editOnlineAccount({ formdata, id: formState2?.id }).unwrap()
                    setAccounts((prev: any) =>
                        prev.map((method: any) =>
                            method.id === formState.id ?
                                { ...method, name: formState2?.name, ...method, url: formState2?.url, ...method } :
                                method
                        )
                    );
                    setEditingMethod(null);
                    setIsCreateModalOpen(false);
                    setFormState({ ...blankForm });
                    setFormState2({ ...blankForm2 });
                } catch (error) {
                    console.log(error)
                }

            }
        }

        if (binary === 2) {
            if (editingMethod?.name.trim()) {

                formdata.append('givingOptionId', editingMethod.id)
                if (linkAccount) {
                    formdata.append('bankAccountId', linkAccount)
                }
                if (linkOnlineAccount) {
                    formdata.append('onlineAccountId', linkOnlineAccount)
                }


                try {
                    await editgivingOptions(formdata).unwrap()
                } catch (error) {
                    console.log(error)
                }
                setPaymentMethods(prev =>
                    prev.map(method =>
                        method.id === editingMethod.id ?
                            { ...method, name: editingMethod.name } :
                            method
                    )
                );

                setEditingMethod(null);
                setIsCreateModalOpen(false);
                setFormState({ ...blankForm });
                setFormState2({ ...blankForm2 });
            }
        }


    };

    const handleDeleteAccount = async (id?: string) => {
        if (!id) return;
        try {
            await deleteAccount(id).unwrap()
            setAccounts((prev: any) => prev.filter((account: any) => account.id !== id));
            setWarning(false);
            //   setSelected({ name: '', id: '' });
        } catch (err) {
            console.log(err)
        }
    };

    if (isLoading) return (
        <section className='w-full h-screen flex items-center justify-center'>
            <Loader2 size={50} className='text-purple-500 animate-spin' />
        </section>
    );

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            {warning && (
                <section className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='w-[25em] bg-white rounded-md border border-red-500 overflow-hidden p-6 space-y-4'>
                        <p className='text-lg font-medium text-center'>
                            Delete account <span className='font-bold text-red-600'>"{selectedAccount?.name}"</span>?
                        </p>
                        <div className='flex justify-end gap-3'>
                            <Button
                                variant='outline'
                                onClick={() => { setWarning(false); setSelectedAccount({ name: '', id: '' }) }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='destructive'
                                onClick={() => handleDeleteAccount(selectedAccount.id)}
                            >
                                Confirm Delete
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            <div className="w-full max-w-4xl mx-auto">
                <div className='flex items-center justify-between mb-8'>
                    <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-700">Bank Accounts</h2>
                        <Button onClick={() => { setIsCreateModalOpen(true); setBinary(0) }} className='bg-purple-500'>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Account
                        </Button>
                    </div>
                    <div className="divide-y">
                        {Accounts?.map((method: any) => (
                            <div key={method.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {method?.number} - {method?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">{method?.bank?.name} ({method?.currency})</p>
                                </div>
                                <div className="flex gap-2">
                                    {/* <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => { setEditingMethod(method); setBinary(0) }}
                                    >
                                        <Eye className="h-4 w-4 text-purple-600" />
                                    </Button> */}
                                    <Button
                                        variant='ghost'
                                        onClick={() => {
                                            setFormState({
                                                id: method.id,
                                                name: method.name,
                                                number: method.number,
                                                currency: method.currency,
                                                bank: method.bank.id,
                                                country: method.country.id,
                                            });
                                            setBinary(0);
                                            setIsCreateModalOpen(true);
                                            setEditingMethod(method);
                                        }}
                                    >
                                        <Edit className="h-4 w-4 text-blue-600" />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => { setWarning(true); setSelectedAccount(method) }}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-700">Online Accounts</h2>
                        <Button onClick={() => { setIsCreateModalOpen(true); setBinary(1) }} className='bg-purple-500'>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Online Account
                        </Button>
                    </div>
                    <div className="divide-y">
                        {onlineAccounts?.map((method: any) => (
                            <div key={method.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {method?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">Online Account</p>
                                </div>
                                <div className="flex gap-2">
                                    {/* <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => { setEditingMethod(method); setBinary(1) }}
                                    >
                                        <Eye className="h-4 w-4 text-purple-600" />
                                    </Button> */}
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => {
                                            setFormState2({
                                                id: method.id,
                                                name: method.name,
                                                url: method.url,
                                                qrCodePhoto: method.qrCodePhoto,
                                            });
                                            setBinary(1);
                                            setIsCreateModalOpen(true);
                                            setEditingMethod(method);
                                        }}
                                    >
                                        <Edit className="h-4 w-4 text-blue-600" />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => { setWarning(true); setSelectedAccount(method) }}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-700">Payment Options</h2>
                    </div>
                    <div className="divide-y">
                        {paymentOptions?.map((account: any) => (
                            <div key={account?.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <span className="font-medium text-gray-800">{account?.name}</span>
                                <div className="flex gap-2">
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => { setViewMethod(account); setIsModalOpen(true) }}
                                    >
                                        <Eye className="h-4 w-4 text-purple-600" />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => { setEditingMethod(account); setBinary(2) }}
                                    >
                                        <Edit className="h-4 w-4 text-blue-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {(isCreateModalOpen || editingMethod) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editingMethod ? 'Edit' : 'Create'}
                                {binary === 0 ? ' Bank Account' : binary === 1 ? ' Online Account' : ' Payment Option'}
                            </h2>

                            {binary === 0 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account Name
                                        </label>
                                        <input
                                            value={formState?.name || newMethodName?.name}
                                            onChange={(e) => {
                                                if (formState) {
                                                    setFormState({ ...formState, name: e.target.value });
                                                } else {
                                                    setNewMethodName({ ...newMethodName, name: e.target.value });
                                                }
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Account name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account number
                                        </label>
                                        <input
                                            value={formState?.number || newMethodName?.number || ''}
                                            onChange={(e) => editingMethod
                                                ? setFormState({ ...formState, number: e.target.value })
                                                : setNewMethodName({ ...newMethodName, number: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bank
                                        </label>
                                        <select
                                            value={formState?.bank || newMethodName?.bank || ''}
                                            onChange={e => {
                                                const bank = e.target.value;
                                                if (formState) {
                                                    setFormState({
                                                        ...formState,
                                                        bank,
                                                    });
                                                } else {
                                                    setNewMethodName({
                                                        ...newMethodName,
                                                        bank,
                                                    });
                                                }
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select Bank</option>
                                            {banks?.data.map((bank: any) => (
                                                <option key={bank.id} value={bank.id}>
                                                    {bank.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Country
                                        </label>
                                        <select
                                            value={formState?.country || newMethodName?.country || ''}
                                            onChange={e => {
                                                const country = e.target.value;
                                                if (formState) {
                                                    setFormState({
                                                        ...formState,
                                                        country,
                                                    });
                                                } else {
                                                    setNewMethodName({
                                                        ...newMethodName,
                                                        country,
                                                    });
                                                }
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select Country</option>
                                            {countries?.data.map((country: any) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Currency
                                        </label>
                                        <input
                                            value={formState?.currency || newMethodName?.currency || ''}
                                            onChange={(e) => formState
                                                ? setFormState({ ...formState, currency: e.target.value })
                                                : setNewMethodName({ ...newMethodName, currency: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            {binary === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account Name
                                        </label>
                                        <input
                                            value={formState2?.name || newMethodName?.name || ''}
                                            onChange={(e) => editingMethod
                                                ? setFormState2({ ...formState2, name: e.target.value })
                                                : setNewMethodName({ ...newMethodName, name: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account URL
                                        </label>
                                        <input
                                            value={formState2?.url || newMethodName?.url || ''}
                                            onChange={(e) => editingMethod
                                                ? setFormState2({ ...formState2, url: e.target.value })
                                                : setNewMethodName({ ...newMethodName, url: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            {binary === 2 && editingMethod && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={editingMethod?.name}
                                        onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
                                        className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-800 mb-2">Linked Accounts</h3>
                                        {editingMethod?.accounts?.length < 1 ? (
                                            <p className='flex gap-2'><Search /> No Linked account available</p>
                                        ) : (
                                            <>

                                                {editingMethod?.accounts?.map((account: any) => (
                                                    <div key={account.id} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                                                        {account?.bank?.name ? (
                                                            <span className="text-sm">
                                                                {account?.number} - {account?.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm">
                                                                {account?.name} - <span className='italic tet-xs'>(Online Account)</span>
                                                            </span>
                                                        )
                                                        }
                                                        <Trash2
                                                            className="h-4 w-4 text-red-500 cursor-pointer"
                                                            onClick={() => { }}
                                                        />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Link Bank Account
                                            </label>
                                            <select
                                                value={linkAccount}
                                                onChange={(e) => setLinkAccount(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                            >
                                                <option value="">Select an account</option>
                                                {accounts?.data?.map((account: any) => (
                                                    <option key={account?.id} value={account?.id}>
                                                        {account?.number} - {account?.name} ({account?.bank?.name})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <p className="text-sm mb-2">Link Online Account (optional)</p>
                                            <select value={linkOnlineAccount} onChange={(e) => setLinkOnlineAccount(e.target.value)} className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent " >
                                                <option>Add Online Account</option>
                                                {onlineAccounts?.map((account: any, index: number) => (
                                                    <option key={index} value={account?.id}>{account?.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant='outline'
                                    onClick={() => {
                                        setEditingMethod(null);
                                        setIsCreateModalOpen(false);
                                        setFormState({ ...blankForm });
                                        setFormState2({ ...blankForm2 });
                                    }}

                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={editingMethod ? handleUpdate : handleCreate}
                                    disabled={load || load2}
                                    className='bg-purple-500'
                                >
                                    {load || load2 ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : editingMethod ? 'Save Changes' : 'Create'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end">
                        <div className="bg-white p-6 w-full max-w-md space-y-4 h-screen">
                            <div className='flex items-center justify-between border-b'>
                                <h2 className="text-2xl font-medium text-gray-800 mb-2 ">Account Details</h2>
                                <X size={20} onClick={() => setIsModalOpen(false)} className='hover:bg-gray-200 rounded-lg' />
                            </div>
                            <div className="space-y-4">
                                <div className="w-full p-2 flex gap-2 "> <p>Option Name: </p> <p className='font-bold'>{viewMethod?.name}</p></div>
                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">Linked Accounts</h3>
                                    {viewMethod?.accounts?.length < 1 ? (
                                        <p className='flex gap-2'><Search /> No Linked account available</p>
                                    ) : (
                                        <>
                                            {viewMethod?.accounts?.map((account: any) => (
                                                <div key={account.id} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                                                    {account?.bank?.name ? (
                                                        <span className="text-sm">
                                                            <p>{account?.number} - ({account?.bank?.name})</p> {account?.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm">
                                                            {account?.name} - <span className='italic tet-xs'>(Online Account)</span>
                                                        </span>
                                                    )
                                                    }
                                                    <Trash2
                                                        className="h-4 w-4 text-red-500 cursor-pointer"
                                                        onClick={() => { }}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    );
}