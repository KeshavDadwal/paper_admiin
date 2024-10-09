import React, { memo, useCallback, useState, useMemo, useEffect } from 'react';
import { useRouter } from "next/router";
import swal from 'sweetalert';

const ViewBtn = ({ description = "" }) => {
    const router = useRouter();
    
    const openAlert = useCallback(() => {
            swal("Description", description);
    }, [description]);
   
   return <>
        <button type="button" onClick={openAlert} className="btn btn-success btn-circle btn-sm mr-2">
            <i className="fas fa-eye"></i>
        </button>
    </>;
}

export default memo(ViewBtn);