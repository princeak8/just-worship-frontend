import { useState, useEffect } from 'react';
import { Loader2, Edit, Trash, Plus, Currency } from 'lucide-react';
import { useCreateAccountMutation, useEditAccountMutation, useEditGivingOptionMutation, useGetAccountQuery, useGetGivingQuery, useGetOptionsQuery } from '@/app/api';

interface PaymentMethod {
    id: number;
    name: string;
    accounts: any[];
}

export default function GivingCMS() {
    const { data, isLoading } = useGetGivingQuery<any | undefined>(undefined);
    const { data: Options } = useGetOptionsQuery<any | undefined>(undefined);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newMethodName, setNewMethodName] = useState<any>(null);
    const [linkAccount, setLinkAccount] = useState('');
    const [editingMethod, setEditingMethod] = useState<PaymentMethod | any | null>(null);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [binary, setBinary] = useState(0)
    const { data: accounts } = useGetAccountQuery<any>(undefined)
    const [createAccount, { isLoading: load }] = useCreateAccountMutation()
    const [editAccount, { isLoading: load2 }] = useEditAccountMutation()
    const [editgivingOptions] = useEditGivingOptionMutation()
    const [Accounts, setAccounts] = useState<any>([])

    useEffect(() => {
        if (data?.data) {
            setPaymentMethods(data?.data);
            setAccounts(accounts?.data)
            setPaymentOptions(Options?.data || []);
        }
    }, [data?.data, Options?.data]);

    const handleDelete = (id: number) => {
        setPaymentMethods(prev => prev.filter(method => method.id !== id));
    };

    const handleCreate = async () => {
        const formdata = new FormData()

        if (binary === 1) {

            // const newMethod = {
            //     id: Date.now(),
            //     name: newMethodName.name,
            //     bank: newMethodName.bank,
            //     currency: newMethodName.currency,
            //     number: newMethodName.number,
            // };

            formdata.append('currency', editingMethod?.currency)
            formdata.append('bank', editingMethod?.bank)
            formdata.append('name', editingMethod?.name)
            formdata.append('number', editingMethod?.number)

            try {
                await createAccount(formdata).unwrap()
            } catch (error) {
                console.log(error)
            }
            window.location.reload()
            // setAccounts((prev: any) => [...prev, newMethod]);
            setEditingMethod(null);
            setIsCreateModalOpen(false);
        }

        // if (newMethodName.trim()) {
        //     const newMethod = {
        //         id: Date.now(),
        //         name: newMethodName,
        //         accounts: []
        //     };
        //     setPaymentMethods(prev => [...prev, newMethod]);
        //     setNewMethodName('');
        //     setIsCreateModalOpen(false);
        // }
    };

    // console.log("option: ", editingMethod)

    const handleUpdate = async () => {
        const formdata = new FormData()
        if (binary === 1) {
            if (editingMethod?.id) {

                formdata.append('accountId', editingMethod?.id)
                formdata.append('currency', editingMethod?.currency)
                formdata.append('bank', editingMethod?.bank)
                formdata.append('name', editingMethod?.name)
                formdata.append('number', editingMethod?.number)

                try {
                    await editAccount({ formdata, id: editingMethod?.id }).unwrap()
                } catch (error) {
                    console.log(error)
                }
                setAccounts((prev: any) =>
                    prev.map((method: any) =>
                        method.id === editingMethod.id ?
                            { ...method, name: editingMethod.name, ...method, bank: editingMethod.bank, ...method, number: editingMethod.number, ...method, currency: editingMethod.currency, ...method } :
                            method
                    )
                );
                setEditingMethod(null);
            }
        }

        if (binary === 2) {
            if (editingMethod?.name.trim()) {

                formdata.append('givingOptionId', editingMethod.id)
                formdata.append('bankAccountId', linkAccount)


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
            }
        }


    };

    if (isLoading) return (
        <section className='w-full h-screen flex items-center justify-center'>
            <Loader2 size={50} className='text-purple-500 animate-spin' />
        </section>
    );

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="w-full max-w-4xl mx-auto">
                <div className='flex items-center justify-between mb-8'>
                    <h1 className="text-3xl font-bold">Payment Management</h1>

                </div>

                {/* <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">Payment Methods</h2>
                        <button
                            onClick={() => { setIsCreateModalOpen(true); setBinary(0) }}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Payment Method
                        </button>
                    </div>
                    <div className="divide-y">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <span className="font-medium">{method.name}</span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setEditingMethod(method)}
                                        className="text-gray-400 hover:text-blue-500 p-1 rounded-md"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(method.id)}
                                        className="text-gray-400 hover:text-red-500 p-1 rounded-md"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">Accounts</h2>
                        <button
                            onClick={() => { setIsCreateModalOpen(true); setBinary(1) }}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Accounts
                        </button>
                    </div>
                    <div className="divide-y">
                        {Accounts?.map((method: any) => (
                            <div key={method.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <span className="font-medium">{method?.number} - {method?.name} ({method?.bank})</span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => { setEditingMethod(method); setBinary(1) }}
                                        className="text-gray-400 hover:text-blue-500 p-1 rounded-md"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(method.id)}
                                        className="text-gray-400 hover:text-red-500 p-1 rounded-md"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">Payment Options</h2>
                        {/* <button
                            onClick={() => { setIsCreateModalOpen(true); setBinary(1) }}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add Payment Option
                        </button> */}
                    </div>
                    <div className="divide-y">
                        {paymentOptions?.map((account: any) => (
                            <div key={account.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                                <span className="font-medium">{account.name}</span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => { setEditingMethod(account); setBinary(2) }}
                                        className="text-gray-400 hover:text-blue-500 p-1 rounded-md"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(account.id)}
                                        className="text-gray-400 hover:text-red-500 p-1 rounded-md"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {isCreateModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">{binary === 0 ? 'Add New Payment Method' : binary === 1 ? 'Add New Account' : 'Add New Payment Option'}</h2>
                            <input
                                type="text"
                                value={newMethodName?.name}
                                onChange={(e) => setNewMethodName({ ...newMethodName, name: e.target.value })}
                                className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Method name"
                            />
                            {binary === 1 &&
                                <section>
                                    <div>
                                        <p className="text-sm mb-2">Account Number</p>
                                        <input
                                            type="text"
                                            value={newMethodName?.number}
                                            onChange={(e) => setNewMethodName({ ...newMethodName, number: e.target.value })}
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Method name"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2">Bank</p>
                                        <input
                                            type="text"
                                            value={newMethodName?.bank}
                                            onChange={(e) => setNewMethodName({ ...newMethodName, bank: e.target.value })}
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Method name"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2">Currency</p>
                                        <input
                                            type="text"
                                            value={newMethodName?.currency}
                                            onChange={(e) => setNewMethodName({ ...newMethodName, currency: e.target.value })}
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Method name"
                                        />
                                    </div>
                                </section>
                            }
                            {binary === 2 &&
                                <section>
                                    <div>
                                        <p className="text-sm mb-2">Link Account</p>
                                        <select value={linkAccount} onChange={(e) => setLinkAccount(e.target.value)} className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent " >
                                            <option>Add Account</option>
                                            {accounts?.data?.map((account: any, index: number) => (
                                                <option key={index} value={account.id}>{account.number} - {account.name} ({account.bank})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2">Link Online Account (optional)</p>
                                        <select value={linkAccount} onChange={(e) => setLinkAccount(e.target.value)} className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent " >
                                            <option>Account name</option>
                                        </select>
                                    </div>
                                </section>
                            }
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreate}
                                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {editingMethod && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">{binary === 0 ? 'Edit Payment Method' : binary === 1 ? 'Edit Account' : 'Edit Payment Option'}</h2>
                            <input
                                type="text"
                                value={editingMethod.name}
                                onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
                                className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            {binary === 1 &&
                                <section>
                                    <div>
                                        <p className="text-sm mb-2">Account Number</p>
                                        <input
                                            type="text"
                                            value={editingMethod?.number}
                                            onChange={(e) => setEditingMethod({ ...editingMethod, number: e.target.value })}
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Method name"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2">Bank</p>
                                        <input
                                            type="text"
                                            value={editingMethod.bank}
                                            onChange={(e) => setEditingMethod({ ...editingMethod, bank: e.target.value })}
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Method name"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2">Currency</p>
                                        <input
                                            type="text"
                                            value={editingMethod.currency}
                                            onChange={(e) => setEditingMethod({ ...editingMethod, currency: e.target.value })}
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Method name"
                                        />
                                    </div>
                                    {/* <div>
                                        <p className="text-sm mb-2">Country</p>
                                        <input
                                            type="text"
                                            value={editingMethod.country.name}
                                            onChange={(e) => setEditingMethod({ ...editingMethod, country: e.target.value })}
                                            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Method name"
                                        />
                                    </div> */}
                                </section>
                            }
                            {binary === 2 &&
                                <section>
                                    <div>
                                        <p className="text-sm mb-2">Link Account</p>
                                        <select value={linkAccount} onChange={(e) => setLinkAccount(e.target.value)} className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent " >
                                            <option>Add Account</option>
                                            {accounts?.data?.map((account: any, index: number) => (
                                                <option key={index} value={account.id}>{account.number} - {account.name} ({account.bank})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2">Link Online Account (optional)</p>
                                        <select value={linkAccount} onChange={(e) => setLinkAccount(e.target.value)} className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent " >
                                            <option>Account name</option>
                                        </select>
                                    </div>
                                </section>
                            }
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setEditingMethod(null)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}