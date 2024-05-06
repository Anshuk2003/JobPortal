import { Col, Divider, Row } from 'antd'
import React from 'react'

function EmployerInfo({ employerInfo }: { employerInfo: any }) {
  return (
    <Row>
      <Col span={12}>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <span>
              Company Name
            </span>
            <span>
              {employerInfo.name}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>
              Establishment Year
            </span>
            <span>
              {employerInfo.establishmentYear}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>
              Company Size
            </span>
            <span>
              {employerInfo.companySize}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>
              Email
            </span>
            <span>
              {employerInfo.email}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>
              Phone
            </span>
            <span>
              {employerInfo.phone}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>
              Website
            </span>
            <span>
              {employerInfo.website}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>
              Address
            </span>
            <span>
              {employerInfo.address}
            </span>
          </div>
        </div>
      </Col>
      <Divider />
      <Col span={24}>
        <h1 className="text-md"><b>About</b></h1>
        <p style={{whiteSpace:'pre-wrap'}}>
          {employerInfo.about}
        </p>
      </Col>
    </Row>
  )
}

export default EmployerInfo
