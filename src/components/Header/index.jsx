import React from 'react';
import './header.css'

function Header(){
    return(
       <div className='d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2 '>
        <span className='fs-3 fw-500'>Financly</span>
        <div className='d-none align-items-center gap-1 me-5'>
            <img width="40px" height='40px' className='rounded-circle' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-PzNKpGJWuBjaX9YZN3Zu19pnAb3i_lhinoreAfm1q1JWn3CmZuIXc0KBs07uQ8_fUb0dmjryzcPwnz2LLkX5B1pZhZfvp4etMU-U8fc&s=10" alt="" />
            <span className='fs-5'>Udit</span>
        </div>
       </div>
    )
}


export default Header;