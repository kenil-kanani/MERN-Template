import { ROLE } from '@/constant';
import { withRoleProtection } from '@/utils';
import React from 'react'

const UserDashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">User Dashboard</h1>
        </div>
    )
}

export default withRoleProtection(UserDashboard, [ROLE.USER]);
