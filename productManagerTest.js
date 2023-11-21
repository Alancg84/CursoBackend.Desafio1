class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    // Verificar si el código ya existe
    if (this.products.some(product => product.code === code)) {
      throw new Error('El código del producto ya está en uso.');
    }

    // Generar un id único
    const id = this.generateUniqueId();

    // Crear el objeto producto
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    // Agregar el producto al array de productos
    this.products.push(newProduct);

    // Devolver el objeto producto creado
    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);

    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    return product;
  }

  generateUniqueId() {
    // Esta función podría ser más sofisticada en una implementación real
    return Date.now(); 
  }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Obtener productos (debería devolver [])
console.log(productManager.getProducts());

// Agregar un producto
const newProduct = productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
});

// Obtener productos nuevamente (debería devolver el producto recién agregado)
console.log(productManager.getProducts());

// Intentar agregar un producto con el mismo código (debería arrojar un error)
try {
  productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
  });
} catch (error) {
  console.error(error.message);
}

// Obtener un producto por id (debería devolver el producto recién agregado)
console.log(productManager.getProductById(newProduct.id));

// Intentar obtener un producto con un id inexistente (debería arrojar un error)
try {
  productManager.getProductById(123);
} catch (error) {
  console.error(error.message);
}
