import { useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Kiểm tra form.current
        if (form.current) {
            console.log('Form is ready to be sent:', form.current);

            emailjs.sendForm('service_5zetzyl', 'template_3nk910t', form.current, 'egjla0IuXJ2DQCfv2')
                .then((result) => {
                    console.log(result.text);
                    alert('Email đã được gửi thành công!');
                }, (error) => {
                    console.log(error.text);
                    alert('Gửi email thất bại. Vui lòng thử lại sau.');
                });
        } else {
            console.error('Form is not available.');
            alert('Form không khả dụng. Vui lòng kiểm tra lại.');
        }
    };

    return (
        <>
            <div className="container-fluid contact py-5 mt-5">
                <div className="container py-5 mt-5">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                                    <h1 className="text-primary">Liên lạc với chúng tôi</h1>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="h-100 rounded">
                                    <iframe
                                        title="Google Maps"
                                        className="rounded w-100"
                                        style={{ height: "400px" }}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3271232887635!2d106.62966351480063!3d10.823098760209921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f0b75e6e5e5%3A0x656b9867997e7b7f!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2sbd!4v1634259649153!5m2!1sen!2sbd"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <form ref={form} onSubmit={sendEmail}>
                                    <input type="text" name="user_name" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Name" required />
                                    <input type="email" name="user_email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email" required />
                                    <textarea name="message" className="w-100 form-control border-0 mb-4" rows={5} cols={10} placeholder="Your Message" required></textarea>
                                    <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary" type="submit">Submit</button>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2">123 Street New York.USA</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Mail Us</h4>
                                        <p className="mb-2">info@example.com</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Telephone</h4>
                                        <p className="mb-2">(+012) 3456 7890</p>
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

export default ContactPage;
