import { authRoute } from "../../components/base_components";
import { UsersList } from "../../components/users";
import { Head } from "next/document";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";

function Users() {
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
                                    <li className="breadcrumb-item"><a className={"blossom-admin-cursor"} onClick={openUrl.bind(Users, "/")}>Dashboard</a></li>
                                    <li className="breadcrumb-item active">Users</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">

                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <UsersList />
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default memo(authRoute(Users));