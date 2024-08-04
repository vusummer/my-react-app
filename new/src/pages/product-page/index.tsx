import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/product';
import { ProductDto } from '../../models/product';
import { Link ,useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagnation';
import Notification from '../../components/notification';

const ProductPage = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [notification, setNotification] = useState<string | null>(null);
    const location = useLocation();
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const addToCart = (product: ProductDto) => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        setNotification('Product added to cart');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await getAllProducts('Product');
                setProducts(allProducts);
            } catch (err) {
                setError('Error fetching all products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const timem = new URLSearchParams(location.search).get('search') || '';

    // Lọc sản phẩm theo từ khóa tìm kiếm và danh mục
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase() || timem.toLowerCase()) &&
        (selectedCategory === '' || product.categoryName === selectedCategory)
    );

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
       <>
         {notification && <Notification message={notification} />}
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <h1 className="mb-4">Fresh fruits shop</h1>
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <div className="input-group w-100 mx-auto d-flex">
                                    <input 
                                        type="search" 
                                        className="form-control p-3" 
                                        placeholder="keywords" 
                                        aria-describedby="search-icon-1" 
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                    />
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                </div>
                            </div>
                            <div className="col-6"></div>
                            <div className="col-xl-3">
                                <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                    <label htmlFor="fruits">Default Sorting:</label>
                                    <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                        <option value="volvo">Nothing</option>
                                        <option value="saab">Popularity</option>
                                        <option value="opel">Organic</option>
                                        <option value="audi">Fantastic</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>Categories</h4>
                                            <ul className="list-unstyled fruite-categorie">
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={() => setSelectedCategory('')}><i className="fas fa-apple-alt me-2"></i>All</a>
                                                        <span>(10)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={() => setSelectedCategory('Gà')}><i className="fas fa-apple-alt me-2"></i>Gà</a>
                                                        <span>(5)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={() => setSelectedCategory('Bò')}><i className="fas fa-apple-alt me-2"></i>Thịt</a>
                                                        <span>(2)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={() => setSelectedCategory('Cơm')}><i className="fas fa-apple-alt me-2"></i>Cơm</a>
                                                        <span>(8)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={() => setSelectedCategory('Nước')}><i className="fas fa-apple-alt me-2"></i>Món Nước</a>
                                                        <span>(5)</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row g-4 justify-content-center">
                                    {currentProducts.map(product => (
                                        <div key={product.id} className="col-md-6 col-lg-6 col-xl-4">
                                            <div className="rounded position-relative fruite-item">
                                                <Link to={`/product/${product.id}`}>
                                                    <div className="fruite-img">
                                                        <img src={product.image} className="img-fluid w-100 rounded-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
                                                    </div>
                                                </Link>
                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                    <h4>{product.name}</h4>
                                                    <p>{product.description}</p>
                                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                                        <p className="text-dark fs-5 fw-bold mb-0">${product.price.toFixed(2)}</p>
                                                        <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => addToCart(product)}>
                                                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="col-12">
                                        <Pagination
                                            itemsPerPage={productsPerPage}
                                            totalItems={filteredProducts.length}
                                            paginate={paginate}
                                            currentPage={currentPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </>
    );
};

export default ProductPage;
