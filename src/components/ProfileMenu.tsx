import React from 'react';
import { Link } from '@tanstack/react-router';

type ProfileListItem = {
    label: string;
    to: string;
};

const ProfileMenu = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
    const listItems: ProfileListItem[] = [
        { label: 'Profile', to: 'profile' },
        { label: 'ToDo', to: '' },
    ];

    return <div ref={ref} className="absolute flex flex-col right-4 top-18 w-30 z-100 items-left rounded-md justify-between bg-background-light text-text-dark">
        {listItems.map(item => <Link className='p-4 font-semibold hover:bg-primary-light rounded-md' to={item.to}>{item.label}</Link>)}
    </div>;
});

export default ProfileMenu;
