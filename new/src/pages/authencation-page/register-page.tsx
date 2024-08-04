import React, { useState } from 'react';
import { postRegister } from '../../services/authencation';
import { RegisterDto } from '../../models/authencation-model/register';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [terms, setTerms] = useState(false);

    // Trạng thái lỗi của từng trường dữ liệu
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [fullNameError, setFullNameError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra và cập nhật lỗi cho từng trường dữ liệu
        validateEmail(email);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);
        validateFullName(fullName);

        // Kiểm tra tổng quan các trường dữ liệu có lỗi hay không
        if (!terms) {
            alert('Bạn phải đồng ý với chính sách bảo mật và điều khoản.');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        const registerData: RegisterDto = {
            email,
            password,
            confirmPassword,
            fullName,
        };

        const result = await postRegister('Register', registerData);
        if (result) {
            alert('Đăng ký thành công!');
            // Thêm logic chuyển hướng hoặc xử lý sau khi đăng ký thành công
        }
    };

    // Hàm kiểm tra email
    const validateEmail = (value: string) => {
        setEmailError('');

        // Kiểm tra điều kiện và cập nhật thông báo lỗi nếu có
        if (!value) {
            setEmailError('Email không được để trống.');
        } else if (!isValidEmail(value)) {
            setEmailError('Email không hợp lệ.');
        }
    };

    // Hàm kiểm tra mật khẩu
    const validatePassword = (value: string) => {
        // Xóa thông báo lỗi cũ
        setPasswordError('');

        // Kiểm tra điều kiện và cập nhật thông báo lỗi nếu có
        // Các điều kiện kiểm tra mật khẩu có thể thay đổi tùy theo yêu cầu cụ thể
        if (!value) {
            setPasswordError('Mật khẩu không được để trống.');
        } else if (value.length < 6) {
            setPasswordError('Mật khẩu phải chứa ít nhất 6 ký tự.');
        } else if (!containsUppercase(value)) {
            setPasswordError('Mật khẩu phải chứa ít nhất một chữ hoa.');
        }
    };

    // Hàm kiểm tra xác nhận mật khẩu
    const validateConfirmPassword = (value: string) => {
        // Xóa thông báo lỗi cũ
        setConfirmPasswordError('');

        // Kiểm tra điều kiện và cập nhật thông báo lỗi nếu có
        if (!value) {
            setConfirmPasswordError('Xác nhận mật khẩu không được để trống.');
        }
    };

    // Hàm kiểm tra họ tên
    const validateFullName = (value: string) => {
        // Xóa thông báo lỗi cũ
        setFullNameError('');
        // Kiểm tra điều kiện và cập nhật thông báo lỗi nếu có
        if (!value) {
            setFullNameError('Họ tên không được để trống.');
        }
    };

    // Hàm kiểm tra email hợp lệ
    const isValidEmail = (email: string) => {
        // Thực hiện kiểm tra email bằng biểu thức chính quy hoặc các phương pháp khác
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Hàm kiểm tra có chứa chữ hoa trong mật khẩu
    const containsUppercase = (str: string) => {
        return /[A-Z]/.test(str);
    };

    return (
        <div className="container-fluid contact py-5 mt-5">
            <div className="authentication-wrapper authentication-basic container py-5 mt-5 w-50">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            {/* Phần form đăng ký */}
                            <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                                {/* Phần input và label cho họ tên */}
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                    {/* Hiển thị thông báo lỗi */}
                                    {fullNameError &&
                                        <div className="text-danger">{fullNameError}</div>}
                                </div>
                                {/* Phần input và label cho email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {/* Hiển thị thông báo lỗi */}
                                    {emailError && <div className="text-danger">{emailError}</div>}
                                </div>
                                {/* Phần input và label cho mật khẩu */}
                                <div className="mb-3 form-password-toggle">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                            aria-describedby="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                    </div>
                                    {/* Hiển thị thông báo lỗi */}
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                </div>
                                {/* Phần input và label cho xác nhận mật khẩu */}
                                <div className="mb-3 form-password-toggle">
                                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className="form-control"
                                            name="confirmPassword"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                            aria-describedby="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                    </div>
                                    {/* Hiển thị thông báo lỗi */}
                                    {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
                                </div>
                                {/* Phần checkbox đồng ý điều khoản */}
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="terms-conditions"
                                            name="terms"
                                            checked={terms}
                                            onChange={(e) => setTerms(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="terms-conditions">
                                            I agree to
                                            <a href="javascript:void(0);"> privacy policy & terms</a>
                                        </label>
                                    </div>
                                </div>
                                {/* Nút đăng ký */}
                                <button className="btn btn-primary d-grid w-100" type="submit">Sign up</button>
                            </form>

                            {/* Phần đăng nhập */}
                            <p className="text-center">
                                <span>Already have an account?</span>
                                <a href="login">
                                    <span>Sign in instead</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
