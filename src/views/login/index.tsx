import { useState } from "react";
import {
    Card,
    Typography,
    Input,
    Button,
    Space,
} from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LoginUser, OTPValidation } from "../../redux/services/authService";
import { useAppDispatch } from "../../redux/hooks";
import logo from "../../assets/logocompany1.png";
const { Title, Text } = Typography;

const phoneSchema = Yup.object({
    phone: Yup.string()
        .matches(
            /^[6-9]\d{9}$/,
            "Enter a valid mobile number"
        )
        .required("Phone Number is required"),
});

const otpSchema = Yup.object({
    otp: Yup.string()
        .matches(
            /^\d{4}$/,
            "OTP must be 4 digits"
        )
        .required("OTP is required"),
});

const Login = () => {
    const [showOtp, setShowOtp] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] =
        useState("");
    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#eefbf4,#f8fafc,#e0f7fa)",
            }}
        >
            {/* Background Blur Blob 1 */}
            <div
                style={{
                    position: "absolute",
                    width: 550,
                    height: 550,
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg,#25D366,#00D4AA)",
                    top: -180,
                    left: -180,
                    opacity: 1,
                    zIndex: 1,
                }}
            />

            {/* Background Blur Blob 2 */}

            <div
                style={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg,#34D399,#22C55E)",
                    bottom: -180,
                    right: -180,
                    opacity: 1,
                    zIndex: 1,
                }}
            />
            {/* Background Blur Blob 3 */}

            <div
                style={{
                    position: "absolute",
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    background:
                        "linear-gradient(135deg,#06B6D4,#25D366)",
                    top: "30%",
                    right: "20%",
                    opacity: 0.9,
                    zIndex: 1,
                }}
            />

            <Card
                styles={{
                    body: {
                        padding: 40,
                        background: "transparent",
                    },
                }}
                style={{
                    width: 500,
                    maxWidth: "92%",
                    borderRadius: 32,
                    overflow: "hidden",
                    background:
                        "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter:
                        "blur(0px)",
                    border:
                        "1px solid rgba(255,255,255,0.25)",
                    boxShadow:
                        "0 25px 50px rgba(0,0,0,0.08)",
                    zIndex: 10,
                }}
            >
                {/* Logo */}

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            width: 110,
                            height: 110,
                            borderRadius: "50%",
                            margin: "0 auto 20px",
                            background:
                                "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(20px)",
                            border:
                                "1px solid rgba(255,255,255,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 52,
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.08)",
                        }}
                    >
                        🤖
                    </div>

                    <Title
                        level={2}
                        style={{
                            marginBottom: 6,
                            color: "#0f172a",
                            fontWeight: 700,
                        }}
                    >
                        WhatsApp Bot
                    </Title>

                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: 15,
                        }}
                    >
                        Secure OTP Authentication
                    </Text>
                </div>

                {!showOtp ? (
                    <Formik
                        initialValues={{
                            phone: "",
                        }}
                        validationSchema={
                            phoneSchema
                        }
                        onSubmit={async (values) => {
                            const payload = {
                                Phone_no: values.phone,
                                Otp: "",
                            };

                            const result: any = await dispatch(
                                LoginUser(payload)
                            );


                            if (
                                result?.payload?.Response_Status ===
                                "Success"
                            ) {
                                setPhoneNumber(values.phone);
                                setShowOtp(true);
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >
                                <Space
                                    direction="vertical"
                                    size={20}
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Input
                                        size="large"
                                        name="phone"
                                        placeholder="Enter Mobile Number"
                                        value={
                                            values.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        style={{
                                            height: 58,
                                            borderRadius: 16,
                                            background:
                                                "rgba(255,255,255,0.18)",
                                            backdropFilter:
                                                "blur(20px)",
                                            border:
                                                "1px solid rgba(255,255,255,0.3)",
                                        }}
                                    />

                                    {touched.phone &&
                                        errors.phone && (
                                            <Text
                                                type="danger"
                                            >
                                                {
                                                    errors.phone
                                                }
                                            </Text>
                                        )}

                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        block
                                        size="large"
                                        style={{
                                            height: 58,
                                            borderRadius: 16,
                                            border: "none",
                                            fontWeight: 700,
                                            fontSize: 16,
                                            background:
                                                "linear-gradient(135deg,#25D366,#00D4AA)",
                                            boxShadow:
                                                "0 15px 30px rgba(37,211,102,.35)",
                                        }}
                                    >
                                        Send OTP
                                    </Button>
                                </Space>
                            </form>
                        )}
                    </Formik>
                ) : (
                    <Formik
                        initialValues={{
                            otp: "",
                        }}
                        validationSchema={
                            otpSchema
                        }
                        onSubmit={async (values) => {
                            const payload = {
                                Phone_no: phoneNumber,
                                Otp: values.otp,
                            };

                            const result: any = await dispatch(
                                OTPValidation(payload)
                            );

                            if (
                                result?.payload?.Responce_Status?.toLowerCase() ===
                                "succcess"
                            ) {
                                localStorage.setItem(
                                    "accessToken",
                                    "token"
                                );

                                navigate("/", {
                                    replace: true,
                                });
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            setFieldValue,
                            handleSubmit,
                        }) => (
                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >
                                <Space
                                    direction="vertical"
                                    size={20}
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        style={{
                                            display: "block",
                                            textAlign: "center",
                                        }}
                                    >
                                        Enter OTP sent to your mobile number
                                    </Text>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <Input.OTP
                                            length={4}
                                            value={values.otp}
                                            onChange={(value) =>
                                                setFieldValue("otp", value)
                                            }
                                        />
                                    </div>

                                    {touched.otp && errors.otp && (
                                        <div style={{ textAlign: "center" }}>
                                            <Text type="danger">
                                                {errors.otp}
                                            </Text>
                                        </div>
                                    )}

                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        block
                                        size="large"
                                        style={{
                                            height: 58,
                                            borderRadius: 16,
                                            border: "none",
                                            fontWeight: 700,
                                            fontSize: 16,
                                            background:
                                                "linear-gradient(135deg,#25D366,#00D4AA)",
                                            boxShadow:
                                                "0 15px 30px rgba(37,211,102,.35)",
                                        }}
                                    >
                                        Verify OTP
                                    </Button>

                                    <Button
                                        type="link"
                                        onClick={() =>
                                            setShowOtp(
                                                false
                                            )
                                        }
                                    >
                                        Change Number
                                    </Button>
                                </Space>
                            </form>
                        )}
                    </Formik>
                )}
            </Card>


            {logo && (
                <div
                    style={{
                        position: "absolute",
                        top: 24,
                        left: 24,
                        zIndex: 1000,
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: 60,
                            width: "auto",
                            objectFit: "contain",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Login;