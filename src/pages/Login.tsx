import { SignIn } from '@clerk/clerk-react';
import { Navbar } from '../components/Navbar';

export const Login = () => {
    return (
        <div className="min-h-screen bg-sous-bg">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] pt-20">
                <SignIn />
            </div>
        </div>
    );
};
