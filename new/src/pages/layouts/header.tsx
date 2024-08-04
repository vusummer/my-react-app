import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderLayout = () => {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("token"));
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const fixedTop = document.querySelector('.fixed-top');
            if (window.innerWidth < 992) {
                if (window.pageYOffset > 55) {
                    fixedTop?.classList.add('shadow');
                } else {
                    fixedTop?.classList.remove('shadow');
                }
            } else {
                if (window.pageYOffset > 55) {
                    fixedTop?.classList.add('shadow');
                    fixedTop.style.top = '-55px';
                } else {
                    fixedTop?.classList.remove('shadow');
                    fixedTop.style.top = '0';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
        navigate("/login", { replace: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/product?search=${searchKeyword}`);
    };

    return (
        <>
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tìm kiếm từ khóa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <form className="input-group w-75 mx-auto d-flex" onSubmit={handleSearch}>
                                <input 
                                    type="search" 
                                    className="form-control p-3" 
                                    placeholder="Từ khóa" 
                                    aria-describedby="search-icon-1"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <button type="submit" className="input-group-text p-3" id="search-icon-1">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid fixed-top">
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" className="text-white">160 Đ.Song Hành ,Quận 12</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href="#" className="text-white">hero0979144@gmail.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Chính sách Bảo Mật</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Điều khoản sử dụng</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Bán hàng và hoàn tiền</small></a>
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <Link to={'/'} className="navbar-brand"><h1 className="text-primary display-6">May-oh</h1></Link>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <Link to={'/'} className="nav-item nav-link active">Trang Chủ</Link>
                                <Link to={'/product'} className="nav-item nav-link">Cửa Hàng</Link>
                                <Link to={'/contact'} className="nav-item nav-link">Liên Hệ</Link>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" type="button" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>
                                <a href="cart" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x"></i>
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: "-5px", left: "15px", height: "20px", minWidth: "20px" }}>3</span>
                                </a>
                                {authenticated ? (
                                    <div className="dropdown">
                                        <a className="my-auto dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fas fa-user fa-2x"></i>
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Đăng xuất</a></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <a className="my-auto" href='login'>
                                        <i className="fas fa-user fa-2x"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default HeaderLayout;
