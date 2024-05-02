"use client"
import { Button, Col, Form, Row, Select } from 'antd'
import React from 'react'


function EmployeeForm() {
    return (
        <>
            <h1 className="text-md">Personal Information</h1>
            <Row
                gutter={[16, 16]}
            >
                <Col span={8}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type='email' />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type='text' />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Address"
                        name="addressEmployee"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        label="Pincode"
                        name="pincode"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <input type="text" />
                    </Form.Item>
                </Col>
                {/* <ImageUpload/> */}
                <Col span={4} >
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <select defaultValue="">
                            <option>select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label="Carrier Objective"
                        name="carrierObjective"
                    >
                        <textarea />
                    </Form.Item>
                </Col>
            </Row>
            {/* education */}
            <hr />
            <div
                style={{
                    marginTop: 35,
                }}
            >
                <h1 className="text-md">Education</h1>
            <Form.List name="education">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row key={key}
                                gutter={[16, 16]}
                                align="bottom">
                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "qualification"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Required",
                                            },
                                        ]}
                                        label="Qualification"
                                    >
                                        <input className='my-1' type="text" />
                                    </Form.Item>
                                </Col>

                                <Col span={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "institution"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Required",
                                            },
                                        ]}
                                        label="Institution"
                                    >
                                        <input className='my-1' type="text" />
                                    </Form.Item>
                                </Col>

                                <Col span={3}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "percentage"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Required",
                                            },
                                        ]}
                                        label="Percentage"
                                    >
                                        <input className='my-1' type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "year"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Required",
                                            },
                                        ]}
                                        label="Year of Passing"
                                    >
                                        <input className='my-1' type="text" />
                                    </Form.Item>
                                </Col>

                                <i
                                    className="ri-delete-bin-line"
                                    onClick={() => remove(name)}
                                ></i>
                            </Row>
                        ))}
                        <Form.Item >
                            <Button className='my-2' type="dashed" onClick={() => add()} block>
                                Add Education
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            </div>
            <hr />
            {/* skills */}
            <div
                style={{
                    marginTop: 35,
                }}
            >
                <h1 className="text-md">Skills</h1>
                <Form.List name="skills">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[16, 16]} align="bottom">
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "technology"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Technology"
                                        >
                                            <input className='my-1' type="text" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={4}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "rating"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Rating (1 to 10)"
                                        >
                                            <input className='my-1' type="text" />
                                        </Form.Item>
                                    </Col>

                                    <i
                                        className="ri-delete-bin-line"
                                        onClick={() => remove(name)}
                                    ></i>
                                </Row>
                            ))}
                            <Form.Item >
                                <Button className="my-2" type="dashed" onClick={() => add()} block>
                                    Add Skill
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>
            <hr />
            {/* experience */}
            <div
                style={{
                    marginTop: 35,
                }}
            >
                <h1 className="text-md">Experience</h1>
                <Form.List name="experience">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[16, 16]} align="bottom">
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "company"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Company"
                                        >
                                            <input className='my-1' type="text" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "role"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Role"
                                        >
                                            <input className='my-1' type="role" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={4}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "period"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Period of Work(From - To)"
                                        >
                                            <input className='my-1' type="text" />
                                        </Form.Item>
                                    </Col>

                                    <i
                                        className="ri-delete-bin-line"
                                        onClick={() => remove(name)}
                                    ></i>
                                </Row>
                            ))}
                            <Form.Item >
                                <Button className="my-2" type="dashed" onClick={() => add()} block>
                                    Add Experience
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>
            <hr />
            {/* projects */}
            <div
                style={{
                    marginTop: 35,
                }}
            >
                <h1 className="text-md">Projects</h1>
                <Form.List name="projects">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[16, 16]} align="bottom">
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "project"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Project Name"
                                        >
                                            <input className='my-1' type="text" />
                                        </Form.Item>
                                    </Col>


                                    <Col span={15}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "description"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Description"
                                        >
                                            <textarea />
                                        </Form.Item>
                                    </Col>

                                    <i
                                        className="ri-delete-bin-line"
                                        onClick={() => remove(name)}
                                    ></i>
                                </Row>
                            ))}
                            <Form.Item >
                                <Button className="my-2" type="dashed" onClick={() => add()} block>
                                    Add Project
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>
            <hr/>
            {/* Social media link */}
            <div
                style={{
                    marginTop: 35,
                }}
            >
                <h1 className="text-md">Links</h1>
                <Form.List name="links">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[16, 16]} align="bottom">
                                    <Col span={8}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "platform"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Platform Name"
                                        >
                                            <input className='my-1' type="text" />
                                        </Form.Item>
                                    </Col>


                                    <Col span={15}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "link"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Required",
                                                },
                                            ]}
                                            label="Link"
                                        >
                                            <input type='text' />
                                        </Form.Item>
                                    </Col>

                                    <i
                                        className="ri-delete-bin-line"
                                        onClick={() => remove(name)}
                                    ></i>
                                </Row>
                            ))}
                            <Form.Item >
                                <Button className="my-2" type="dashed" onClick={() => add()} block>
                                    Add Links
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </div>
        </>
    )
}

export default EmployeeForm
