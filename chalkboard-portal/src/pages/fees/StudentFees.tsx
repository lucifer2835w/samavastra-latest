import React, { useState, useEffect } from 'react';
import { feesApi } from '../../api';
import type { Fee } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const StudentFees: React.FC = () => {
    const { user } = useAuth();
    const [fees, setFees] = useState<Fee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFees = async () => {
            if (user?.student?.id) {
                try {
                    const data = await feesApi.getStudentFees(user.student.id);
                    setFees(data);
                } catch (err) {
                    console.error('Failed to load fees', err);
                } finally {
                    setLoading(false);
                }
            } else {
                // Fallback or handle case where student ID is missing from user context
                setLoading(false);
            }
        };
        fetchFees();
    }, [user]);

    const handlePay = async (feeId: number) => {
        const ref = prompt("Enter Transaction Reference (Simulated Payment):");
        if (ref) {
            try {
                await feesApi.payFee({ feeId, transactionRef: ref });
                // Refresh fees
                if (user?.student?.id) {
                    const data = await feesApi.getStudentFees(user.student.id);
                    setFees(data);
                }
                alert('Payment Recorded!');
            } catch (err) {
                alert('Payment Failed');
            }
        }
    };

    if (loading) return <div>Loading fees...</div>;

    return (
        <div className="container">
            <h1>My Fees</h1>
            <div className="grid">
                {fees.map(fee => (
                    <Card key={fee.id} className={`fee-card ${fee.status.toLowerCase()}`}>
                        <h3>{fee.title}</h3>
                        <p className="amount">${fee.amount}</p>
                        <p>Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                        <p>Status: <span className={`status ${fee.status}`}>{fee.status}</span></p>
                        {fee.status === 'PENDING' && (
                            <Button onClick={() => handlePay(fee.id)}>Pay Now</Button>
                        )}
                        {fee.status === 'PAID' && (
                            <p className="paid-date">Paid on {new Date(fee.paymentDate!).toLocaleDateString()}</p>
                        )}
                    </Card>
                ))}
            </div>
            {fees.length === 0 && <p>No fee records found.</p>}
        </div>
    );
};
