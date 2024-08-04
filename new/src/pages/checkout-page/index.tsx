import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const CheckoutPage = () => {
    const [checkoutCart, setCheckoutCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('checkoutCart') || '[]');
        setCheckoutCart(cart);
    }, []);

    const sendOrderEmail = () => {
        const orderDetails = checkoutCart.map(item => {
            return `- Sản phẩm: ${item.name}, Giá: $${item.price.toFixed(2)}, Số lượng: ${quantity}, Tổng: $${(item.price * quantity).toFixed(2)}`;
        }).join('\n');

        const templateParams = {
            fullName: fullName,
            address: address,
            phone: phone,
            email: email,
            orderDetails: orderDetails,
            totalPrice: totalPrice.toFixed(2),
        };

        return emailjs.send('service_5zetzyl', 'template_t6e3yrf', templateParams, 'egjla0IuXJ2DQCfv2');
    };

    const clearCart = async () => {
        try {
            await sendOrderEmail();
            alert("Bạn đã order thành công");
            setCheckoutCart([]);
            localStorage.removeItem('checkoutCart');
            navigate('/');
        } catch (error) {
            console.error('Failed to send email:', error);
            alert("Có lỗi xảy ra khi gửi email xác nhận. Vui lòng thử lại.");
        }
    };

    const totalPrice = checkoutCart.reduce((total, item) => total + item.price * quantity, 0);

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Billing details</h1>
                    <form action="#">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <div className="form-item">
                                    <label className="form-label my-3">Full Name<sup>*</sup></label>
                                    <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Address <sup>*</sup></label>
                                    <input type="text" className="form-control" placeholder="House Number Street Name" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Mobile<sup>*</sup></label>
                                    <input type="tel" className="form-control" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Email Address<sup>*</sup></label>
                                    <input type="email" className="form-control" placeholder="gmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-check my-3">
                                    <input className="form-check-input" type="checkbox" id="Address-1" name="Address" value="Address" />
                                    <label className="form-check-label" htmlFor="Address-1">Ship to a different address?</label>
                                </div>
                                <div className="form-item">
                                    <textarea name="text" className="form-control" spellCheck="false" cols={30} rows={11} placeholder="Order Notes (Optional)"></textarea>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Products</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {checkoutCart.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center mt-2">
                                                            <img src={item.image} className="img-fluid rounded-circle" style={{ width: "90px", height: "90px" }} alt="" />
                                                        </div>
                                                    </td>
                                                    <td className="py-5">{item.name}</td>
                                                    <td className="py-5">${item.price.toFixed(2)}</td>
                                                    <td className="py-5">{quantity}</td>
                                                    <td className="py-5">${(item.price * quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark py-4">Shipping</p>
                                                </td>
                                                <td className="py-5">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping-1" value="Shipping" />
                                                        <label className="form-check-label" htmlFor="Shipping-1">Free Shipping</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                                </td>
                                                <td className="py-5"></td>
                                                <td className="py-5"></td>
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">${totalPrice.toFixed(2)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input type="checkbox" className="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" value="Delivery" />
                                            <label className="form-check-label" htmlFor="Delivery-1">Cash On Delivery</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input type="checkbox" className="form-check-input bg-primary border-0" id="Paypal-1" name="Paypal" value="Paypal" />
                                            <label className="form-check-label" htmlFor="Paypal-1">Paypal</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                    <button type="button" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary" onClick={clearCart}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
