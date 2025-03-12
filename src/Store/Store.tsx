import { motion } from "motion/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import BG from '@/public/gallery/gallery4.jpeg';
import { useGetStockQuery } from "@/app/api";

interface StockData {
  data: Stock[]
}

interface Stock {
  id?: string;
  name: string;
  price: number;
  description: string;
  coverPhoto:{
    url: string;
  } 
}

const Store = () => {
  const { data, isLoading } = useGetStockQuery<StockData[] | any | undefined>(undefined);
  return (
    <div className="min-h-screen bg-gray-100 lg:px-4 sm:px-6 lg:px-8 py-24">
      <motion.section 
        className='h-60 flex items-center mb-12 overflow-hidden' 
        style={{backgroundImage: `url(${BG})`, backgroundSize: 'cover'}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className='slant w-7/12 bg-black bg-opacity-50 h-full flex items-center lg:px-40 text-white'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <header className="text-center p-2">
            <motion.h1 
              className="text-lg lg:text-4xl font-bold mb-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Our Latest Collections
            </motion.h1>
          </header>
        </motion.div>
      </motion.section>

      <motion.div 
        className="container mx-auto mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="flex gap-4 px-4 overflow-x-auto pb-2">
          {['All', 'Electronics', 'Accessories', 'Clothing'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
            >
              <Button
                variant="outline"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {data?.data?.map((product: any, index: number) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <motion.img
                  src={product.coverPhoto?.url}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{product?.name}</h2>
                  <span className="text-lg font-bold text-blue-600">${Number(product?.price).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product?.category}</p>
                <p className="text-base text-gray-700">{product?.description}</p>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button className="w-full gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Store;