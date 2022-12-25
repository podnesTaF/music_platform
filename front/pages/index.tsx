import React from 'react';
import MainLayout from "../layouts/MainLayout";

const Index = () => {
    return (
           <MainLayout>
               <div className='pt-40 flex justify-center flex-col items-center'>
                   <h1 className='text-4xl mb-3'>Welcome</h1>
                   <h3 className='text-xl mb-3'>Here you will find different tracks</h3>
                   <h4>Upload and listen to your tracks</h4>
               </div>
           </MainLayout>
    );
};

export default Index;
