"use client";
import React from "react";
import { Button, Col, Form, Row } from "antd";

const JobPostForm = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Form.Item
                    label="Title"
                    rules={[{ required: true, message: "Please enter a job title" }]}
                    name="title"
                >
                    <input />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    label="Description"
                    rules={[
                        { required: true, message: "Please enter a job description" },
                    ]}
                    name="description"
                >
                    <textarea />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item label="Type" name="jobType"
                    rules={[{ required: true, message: "Required" }]}
                >
                    <select defaultValue="">
                        <option>Select</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                    </select>
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item label="Location" name="location">
                    <input />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item label="Experience" name="experience">
                    <input type="number" />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item label="Work Mode" name="workMode"
                    rules={[{ required: true, message: "Required" }]}
                >
                    <select defaultValue="">
                        <option>Select</option>
                        <option value="remote">Remote</option>
                        <option value="office">Office</option>
                    </select>
                </Form.Item>
            </Col>
            
            <Col span={8}>
                <Form.Item label="Salary From Range" name="salaryFromRange">
                    <input type="number" />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item label="Salary To Range" name="salaryToRange">
                    <input type="number" />
                </Form.Item>
            </Col>
        </Row>
        
    );
}

export default JobPostForm;