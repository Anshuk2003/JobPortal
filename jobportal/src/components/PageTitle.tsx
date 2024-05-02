import { Divider } from 'antd'
import React from 'react'

function PageTitle({ title }: { title: string }) {
    return (
        <div className='my-3'>
            <h1 className='text-xl my-1'>
                <b>{title}</b>
            </h1>
           <hr/>
        </div>
    )
}

export default PageTitle
