import React, { useEffect, useState } from "react";
import { instance } from "../../api";


const ReportingAnalyticsComp = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        instance.get('/reports/last-login').then((res) => [
            setTableData(res.data)
        ]).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <div className="bg-white p-4 h-[89.4vh] rounded-lg shadow-md main-container">
                {tableData.length ? <div className="overflow-y-scroll" style={{ maxHeight: '84vh' }}>
                    <table className="w-full border-collapse bg-white opacity-80 overflow-scroll">
                        <thead>
                            <tr>
                                <th className="border p-2">Sl.no</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Logged by</th>
                                <th className="border p-2">Last Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index} className="border text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{row.name}</td>
                                    <td className="border p-2">{row.email}</td>
                                    <td className="border p-2">{row.user}</td>
                                    <td className="border p-2">{new Date(row.lastLogin).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <div className="flex justify-center w-full"></div>}
            </div>
        </>
    )
};

export default ReportingAnalyticsComp;