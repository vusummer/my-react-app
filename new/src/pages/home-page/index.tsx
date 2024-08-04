import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../services/category';
import { getAllProducts } from '../../services/product';
import { ProductDto } from '../../models/product';
import { CategoryDto } from '../../models/category';
import { Link } from 'react-router-dom';
import Notification from '../../components/notification';

const HomePage = () => {
  const locale = 'vn';
  const [today, setDate] = useState(new Date());
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: 'long',
  })}\n\n`;

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await getAllCategories('Category');
        setCategories(categoriesData);
      } catch (error) {
        setError('Error fetching categories');
      }
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsData = await getAllProducts('Product');
        setProducts(productsData);
      } catch (error) {
        setError('Error fetching products');
      }
    };

    fetchProductsData();
  }, []);

  const filterProductsByCategory = (categoryId: number | null) => {
    return categoryId
      ? products.filter((product) => product.categoryId === categoryId)
      : products.slice(0, 4);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const addToCart = (product: ProductDto) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setNotification('Product added to cart');
  };

  return (
    <>
      {notification && <Notification message={notification} />}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
              <h1 className="mb-5 display-3 text-primary">
                Thèm Món Gì <br />- Đặt Món Đó
              </h1>
              <div className="position-relative mx-auto">
                <input
                  className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                  type="text"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                  style={{ top: '0px', right: '25%' }}
                >
                  Submit Now
                </button>
              </div>
            </div>
            <div className="col-md-12 col-lg-5">
              <div
                id="carouselId"
                className="carousel slide position-relative"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active rounded">
                    <img
                      src="img/hero-img-1.png"
                      className="img-fluid w-100 h-100 bg-secondary rounded"
                      alt="First slide"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      Giải khát
                    </a>
                  </div>
                  <div className="carousel-item rounded">
                    <img
                      src="img/hero-img-2.jpg"
                      className="img-fluid w-100 rounded"
                      alt="Second slide"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      Đồ ăn nhanh
                    </a>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container pt-1">
        <h2>Món ăn ưu đãi trong ngày hôm nay {date}</h2>
      </section>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Món Ăn Trong Ngày</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-light rounded-pill active"
                      data-bs-toggle="pill"
                      href="#tab-all"
                      onClick={() => handleCategorySelect(null)}
                    >
                      <span className="text-dark" style={{ width: '130px' }}>
                        All Products
                      </span>
                    </a>
                  </li>
                  {categories && categories.map((category) => (
                    <li className="nav-item" key={category.id}>
                      <a
                        className="d-flex py-2 m-2 bg-light rounded-pill"
                        data-bs-toggle="pill"
                        href={`#tab-${category.id}`}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <span className="text-dark" style={{ width: '130px' }}>
                          {category.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {filterProductsByCategory(selectedCategory).map((product) => (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={product.id}>
                      <div className="product-item">
                        <div className="position-relative bg-light overflow-hidden">
                          <img
                            className="img-fluid w-100"
                            src={product.image}
                            alt=""
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                            New
                          </div>
                        </div>
                        <div className="text-center p-4">
                          <a className="d-block h5 mb-2" href="">
                            {product.name}
                          </a>
                          <span className="text-primary me-1">
                            ${product.price}
                          </span>
                          <span className="text-body text-decoration-line-through">
                            $29.00
                          </span>
                        </div>
                        <div className="d-flex border-top">
                          <small className="w-50 text-center border-end py-2">
                            <Link className="text-body" to={`/product/${product.id}`}>
                              <i className="fa fa-eye text-primary me-2"></i>View
                              detail
                            </Link>
                          </small>
                          <small className="w-50 text-center py-2">
                            <a
                              className="text-body"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                              }}
                            >
                              <i className="fa fa-shopping-bag text-primary me-2"></i>
                              Add to cart
                            </a>
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
