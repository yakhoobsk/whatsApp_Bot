import React, { useEffect, useState } from "react";
import { Pagination } from "antd";

interface PaginationProps {
    totalRecords: number;
    onChange: (page: number, limit: number) => void;
}

const AppPagination: React.FC<PaginationProps> = ({ totalRecords, onChange }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const url = new URL(window.location.href);

        const pageParam = parseInt(url.searchParams.get("page") || "1", 10);

        setPage(pageParam);
    }, []);

    const handleChange = (newPage: number, newLimit: number) => {
        const url = new URL(window.location.href);

        url.searchParams.set("page", newPage.toString());

        window.history.pushState({}, "", url);

        setPage(newPage);
        setLimit(newLimit);

        onChange(newPage, newLimit);
    };

    return (
        <Pagination
            current={page}
            pageSize={limit}
            total={totalRecords}
            showSizeChanger={false}
            onChange={handleChange}
            onShowSizeChange={handleChange}
        />
    );
};

export default AppPagination;