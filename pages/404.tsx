function PageNotFound() {

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid"></div>
                <section className="content">
                    <div className="error-page">
                        <div className="error-content">
                            <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}

export default PageNotFound;