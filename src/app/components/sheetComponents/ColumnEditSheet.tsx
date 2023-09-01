import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ColumnEditSheet = () => {
    return (
        <div className='text-white transition-all ease-in opacity-0 group-hover:opacity-100'>
            <Sheet>
                <SheetTrigger className='text-white'>Edit</SheetTrigger>
                <SheetContent className='bg-purple-700 border-none'>
                    <SheetHeader className=''>
                        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ColumnEditSheet;
