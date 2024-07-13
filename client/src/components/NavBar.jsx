import { APP_NAME, ROLE } from '@/constant'
import AppContext from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const NavBar = () => {

    const withoutAuthNavItems = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Sign In',
            path: '/sign-in',
        },
        {
            label: 'Sign Up',
            path: '/sign-up',
        },
        {
            label: 'About',
            path: '/about',
        },
        {
            label: 'Contact',
            path: '/contact',
        },
    ]

    const withAuthNavItemsForAdmin = [
        {
            label: 'Home',
            path: '/admin-dashboard',
        }
    ]

    const withAuthNavItemsForUser = [
        {
            label: 'Home',
            path: '/user-dashboard',
        }
    ]

    const { user, role, logOutUser } = useContext(AppContext)

    const [navItems, setNavItems] = useState(withoutAuthNavItems)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setNavItems(role === ROLE.ADMIN ? withAuthNavItemsForAdmin : withAuthNavItemsForUser)
        } else {
            setNavItems(withoutAuthNavItems)
        }
    }, [user, role])

    return (
        <header className="px-4 lg:px-6 h-16 flex items-center">
            <Link to="/" className="flex items-center justify-center">
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">{APP_NAME}</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="text-sm font-medium text-gray-700 hover:underline dark:text-gray-300"
                    >
                        {item.label}
                    </Link>
                ))}
                {
                    user && (
                        <Button variant="outline" onClick={logOutUser}>
                            Logout
                        </Button>
                    )
                }
            </nav>
        </header>
    )
}

export default NavBar
