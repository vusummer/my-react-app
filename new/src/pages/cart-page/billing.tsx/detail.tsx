const DetailBilling = () => {

    return (
        <>
        <div className="py-5 mt-5">
            <div className="row container py-5 mt-5" >
                <div className="col-xl">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">OderDetail</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                                    <input type="text" className="form-control" id="basic-default-fullname" placeholder="John Doe" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-company">Status</label>
                                    <input type="text" className="form-control" id="basic-default-company" readOnly/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-email">Email</label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            type="text"
                                            id="basic-default-email"
                                            className="form-control"
                                            placeholder="john.doe"
                                            aria-label="john.doe"
                                            aria-describedby="basic-default-email2"
                                        />
                                        <span className="input-group-text" id="basic-default-email2">@example.com</span>
                                    </div>
                                    <div className="form-text">You can use letters, numbers & periods</div>
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label" htmlFor="basic-default-message">Message</label>
                                    <textarea
                                        id="basic-default-message"
                                        className="form-control"
                                        placeholder="Hi, Do you have a moment to talk Joe?"
                                    ></textarea>
                                </div> */}
                                <button type="submit" className="btn btn-primary">Back</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-xl">
                <div className="">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                <tr>
                                    <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>Angular Project</strong></td>
                                    <td>Albert Cook</td>
                                    <td><span className="badge bg-label-primary me-1">Active</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default DetailBilling;