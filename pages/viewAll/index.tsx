import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import AORStorage from '../../apis/AORStorage';
import Utils from '../../components/util/Utils';
import moment from 'moment-timezone';

interface Post {
    id: string;
    title: string;
    content: string;
    type: string;
    article: string;
    categories: any;
    created_at: any;
}

const ViewAll = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const postsPerPage = 10;
    const { type } = router.query;

    useEffect(() => {
        fetchData();
    }, [type]);

    const openUrl = useCallback((path: string) => {
        if (!path) return;

        router.push(path);
    }, []);

    const fetchData = async () => {
        setLoadingData(true);

        try {
            if (type && (type === 'short' || type === 'long')) {
                const response = await fetchPostsByType(type);
                setPosts(response);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        filterPosts(searchQuery);
    }, [searchQuery, posts]);

    const fetchPostsByType = async (type: string): Promise<Post[]> => {
        try {
            const value = await AORStorage.getAORLoginData();
            const userData = value && value.response && value.response.token ? value.response : undefined;

            const db = Utils.getFirestoreDB();
            const q = query(collection(db, "Posts"), where('type', '==', type));
            const querySnapshot = await getDocs(q);

            const posts: Post[] = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() } as Post);
            });

            posts.sort((a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf());

            return posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filterPosts = (query: string) => {
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            (typeof post.categories === 'string' && post.categories.toLowerCase().includes(query.toLowerCase()))
        );
        setFilteredPosts(filteredPosts);
    };

    const setCurrentPageAndScrollTop = (pageNumber: number) => {
        window.scrollTo(0, 0);
        setCurrentPage(pageNumber);
    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchQuery ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost) : posts.slice(indexOfFirstPost, indexOfLastPost);

    // Pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil((searchQuery ? filteredPosts.length : posts.length) / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Calculate start and end page numbers for pagination
    const maxPageNumbers = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(startPage + maxPageNumbers - 1, Math.ceil((searchQuery ? filteredPosts.length : posts.length) / postsPerPage));

    if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    return (
        <div>
            {loadingData && (
                <div className="loading-container">
                    <p className="loading-text">Loading...</p>
                </div>
            )}

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-7">
                                <div>
                                    <input className="searchBox"
                                        type="text"
                                        placeholder="Search post"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a className={"blossom-admin-cursor"} onClick={openUrl.bind(ViewAll, "/")}>Dashboard</a></li>
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
                                <h4><b>All {type === 'short' ? 'Short' : 'Long'} Posts</b></h4>
                                <hr />
                                <div className="posts-list">
                                    {currentPosts.map((post, index) => (
                                        <div key={index} className="post">
                                            {post.type === 'long' ? (
                                                <>
                                                    <h3>{post.title}</h3>
                                                    <p>{post.content}</p>
                                                    <p>{post.article}</p>
                                                    <p style={{ fontSize: '15px', backgroundColor: "#c4c4c4", width: "fit-content", padding: "2px", borderRadius: "2px" }}>{post.categories}</p>
                                                    <p>{moment(post.created_at).format("MMMM-DD-YYYY")}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <h3>{post.title}</h3>
                                                    <p>{post.content}</p>
                                                    <p style={{ fontSize: '15px', backgroundColor: "#c4c4c4", width: "fit-content", padding: "2px", borderRadius: "2px" }}>{post.categories}</p>
                                                    <p>{moment(post.created_at).format("MMMM-DD-YYYY")}</p>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                <ul className="pagination">
                                    {startPage !== 1 && (
                                        <li className="page-item">
                                            <button onClick={() => setCurrentPageAndScrollTop(1)} className="page-link">
                                                1
                                            </button>
                                        </li>
                                    )}
                                    {startPage !== 1 && (
                                        <li className="page-item disabled">
                                            <button className="page-link">...</button>
                                        </li>
                                    )}
                                    {pageNumbers.slice(startPage - 1, endPage).map((number) => (
                                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                            <button onClick={() => setCurrentPageAndScrollTop(number)} className="page-link">
                                                {number}
                                            </button>
                                        </li>
                                    ))}
                                    {endPage !== Math.ceil((searchQuery ? filteredPosts.length : posts.length) / postsPerPage) && (
                                        <li className="page-item disabled">
                                            <button className="page-link">...</button>
                                        </li>
                                    )}
                                    {endPage !== Math.ceil((searchQuery ? filteredPosts.length : posts.length) / postsPerPage) && (
                                        <li className="page-item">
                                            <button onClick={() => setCurrentPageAndScrollTop(Math.ceil((searchQuery ? filteredPosts.length : posts.length) / postsPerPage))} className="page-link">
                                                {Math.ceil((searchQuery ? filteredPosts.length : posts.length) / postsPerPage)}
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ViewAll;
