import { motion } from "motion/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import BG from '@/public/gallery/gallery4.jpeg';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    description: 'Feature-rich smartwatch with health tracking and notifications.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Water-resistant backpack with dedicated laptop compartment.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Water-resistant backpack with dedicated laptop compartment.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Accessories'
  },
  {
    id: 5,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Water-resistant backpack with dedicated laptop compartment.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Accessories'
  },
  {
    id: 6,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Water-resistant backpack with dedicated laptop compartment.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Accessories'
  },
  {
    id: 7,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Water-resistant backpack with dedicated laptop compartment.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Accessories'
  },
  {
    id: 8,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Water-resistant backpack with dedicated laptop compartment.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Accessories'
  },
  {
    id: 9,
    name: 'Laptop Backpack',
    price: 79.99,
    description: 'Water-resistant backpack with dedicated laptop compartment.',
    imageUrl: 'https://imgs.search.brave.com/UZr3dQpJ2-uxH6UrX7zyV4KKzUq48gHuTUZIggptygA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXNp/Z25zaGFjay5uZXQv/d3AtY29udGVudC91/cGxvYWRzL3BsYWNl/a2l0dGVuLmpwZw',
    category: 'Accessories'
  },
  

];

const Store = () => {
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
        {products.map((product, index) => (
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
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-base text-gray-700">{product.description}</p>
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