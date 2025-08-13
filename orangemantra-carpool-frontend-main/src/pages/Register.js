import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaIdBadge, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
    const [data, setData] = useState({
        empId: "",
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role === "EMPLOYEE") navigate("/employee/dashboard");
        else if (token && role === "ADMIN") navigate("/admin/dashboard");
    }, [navigate]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", data);
            alert("Registered! Please login.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
                <img src="/orangemantra Logo.png" alt="Logo" className="w-16 h-16 mb-4 rounded-full shadow" />
                <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Employee Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                        <FaIdBadge className="text-orange-400" />
                        <input
                            name="empId"
                            placeholder="Employee ID"
                            value={data.empId}
                            onChange={handleChange}
                            required
                            className="bg-transparent w-full outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                        <FaUser className="text-orange-400" />
                        <input
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="bg-transparent w-full outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                        <FaEnvelope className="text-orange-400" />
                        <input
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            type="email"
                            className="bg-transparent w-full outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                        <FaLock className="text-orange-400" />
                        <input
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            type="password"
                            className="bg-transparent w-full outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-blue-700 text-white py-3 rounded-xl transition font-semibold mt-2"
                    >
                        Register
                    </button>
                    <p className="text-center text-sm mt-4 text-gray-600">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-orange-600 font-semibold cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;