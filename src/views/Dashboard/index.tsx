import { useEffect, useState } from "react";
import {
    Layout,
    Typography,
    Space,
    Card,
    Statistic,
    Row,
    Col,
    Input,
    Table,
    Tag,
    Select,
    Tooltip,
    Button,
} from "antd";
import {
    LogoutOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AssistanceGet, DashboardGet, ProvidersGet, ProviderStatusUpdate } from "../../redux/services/dashboardServices";
import { LogoutUser } from "../../redux/services/authService";
import { useNavigate } from "react-router-dom";
import AppPagination from "../../components/AppPagination";
import logo from "../../assets/logocomany.png";

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const providers = useAppSelector((state) => state.providers?.providers);
    const dashboard = useAppSelector((state) => state.providers?.dashboard || {});
    const assistance = useAppSelector((state) => state.providers?.assistance || {});
    const [pagination, setPagination] = useState({ page: 1, limit: 5, });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [searchFilter, setSearchFilter] = useState("All");
    useEffect(() => {
        dispatch(DashboardGet({}));
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            search_by_filter: searchFilter,
            search: searchText
        }
        dispatch(AssistanceGet({ payload, paginations: pagination }));

    }, [dispatch, pagination, searchText, searchFilter]);

    const [dataSource, setDataSource] = useState([
        {
            key: 1,
            request_id: "REQ001",
            vehicle_id: "VH001",
            reported_registration: "KA01AB1234",
            live_latitude: "12.9716",
            live_longitude: "77.5946",
            issue_description: "Battery Issue",
            request_status: "Idle",
            updated_date: "2025-06-08",
            address: "Bangalore",
            provider_id: "",
        },
        {
            key: 2,
            request_id: "REQ002",
            vehicle_id: "VH002",
            reported_registration: "TS09CD5678",
            live_latitude: "17.3850",
            live_longitude: "78.4867",
            issue_description: "Tyre Puncture",
            request_status: "Busy",
            updated_date: "2025-06-08",
            address: "Hyderabad",
            provider_id: "Provider A",
        },
    ]);
    console.log(dataSource);

    const tableData =
        assistance?.[0]?.results?.map(
            (item: any, index: number) => ({
                key: index + 1,
                request_id: item.request_id,
                vehicle_id: item.vehicle_id,
                reported_registration:
                    item.reported_registration,
                live_latitude:
                    item.live_latitude,
                live_longitude:
                    item.live_longitude,
                issue_description:
                    item.issue_description,
                request_status:
                    item.request_status,
                updated_date:
                    item.updated_date,
                provider_id:
                    item.provider_id || "",
                Provider:
                    providers?.[0]?.find((p: any) => p.provider_id === item.provider_id)?.provider_name || item.provider_id || "-",
                address:
                    item.address || "-",
                uploaded_media_json:
                    item.uploaded_media_json,
                sla_target_minutes:
                    item.sla_target_minutes,
                sla_compliance_met:
                    item.sla_compliance_met,
            })
        ) || [];

    useEffect(() => {

        dispatch(ProvidersGet({}));
    }, [dispatch]);

    const handlePagination = async (page: number, limit: number) => {
        setPagination({ page, limit });
        try {
            await dispatch(
                AssistanceGet({
                    payload: {
                        search_by_filter: "All",
                        search: ""
                    },
                    paginations: { page, limit },
                })
            ).unwrap();
        } catch (err) {
            console.error("Pagination error:", err);
        }
    };
    const providerOptions = providers?.[0]?.map((provider: any) => {
        const isAvailable = String(provider.is_available).toLowerCase() === "true";

        return {
            label: (
                <span>
                    {provider.provider_name} {isAvailable ? "(Idle)" : "(Busy)"}
                </span>
            ),
            value: provider.provider_id,
            disabled: !isAvailable,
        };
    }) || [];

    const updateProvider = async (
        value: string,
        record: any
    ) => {
        setDataSource((prev) =>
            prev.map((item) =>
                item.key === record.key
                    ? {
                        ...item,
                        provider_id: value,
                    }
                    : item
            )
        );

        const selectedProvider = providers?.[0]?.find((p: any) => p.provider_id === value);
        const selectedIsAvailable = String(selectedProvider?.is_available).toLowerCase() === "true";

        if (selectedProvider && selectedIsAvailable) {
            const payload = {
                provider_id: selectedProvider.provider_id,
                provider_name: selectedProvider.provider_name,
                current_status: "busy",
                is_available: "false",
                request_id: record.request_id,
            };
            try {
                await dispatch(ProviderStatusUpdate(payload)).unwrap();
                dispatch(ProvidersGet({}));
                dispatch(
                    AssistanceGet({
                        payload: {
                            search_by_filter: searchFilter,
                            search: searchText,
                        },
                        paginations: pagination,
                    })
                );
            } catch (err) {
                console.error("Provider update failed:", err);
            }
        } else {
            console.warn("Provider cannot be assigned because is_available is not true.");
        }
    };
    const handleSearch = async () => {
        try {
            await dispatch(
                AssistanceGet({
                    payload: {
                        search_by_filter:
                            searchFilter,
                        search: searchText,
                    },
                    paginations: {
                        page: 1,
                        limit:
                            pagination.limit,
                    },
                })
            ).unwrap();

            setPagination((prev) => ({
                ...prev,
                page: 1,
            }));
        } catch (err) {
            console.error(
                "Search Error:",
                err
            );
        }
    };

    const columns = [
        {
            title: "Request ID",
            dataIndex: "request_id",
            width: 140,
            fixed: "left" as const,
        },
        {
            title: "Vehicle ID",
            dataIndex: "vehicle_id",
            width: 120,
        },
        {
            title: "Reported Registration",
            dataIndex: "reported_registration",
            width: 180,
        },
        {
            title: "Latitude",
            dataIndex: "live_latitude",
            width: 120,
        },
        {
            title: "Longitude",
            dataIndex: "live_longitude",
            width: 120,
        },
        {
            title: "Issue Description",
            dataIndex: "issue_description",
            width: 200,
        },
        {
            title: "Status",
            dataIndex: "request_status",
            width: 180,
            render: (status: string) => {
                const colorMap: any = {
                    "Case Created": "orange",
                    Assigned: "blue",
                    "In Progress": "cyan",
                    Completed: "green",
                    Cancelled: "red",
                };

                return (
                    <Tag color={colorMap[status] || "default"}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "Updated Date",
            dataIndex: "updated_date",
            width: 150,
        },
        {
            title: "Address",
            dataIndex: "address",
            width: 220,
        },
        {
            title: "Provider",
            dataIndex: "Provider",
            width: 150,
        },
        {
            title: "Provider",
            dataIndex: "provider_name",
            width: 220,
            render: (_: any, record: any) => {
                if (record.provider_id) {
                    const assignedProvider = providers?.[0]?.find((p: any) => p.provider_id === record.provider_id);
                    return <span>{assignedProvider?.provider_name || record.Provider || record.provider_name || record.provider_id}</span>;
                }

                return (
                    <Select
                        placeholder="Assign Provider"
                        style={{ width: "100%" }}
                        value={record.provider_id || undefined}
                        options={providerOptions}
                        onChange={(value) =>
                            updateProvider(
                                value,
                                record
                            )
                        }
                    />
                );
            },
        },
    ];

    const handleLogout = async () => {
        try {
            await dispatch(
                LogoutUser({})
            ).unwrap();
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem(
            "accessToken"
        );
        localStorage.removeItem(
            "persist:auth"
        );

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                background: "#F8FAFC",
            }}
        >
            <Header
                style={{
                    background: "#fff",
                    padding: "0 24px",
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    borderBottom:
                        "1px solid #E5E7EB",
                }}
            >
                <Space>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                    <Title
                        level={4}
                        style={{
                            margin: 0,
                        }}
                    >
                        WhatsApp Bot
                    </Title>
                </Space>

                <Space size={20}>


                    <Tooltip title="Logout" >
                        <Button
                            danger
                            type="primary"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                            style={{
                                height: 42,
                                borderRadius: 10,
                                fontWeight: 600,
                                padding: "0 18px",
                            }}
                        >
                            Logout
                        </Button>
                    </Tooltip>
                </Space>
            </Header>

            <Content
                style={{
                    padding: 24,
                }}
            >
                {/* Stats Cards */}

                <Row
                    gutter={[16, 16]}
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <Col xs={24} md={6}>
                        <Card
                            style={{
                                borderRadius: 20,
                            }}
                        >
                            <Statistic
                                title="Total Requests"
                                value={dashboard?.Total_Requests || 0}
                                valueStyle={{
                                    color:
                                        "#25D366",
                                }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} md={6}>
                        <Card
                            style={{
                                borderRadius: 20,
                            }}
                        >
                            <Statistic
                                title="Idle (providers)"
                                value={dashboard?.Idle_Providers || 0}
                                valueStyle={{
                                    color:
                                        "#FA8C16",
                                }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} md={6}>
                        <Card
                            style={{
                                borderRadius: 20,
                            }}
                        >
                            <Statistic
                                title="Busy (providers)"
                                value={dashboard?.Busy_providers || dashboard?.Busy_Providers || 0}
                                valueStyle={{
                                    color:
                                        "#1677FF",
                                }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} md={6}>
                        <Card
                            style={{
                                borderRadius: 20,
                            }}
                        >
                            <Statistic
                                title="Requests Completed"
                                value={dashboard?.Request_Completed || 0}
                                valueStyle={{
                                    color:
                                        "#52C41A",
                                }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Search Section */}

                <Card
                    style={{
                        marginBottom: 20,
                        borderRadius: 20,
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={5}>
                            <Select
                                size="large"
                                style={{ width: "100%" }}
                                value={searchFilter}
                                onChange={(value) =>
                                    setSearchFilter(value)
                                }
                                options={[
                                    {
                                        label: "All",
                                        value: "All",
                                    },
                                    {
                                        label: "Request ID",
                                        value: "request_id",
                                    },
                                    {
                                        label: "Vehicle ID",
                                        value: "vehicle_id",
                                    },
                                    {
                                        label:
                                            "Registration",
                                        value:
                                            "reported_registration",
                                    },
                                    {
                                        label:
                                            "Provider ID",
                                        value:
                                            "provider_id",
                                    },
                                ]}
                            />
                        </Col>

                        <Col xs={24} md={13}>
                            <Input
                                size="large"
                                value={searchText}
                                placeholder={`Search by ${searchFilter}`}
                                prefix={
                                    <SearchOutlined />
                                }
                                onChange={(e) =>
                                    setSearchText(
                                        e.target.value
                                    )
                                }
                                onPressEnter={
                                    handleSearch
                                }
                            />
                        </Col>




                    </Row>
                </Card>

                {/* Table */}

                <Card
                    style={{
                        borderRadius: 20,
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        pagination={false}
                        scroll={{ x: 1800 }}
                        bordered
                    />
                    <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                        <AppPagination
                            totalRecords={assistance?.[0]?.totalResults || 0}
                            onChange={handlePagination}
                        />
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default Dashboard;