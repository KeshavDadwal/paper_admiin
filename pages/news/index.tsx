import { authRoute } from "../../components/base_components";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";
import { NewsList } from "../../components/news";

function news() {
    const router = useRouter();

    const openUrl = useCallback((path: string) => {
        if(!path) return;

        router.push(path);
    }, []);
    
    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a className={"blossom-admin-cursor"} onClick={openUrl.bind(news, "/")}>Dashboard</a></li>
                                    <li className="breadcrumb-item active">Post</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">

                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <NewsList />
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default memo(authRoute(news));