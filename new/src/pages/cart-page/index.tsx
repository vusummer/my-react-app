import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * quantity, 0);

  const handleCheckout = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      localStorage.setItem('checkoutCart', JSON.stringify(cartItems));
      navigate('/checkout');
    }, 3000); // Thông báo sẽ biến mất sau 3 giây và chuyển về trang chủ
    clearCart()
  };

  return (
    <>
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          {showSuccessMessage && (
            <div className="alert alert-success text-center" role="alert">
              Thanh toán thành công!
            </div>
          )}
          {cartItems.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              Giỏ hàng của bạn đang trống.
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Tên</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Tổng cộng</th>
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              className="img-fluid me-5 rounded-circle"
                              style={{ width: "80px", height: "80px" }}
                              alt={item.name}
                            />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4">{item.name}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">${item.price.toFixed(2)}</p>
                        </td>
                        <td>
                          <div className="input-group quantity mt-4" style={{ width: "100px" }}>
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                onClick={handleDecrease}
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center border-0"
                              value={quantity}
                              readOnly
                            />
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                onClick={handleIncrease}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">${(item.price * quantity).toFixed(2)}</p>
                        </td>
                        <td>
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4"
                            onClick={() => removeFromCart(index)}
                          >
                            <i className="fa fa-times text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  className="border-0 border-bottom rounded me-5 py-3 mb-4"
                  placeholder="Mã giảm giá"
                />
                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">
                  Áp dụng mã
                </button>
              </div>
              <div className="row g-4 justify-content-end">
                <div className="col-8"></div>
                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                  <div className="bg-light rounded">
                    <div className="p-4">
                      <h1 className="display-6 mb-4">Tổng <span className="fw-normal">Giỏ hàng</span></h1>
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="mb-0 me-4">Tạm tính:</h5>
                        <p className="mb-0">${totalPrice.toFixed(2)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-0 me-4">Phí vận chuyển</h5>
                        <div>
                          <p className="mb-0">Giá cố định: $3.00</p>
                        </div>
                      </div>
                      <p className="mb-0 text-end">Giao hàng đến Việt Nam.</p>
                    </div>
                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                      <h5 className="mb-0 ps-4 me-4">Tổng cộng</h5>
                      <p className="mb-0 pe-4">${(totalPrice + 3).toFixed(2)}</p>
                    </div>
                    {/* <button 
                      className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" 
                      type="button"
                      onClick={handleCheckout}
                    >
                      Thanh toán
                    </button> */}
                    <Link to={{ pathname: '/checkout', state: { cartItems: cartItems } }}>
                      <button onClick={handleCheckout} className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                        type="button">Thanh toán</button>
                    </Link>
                    <button
                      className="btn border-secondary rounded-pill px-4 py-3 text-danger text-uppercase mb-4 ms-4"
                      type="button"
                      onClick={clearCart}
                    >
                      Xóa giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
