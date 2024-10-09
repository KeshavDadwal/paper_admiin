import React, { memo, useCallback, useState, useMemo, useEffect } from 'react';
import { useRouter } from "next/router";

const ViewBtn = ({ user_id = "" }) => {
    const router = useRouter();
    const open_url = useCallback((path: string) => {
            if(!path) return;

            router.push(path);
    }, []);
   
   return <>
        <button type="button" onClick={open_url.bind(this, `/user/${user_id}`)} className="btn btn-success btn-circle btn-sm mr-2">
            <i className="fas fa-eye"></i>
        </button>
    </>;
}

export default memo(ViewBtn);