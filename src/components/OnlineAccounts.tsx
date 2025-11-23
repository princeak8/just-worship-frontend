import type React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Banknote, ChevronDown, ChevronLeft, CreditCard, InfoIcon, Search } from 'lucide-react';
import type { OnlineAccount } from '@/Types';
import { useOnlineAccountsQuery } from '@/app/api';
import QRCode from "react-qr-code";

const OnlineAccounts: React.FC = () => {

    //   const { data: { data: accounts = [] }, isLoading: load } = useOnlineAccountsQuery<OnlineAccount[] | any | undefined>(undefined);
    const { data: {data: accounts = []} = {}, isLoading: load } = useOnlineAccountsQuery<OnlineAccount[] | any | undefined>(undefined);

    console.log("accounts:",accounts);
    return (
        <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Online Accounts 
                        </h1>

                        {accounts?.length > 0 ? (
                        <div className='flex flex-row'>
                            {accounts?.map((account:OnlineAccount, index: number) => (
                            <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-4">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Banknote className="w-5 h-5 text-[#BA833C]" />
                                            {account?.name}
                                        </h2>
                                    </div>

                                
                                    <div className="flex flex-col text-sm">

                                        <div className="space-y-2 flex flex-row">
                                            <label className="text-base font-medium text-gray-500 mt-1 mr-1">URL:</label>
                                            <span className="font-medium text-gray-900">
                                                {account?.url}
                                            </span>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center">
                                            {account?.url && (
                                                <QRCode value={account?.url} size={160} className="p-2 bg-white rounded-md" fgColor="#BA833C"/>
                                            )}
                                            <p className="text-xs text-gray-500 mt-3 text-center">
                                            Scan QR code to view payment details
                                            </p>
                                        </div>
                                        
                                    </div>
                                </div>

                            </div>
                            ))}
                        </div>
                        ) : (
                        <div className="w-full py-12 px-6 bg-gray-50 rounded-xl text-center">
                            <div className="max-w-xs mx-auto space-y-4">
                            <Search className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-gray-500 italic">
                                No account details found
                            </p>
                            </div>
                        </div>
                        )}
                    </motion.div>
                    </div>
    );

}


export default OnlineAccounts;