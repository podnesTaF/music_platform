import React from 'react';
import {Button} from "@mui/material";
import Navbar from "../components/navbar";
import MainLayout from "../layouts/MainLayout";

const Index = () => {
    return (
       <>
           <MainLayout>
               <div className='center'>
                   <h1>Welcome</h1>
                   <h3>Here you will find the best tracks in the world</h3>
               </div>
           </MainLayout>

           <style jsx>
               {`
               .center {
                  margin-top: 150px;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
               }`}
           </style>
       </>
    );
};

export default Index;
