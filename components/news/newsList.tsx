import { memo, useCallback, useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import moment from 'moment-timezone';
import AORStorage from '../../apis/AORStorage';
import Utils from '../util/Utils';
import { useDispatch } from 'react-redux';
import { updateUsersUIConstraintsData } from '../../redux/users/Action';
import { USERS_LOADING } from '../../redux/Types';
import { useRouter, NextRouter } from 'next/router';

const PostList = () => {
    const dispatch = useDispatch();
    const router: NextRouter = useRouter();
    const [shortPosts, setShortPosts] = useState<any[]>([]);
    const [longPosts, setLongPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAllShort, setShowAllShort] = useState(false);
    const [showAllLong, setShowAllLong] = useState(false);
    const [loadingData, setLoadingData] = useState(false); 
    const pathname: string = router.pathname; 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        setLoadingData(true); 

        try {
            setLoading(true);

            const { shortPosts, longPosts } = await getPosts();

            setShortPosts(shortPosts);
            setLongPosts(longPosts);
            setLoading(false);
            dispatch(updateUsersUIConstraintsData({
                [USERS_LOADING]: false
            }));
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoadingData(false);
        }
    }, []);

    const getPosts = async () => {
        const value = await AORStorage.getAORLoginData();
        const userData = value && value.response && value.response.token ? value.response : undefined;

        const db = Utils.getFirestoreDB();
        const queryRef = query(collection(db, "Posts"));
        const querySnapshot = await getDocs(queryRef);

        const posts: any[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push(data);
        });
        posts.sort((a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf());

        const shortPosts = posts.filter(post => post.type === 'short');
        const longPosts = posts.filter(post => post.type === 'long');

        return { shortPosts, longPosts };
    };

    const renderPosts = (posts: any[]) => {
        return posts.map(post => (
            <div key={post.id} style={getPostCardStyle(post.type)}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                        <h5>{post.title}</h5>
                        <p style={{ fontSize: '14px' }}>{post.article}</p>
                    </div>
                    <div style={{ display: 'flow', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <p style={{ fontSize: '15px', backgroundColor: "#c4c4c4", width: "fit-content", padding: "2px", borderRadius: "2px" }}>{post.categories}</p>
                        <p style={{}}>{moment(post.created_at).format("MMMM-DD-YYYY")}</p>
                    </div>
                </div>
            </div>
        ));
    };
    
    const getPostCardStyle = (postType: string) => {
        if (postType === 'long') {
            return { ...postCardStyle, width: '100%' };
        }
        return postCardStyle;
    };

    const handleShowAllShort = () => {
        setShowAllShort(true);
        router.push({
            pathname: '/viewAll',
            query: { type: 'short' } 
        });
    };
    
    const handleShowAllLong = () => {
        setShowAllLong(true);
        router.push({
            pathname: '/viewAll',
            query: { type: 'long' } 
        });
    };

    const getLinkClass = useCallback((pagePath: string) => {
        return pathname === pagePath ? "active" : "";
    }, [pathname]);

    return (
        <div>
            {loadingData && (
                <div className="loading-container">
                    <p className="loading-text">Loading...</p>
                </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h4><b>Short Posts</b></h4>
                {shortPosts.length > 6 && <button className="viewAll" onClick={handleShowAllShort}>View All</button>}
            </div>

            <div style={postContainerStyle}>
                {!showAllShort ?
                    <>
                        {renderPosts(shortPosts.slice(0, 6))}
                    </>
                    :
                    renderPosts(shortPosts)
                }
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:"3rem" }}>
            <h4><b>Long Posts</b></h4>
                {longPosts.length > 4 && <button className="viewAll" onClick={handleShowAllLong}>View All</button>}
            </div>

            <div style={postContainerStyle}>
                {!showAllLong ?
                    <>
                        {renderPosts(longPosts.slice(0, 4))}
                    </>
                    :
                    renderPosts(longPosts)
                }
            </div>
        </div>
    );
};

const postCardStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: 'calc(33.33% - 20px)',
    boxSizing: 'border-box',
};

const postContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
};

export default memo(PostList);
